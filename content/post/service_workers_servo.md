+++
date = "2016-06-29T23:25:02+05:30"
draft = false
title = "Basic Service Worker Support Lands in Servo"
categories = ["mozilla"]
comments = true
showpagemeta = true
slug = ""
tags = ["servo", "rust", "open-source", "gsoc"]
description = "An Implementation overview"

+++

The last few weeks were exciting. With helpful guidance from [_Josh_](https://github.com/jdm) and awesome people at [_Servo_](https://github.com/servo/servo) I finally have a rudimentary implementation of [_Service Workers_](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) (hereby mentioned as SW) in Servo capable enough to monitor network requests made from different origins and optionally send back custom responses on a registered origin with basic lifecyle events (`statechange`, `activate`, `install`) supported.

Currently, Service Workers  are gated behind a `dom.serviceworker.enabled` flag. To make them available in the DOM, Servo needs to be launched with

```
./mach run --release http://example.com --pref dom.serviceworker.enabled=true
```

An example test page specific to Servo's implementation is available under [_html/service-workers_](https://github.com/servo/servo/tree/master/tests/html/service-worker).

This post will give an overview of the current implementation of SW's in Servo. Please note that the codebase is likely to change in future due to dependency over several features such as the Fetch Api ([_Tracking Issue_](https://github.com/servo/servo/issues/11894)) whose implementation is in progress and the Promise API ([_Tracking Issue_](https://github.com/servo/servo/issues/4282)). I also maintain a [_repo_](http://github.com/creativcoder/gsoc16) keeping track of SW implementation in Servo.

To get a basic idea of what Service Workers are; refer to my [__previous__](post/service-workers-on-web/) blog post.

Before we talk about them, its helpful to mention some key concepts in Servo's architecture.
I will mention only the topics that is important to SW's implementation. To get a broad overview of Servo's architecture; refer to the [_Servo Wiki_](https://github.com/servo/servo/wiki/Design) or my [_blog post_](post/post-community-bonding-gsoc-servo/).

A Constellation in Servo is a co-ordinator of various pipelines along with other entities such as the windowing system, resource manager, caching system, etc.
A Pipeline in Servo is an abstraction of a Script Thread, Layout Thread and a Paint Thread (basically a page which gets parsed and rendered to a viewport).
We'll only focus on Script Thread here.
The Script Thread is the one that holds the DOM for a document loaded in window and is responsible for handling execution of javascript in page.

Service workers are designed so as not to depend on any context/document so they must be at a higher level in the abstraction hierarchy than the Script Thread. They can listen to network requests globally. As such a service worker manager thread (hereby mentioned as SWM) was devised to manage service worker registrations at different origins. The idea is to have a single manager thread that can store information of all registered SW's and can listen to network requests, activation or timeouts of any of the SW's.

The following interfaces of the Service Workers Api are available in Servo (without promise integration):

Client Context:

[__ServiceWorker__](https://github.com/servo/servo/blob/master/components/script/dom/serviceworker.rs)

[__ServiceWorkerContainer__](https://github.com/servo/servo/blob/master/components/script/dom/serviceworkercontainer.rs)

[__ServiceWorkerRegistration__](https://github.com/servo/servo/blob/master/components/script/dom/serviceworkerregistration.rs)

Execution Context:

[__ServiceWorkerGlobalScope__](https://github.com/servo/servo/blob/master/components/script/dom/serviceworkerglobalscope.rs)

* The init phase: 

![alt init_phase](/img/init_phase.jpg)

The constellation thread is the one that's created before any of the above mentioned threads. So it creates the required channels (here channel means creating a sender receiver pair for inter-thread communication) for SWM and passes the SWM's sender when the constellation creates the script thread which spawns the SWM thread. We also create a channel for the resource thread to communicate with constellation. This is needed so that the resource thread can ask for any custom response from SWM mediated by constellation.

* The registration phase:

![alt reg_phase](/img/reg_phase.jpg)

Lets take an example of a url `https://example.com` where we register a SW over the scope: `/profile`.
We register a Service Worker by calling `navigator.serviceWorker.register('sw.js', {scope: '/profile'});` which returns a registration object. This registration object is then stored in the ScriptThread's thread local storage. At this point the worker does not start controlling pages or listening to events; instead it forwards the attributes required to spawn service to the SWM which handles the initialization of ServiceWorkerGlobalScopes upon url navigations.

* The network phase:

![alt net_phase](/img/net_phase.jpg)

When the browser is navigated to the url `https://example.com/profile` where the SW was registered the `http_loader`, sends a sender to the SWM, and asks whether the current load url has a running service worker that may have a custom response. Here the SWM forwards the network's sender to the running ServiceWorkerGlobalScope's event loop which then is able to reply with any custom response that is cached in.

Note : This is still a WIP post, and there will be additions.
