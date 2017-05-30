+++
date = "2016-06-09T23:35:16-05:30"
draft = false
title = "Post community bonding period with Servo- GSoC'16"
featureimage = "https://propakistani.pk/wp-content/uploads/2017/03/Google-Summer-of-Code-March-3-2017-800x450.png"
categories = ["mozilla"]
comments = true
showpagemeta = true
slug = ""
tags = ["servo", "rust", "open-source", "gsoc"]
description = "An awesome experience"

+++

My [__previous post__](post/service-workers-on-web/) gave a brief introduction about service workers. This post will be a brief intro to Servo's architectural design in order to provide a context for my next post which will discuss about the initial support for Service Workers that needed to be implemented.

Servo Browser Engine, is a project started by the motivation for exploiting parellelism at every level of rendering and layout and to leverage the growing no of CPU cores we have available today; which current existing browsers are not easily able to exploit because it would require a re-thought on their large legacy codebase. The architectural design of majority of browsers we have today were envisioned long back ago when there wasn't much cores on CPU available to us. But things have changed today and that the cpu clocks have maxed out and instead we now have 8 core cpu's even running in mobile devices and Servo is at this growth phase where it is feasible to experimentation with modern tools and techniques in order to analyse what works best and not and to use the parellal computational power we have. The aim is to build an embeddable browser engine, that runs equally well on mobile devices as well.


The engine is being developed in a type safe GC-less language named `Rust` a project started by [__Graydon Hoare__](https://github.com/graydon) and now is sponsored by Mozilla. Rust is a low-level systems system's programming language with a highly expressive type system yet affords zero cost abstractions with compile time type safety checks without relying on Garbage collection. You produce well defined programs, when you write Rust code. The language has a new concept of ownership rules describing that there can only be a single owner of a resource in its surrounding scope, and that borrowing it would freeze any modifications by the borrower as well as by the owner. The choice of choosing a completely different language other than c++ (which most browser engines were developed in) comes as another reason for mitigating various [__bugs__](https://bugs.launchpad.net/bugs/bugtrackers/auto-bugs.webkit.org) of arbitrary code access or memory segfaults that exists in most used browsers today.


So, how does a browser engine works ? Well, a justified answer to that question would be an answer in several pages.😄 A lot of stuff happens in a browser engine's lifecycle. To make it brief, basically web browsers as seen from an outer level consists of two parts, the outer `chrome`, which is the windowing system users use to interact with the page. and the inner rendering engine, which does all the heavy lifting of rendering those complex modern web pages. I would instead reference this [__article__](http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/) if you're more curious into the details.

Okay so lets see what are the main components of Servo. Servo in code is organized as follows:


#### [*Compositor*](https://github.com/servo/servo/blob/master/components/compositing/compositor.rs): 
Manages Window events back and forth from Constellation.

#### [*Constellation*](https://github.com/servo/servo/blob/master/components/constellation/constellation.rs):
Central co-ordinator of events from Compositor and the different Pipelines.

#### [*Pipeline*](https://github.com/servo/servo/blob/master/components/constellation/pipeline.rs):
Each pipeline is a seperate process and the constellation keeps track of all the pipelines created. It comprises of the script thread, the layout thread, paint thread.

#### [*Resource*](https://github.com/servo/servo/blob/master/components/net/resource_thread.rs):
Manages all of file I/O or network I/O events, when requested by the DOM. It also performs caching of resources.

#### [*Script*](https://github.com/servo/servo/tree/master/components/script):
This comprises of the in memory representation of the DOM (Document Object Model) that represent a web page along with its script thread which manages parsing of the document and running any javascript in the page. Servo does not have its own javascript engine in Rust yet, and instead relies on the [__Spidermonkey Engine__](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey) for which wrapper [__bindings__](https://github.com/servo/rust-mozjs) are generated to be used by the DOM code. The DOM objects are managed solely by the Spidermonkey's Garbage collector, and Servo does not involve itself with any reference counting of Rust side of DOM objects, as compared to Gecko which uses a cycles collector in c++ code. Every DOM code on Rust side keeps a reflector (a pointer) to the Spidermonkey's DOM object.

The above components are isolated tasks that communicate with each other via message passing paradigm. i.e., using [__channels__](https://github.com/servo/ipc-channel).

* The lifecycle of Servo, starts with [__main.rs__](https://github.com/servo/servo/blob/ce88b8ed30feff9c7d3f067041fe5d781e012351/components/servo/main.rs#L51), which does some  initial command line parsing, to get the URI of a resource requested. It then creates a Window Compositor followed by the Constellation, which is then able to handle user events and inputs, which can then be forwarded to the constellation for processing.

* The [__Constellation__](https://github.com/servo/servo/blob/ce88b8ed30feff9c7d3f067041fe5d781e012351/components/constellation/constellation.rs#L84) acts a mediator between the Window Compositor and the Pipeline. It also handles the navigation events made from within, the Script thread (of any page) or from the Compositor. The constellation also initiates other threads such as the Resource thread, and the Image Cache thread.

* A Pipeline in Servo is an an abstraction of a unit of "web content", that the Constellation keeps track of.
A [__Pipeline__](https://github.com/servo/servo/blob/ce88b8ed30feff9c7d3f067041fe5d781e012351/components/constellation/pipeline.rs#L49) process consists of a Layout Thread, Render Thread, and the Script Thread.

* So a new pipeline is created, which spawns different threads, and then hands over the task to the script thread to load the url, which was passed as arguments. The script, sends the load message to the Resource Thread, which dispatches task to the appropriate loader, depending on the scheme of the uri requested. The content received from the resource in consumed in chunks, and is forwarded then to the html parser in the script thread. The parser then, creates the DOM, and this parsed DOM along with its stylesheets is then issued with a [__reflow__](https://github.com/servo/servo/blob/ce88b8ed30feff9c7d3f067041fe5d781e012351/components/layout/layout_thread.rs#L998) event to the Layout thread, which calculates positioning and bounds of all DOM nodes, in the parsed document. This constructs a Render Tree with all the information necessary to paint the document using the graphics api. The render tree is then, handed over to the paint thread, which starts rendering the document in the viewport.

This was a very simplified overview of what goes into rendering a document in Servo, and i still have to discover a lot and will hopefully update this post with articulate sections in future as i gain more insight.

The next post will discuss on some of the prelimnary aspects of Service Workers integration in Servo that needed to be integrated in the network code, in order to enable service workers, to respond to the client requesting some resource from the network with some custom response, if there is any response for a request that's cached in.

Thanks for all the help from Servo team in helping me understand the topics.
