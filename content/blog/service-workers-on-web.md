+++
date = "2016-05-20T15:28:15+05:30"
draft = false
title = "Introduction to the Service Workers"
categories = ["web"]
comments = true
showpagemeta = true
slug = ""
tags = ["service-workers", "web", "open-source", "gsoc"]
description = "Bringing native app like experience to the modern web"
+++

This post discusses about a web platform [specification](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/), that aims to provide a programmatic control over web pages, by providing a user driven api, which can be used for many purposes like; to cache data for offline usage, control outgoing network requests, provide a platform for implementing push notifcations, and for making a [progressive web app](https://developers.google.com/web/progressive-web-apps/). Currently, I am working with Mozilla Research, on implementing the foundations for the service worker specification in Servo Browser engine as part of my Gsoc project (mentored by [Josh](http://github.com/jdm)). Major browser vendors already have suppport of them, whose status can be tracked at [caniuse](http://caniuse.com/#feat=serviceworkers). So, It would be great to have this feature in Servo as well.

So to begin with, lets answer the question:

#### What are service workers ?

First of all, its a derivative of web workers, if you're familiar [with them](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), and shares identity with shared workers. They are basically event-driven background running scripts (as a seperate thread in Servo and in other browser engines), that run in time limited manner and can monitor network events made from web pages. 

The script's lifetime isn't determined by the the page or the client which registered it, but with various events, that happen during its lifecycle, such as `installed`, `activate`, `fetch`, etc. This property is an important thing to note, which means that we should not do do things inside our worker script, which tries to persist some data or state. Service Workers should be treated as a `stateless` script, which starts and acts only when events occur.

#### What are they good for and why would i use it ?

To answer this and to not make this post longer, i would point towards these great Google I/O'16 talks,
which really shows their capabilities. The web platform gets a whole new transformation with them when used correctly. 

* [ServiceWorkers at scale](https://www.youtube.com/watch?v=fGTUIlEM0m8)

* [Building offline-first Progressive Web Apps](https://www.youtube.com/watch?v=cmGr0RszHc8)


#### How do they work ?

As said, above that service workers basically act as a network proxy listening to network events made from page, so they must be registered first, to listen to network events from a page. So jake archibald the co-creator of the service workers specification has a really nice introduction to [using the service workers today](https://jakearchibald.com/2014/using-serviceworker-today/).


The next post will discuss on the initial progress on implementation of ServiceWorkers in Servo. The current implementation, does not implement them using promises, as promises support is yet to be integrated in Servo. This will eventually, get transitioned to promise based implementation as per the spec standards when promises support arrives. I have a tracking [repository](https://github.com/creativcoder/gsoc16), which contains my notes and roadmap of the ServiceWorker integration in Servo.
