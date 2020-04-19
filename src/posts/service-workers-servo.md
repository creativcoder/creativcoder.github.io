---
date: "2016-06-29"
title: "Basic Service Worker support lands in Servo"
path: "/service-workers-servo"
tags: ["servo", "rust", "open-source", "gsoc"]
excerpt: "An Implementation overview"
author: "creativcoder"
---

The last few weeks were exciting! With amazing guidance from [Josh](https://github.com/jdm) and awesome people at [Servo](https://github.com/servo/servo) I finally have a rudimentary implementation of [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) (hereby mentioned as SW) in Servo capable enough to monitor network requests made from different origins and optionally send back custom responses on a registered origin with basic lifecyle events (`statechange`, `activate`, `install`) supported.

Currently Service Workers are gated behind a `dom.serviceworker.enabled` flag in Servo. To make them available in DOM's `window.navigator` object, Servo needs to be launched with:

```bash
./mach run --release http://example.com --pref dom.serviceworker.enabled=true
```

An example test page specific to Servo's implementation is available under [html/service-workers](https://github.com/servo/servo/tree/master/tests/html/service-worker). This page can be used to test the current implementation.

This post will give an overview of the current implementation of SWs in Servo. Please note that the codebase is likely to change in future due to dependency over multitude of features such as the Fetch API ([Tracking Issue](https://github.com/servo/servo/issues/11894)) whose implementation is in progress and the Promise API ([Tracking Issue](https://github.com/servo/servo/issues/4282)). I also maintain a [repo](http://github.com/creativcoder/gsoc16) keeping track of SW implementation in Servo.

To get a basic idea of what Service Workers are, refer to my [previous](/service-workers-web/) blog post. Before we talk about SWs implementation, it's helpful to mention some of the key concepts in Servo's architecture.

I will mention only the topics that are important to SWs implementation. To get a broad overview of Servo's architecture; refer to the [Servo Wiki](https://github.com/servo/servo/wiki/Design) or my [blog post](/community-bonding-gsoc-servo).

## Constellation

A Constellation in Servo is a co-ordinator of various pipelines along with other entities such as the windowing system, resource manager, caching system etc.

## Pipeline

A Pipeline in Servo is an abstraction of a Script Thread, Layout Thread and a Paint Thread (basically a page which gets parsed and rendered to a viewport).

We'll only focus on Script Thread here.

The Script Thread is holds the DOM for a web document and is responsible for handling execution of javascript on the page.

Service workers are designed so as not to depend on any context/document so they must be at a higher level in the abstraction hierarchy than the Script Thread. They can listen to network requests globally. As such, a service worker manager thread (hereby mentioned as SWM) was devised to manage service worker registrations at different origins. The idea is to have a single manager thread that can store information of all registered SW's and can listen to network requests, activation or timeouts of any of the SW's.

The following interfaces of the Service Workers API are available in Servo (without promise integration):

## Client Context:

[ServiceWorker](https://github.com/servo/servo/blob/master/components/script/dom/serviceworker.rs)

[ServiceWorkerContainer](https://github.com/servo/servo/blob/master/components/script/dom/serviceworkercontainer.rs)

[ServiceWorkerRegistration](https://github.com/servo/servo/blob/master/components/script/dom/serviceworkerregistration.rs)

## Execution Context:

[ServiceWorkerGlobalScope](https://github.com/servo/servo/blob/master/components/script/dom/serviceworkerglobalscope.rs)

* The initialization phase: 

![alt init_phase](http://i.imgur.com/rAv1za8.jpg)

The Constellation thread is created before any of the above mentioned threads. So it creates the required channels (here channel means creating a (Sender<T> Receiver<T>) pair for inter-thread communication) for SWM and passes the SWM's sender when the constellation creates the script thread which spawns the SWM thread. We also create a channel for the resource thread to communicate with constellation. This is needed so that the resource thread can ask for any custom response from SWM mediated by constellation.

* The registration phase:

![alt reg_phase](http://i.imgur.com/lWJVImJ.jpg)

Let's take an example of a URL `https://example.com` where we register a SW over the scope: `/profile`. We can register a Service Worker by calling 

```javascript
navigator.serviceWorker.register('sw.js', { scope: '/profile' });
```

which returns a registration object. This registration object is then stored in the ScriptThread's thread local storage. At this point, the worker does not start controlling pages or listening to events; instead it forwards the attributes required to spawn service to the SWM which handles the initialization of `ServiceWorkerGlobalScope` upon url navigations.

* The network phase:

![alt net_phase](http://i.imgur.com/xH9HrTR.jpg)

When the browser is navigated to the URL `https://example.com/profile` where the SW was registered, the `http_loader` sends a `Sender` channel to the SWM and asks whether the currently loaded URL has a running service worker that may have a custom response. Here the SWM forwards the network's sender to the running `ServiceWorkerGlobalScope`'s event loop which then able to reply with any custom response that is cached in.

PS : This is still a WIP post, and there will be additions.
