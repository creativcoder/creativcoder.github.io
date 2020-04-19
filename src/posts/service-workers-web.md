---
date: "2016-05-20"
title: "Introduction to the Service Workers"
coverImage: "http://i.imgur.com/gv3aU5s.jpg"
tags: ["service-workers", "web", "open-source", "gsoc"]
excerpt: "Bringing native app like experience to the modern web"
path: "/service-workers-web"
---

This post is about a web platform [specification](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/), that aims to provide a programmatic control over web pages, by providing a user driven API, which can be used for many purposes i.e., cache data for offline usage, intercept outgoing network requests, provide a platform for implementing push notifcations, and for making a [progressive web app](https://developers.google.com/web/progressive-web-apps/). 

At the time of writing this, I am working with Mozilla Research on implementing the foundations for the service worker specification in Servo Browser engine as part of my GSoC project (mentored by [Josh Matthews](http://github.com/jdm)). Most major browser vendors already suppport them. Their extent of support can be tracked at [caniuse](http://caniuse.com/#feat=serviceworkers). So, it would be great to have this feature in Servo as well.

So to begin with, lets answer the obvious question:

## What are service workers?

First, it's a derivative of web workers if you're familiar [with them](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), and shares identity with shared workers. Service workers are event-driven background running scripts (as a seperate thread in Servo and in other browser engines), that run in a time limited manner and can monitor network events made from web pages. 

The script's lifetime isn't determined by the the page or the client which registered it, but based on various events that happen during its lifecycle i.e., `installed`, `activate`, `fetch`, etc. This behavior is interesting for end users, which means that we should not do do things inside our worker script that tries to persist some data or state. Service Workers should be treated as a `stateless` script, which starts and acts only when events occur.

## What are they good for and why would i use it?

To answer this and to not make this post longer, I would point towards these great Google I/O'16 talks,
which really shows their capabilities. The web platform gets a whole new transformation with them when used correctly. 

---

`youtube: fGTUIlEM0m8`
__Service Workers at scale__


`youtube: cmGr0RszHc8`
__Building offline-first Progressive Web Apps__

---

## How do they work?

As said above that service workers basically act as a network proxy listening to network events made from page, so they must be registered first to listen to network events from a page. So jake archibald the co-creator of the service workers specification has a really nice introduction to [using service workers today](https://jakearchibald.com/2014/using-serviceworker-today/).

The next post will discuss on the initial progress on implementation of Service Workers in Servo. The current implementation does not implement them using promises, as promises support is yet to be integrated in Servo. This will eventually get transitioned to promise based implementation as per the spec standards when promises support arrives. I have a tracking [repository](https://github.com/creativcoder/gsoc16), which contains notes and roadmap of Service Workers integration in Servo.
