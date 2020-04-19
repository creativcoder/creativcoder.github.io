---
date: "2016-04-23T01:47:35+05:30"
title: "So it begins with Servo: GSOC'16"
path: "/it-begins-gsoc"
tags: ["servo", "rust", "open-source", "gsoc"]
excerpt: "My proposal on Service Workers Infrastructure got accepted by Mozilla Research. Am working with Servo this summer. Yay!"
author: "creativcoder"
---

So far learning Rust has been really rewarding and I found it really interesting in the domain of system's programming; given that we don't have much choices apart from C/C++ for something close to metal. I have started a couple of personal projects of mine in Rust, [meltdown](https://github.com/creativcoder/meltdown) and [silica](https://github.com/creativcoder/silica). I hope to polish them as I learn more.

Apart from side projects, I really wanted to get started contributing to some open source projects related to Rust. Among them I found one called Servo, a project that aims to build on modern practices of safe systems programming. Servo is a parellal browser engine being developed in Rust. It aims to provide a safe and parellal (at many levels) platform for the modern web, protecting against the security and memory related vulnerabilities prevalant in many existing browser engines such as [Webkit](https://webkit.org/) and [Gecko](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko). Further design details can be seen [here](https://github.com/servo/servo/wiki/Design) and [here](https://github.com/servo/servo/wiki/General-implementation-and-design-notes).

Browser engines are complex piece of software that is almost like an operating system running and managing different things; from network requests to html parsing to layout tree construction and painting content on screen. There are lot of things to learn and that makes it a very interesting project for someone wanting to learn: "something from everything". I have been contributing to Servo for a month now, and so far it has been a great experience to learn from some of the awesome and very friendly people at Mozilla.

Following this, I applied for Google Summer of Code this year (2016) under Mozilla. My project involves implementing parts of the Service Worker specificaton. Service Workers are a new standard for progressive enhancement of web apps on the web platform.[spec](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/)

I just received a mail yesterday, that i have been selected for GSOC'16. This year a total of 1,206 students were accepted [(gsoc-blog)](http://google-opensource.blogspot.in/2016/04/students-announced-for-google-summer-of.html), and Mozilla was one among the 178 participating organizations. [Here's](https://summerofcode.withgoogle.com/organizations/5256839985889280/?sp-page_size=48) a list of all other students who were selected under Mozilla.

Many thanks to [Josh](https://github.com/jdm), (who will be my mentor for the project) and to other members of Servo who have been very helpful in guiding me towards writing my proposal. More details on my proposal [here](https://summerofcode.withgoogle.com/organizations/5256839985889280/#4504639135285248). Josh has always been helpful for newcomers who want to get started with open source, and has even built lots of great tools to help people get started with open source, like [Asknot](https://github.com/jdm/asknot), [bugsahoy](https://github.com/jdm/bugsahoy). For people looking to contribute towards servo, [Servo Starters](http://servo.github.io/servo-starters/) is a really good resource. I also wanted to thank to [Manish](https://github.com/Manishearth). He has been my inspiration for starting to contribute to open source. Very much excited for the days ahead, and a lot to learn :)
