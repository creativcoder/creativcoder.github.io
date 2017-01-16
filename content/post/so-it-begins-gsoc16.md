+++
date = "2016-04-23T01:47:35+05:30"
draft = false
title = "So it begins with Servo: GSOC'16"
categories = ["mozilla"]
comments = true
showpagemeta = true
slug = ""
tags = ["servo", "rust", "open-source", "gsoc"]
description = "My proposal on Service Workers Infrastructure"

+++

So far learning rust has been really rewarding and i found it really interesting in the domain of system's programming; given that we don't have much choices apart from C/C++ for something close to metal. I have started a couple of personal projects of mine in Rust, [_meltdown_](https://github.com/creativcoder/meltdown) and [_silica_](https://github.com/creativcoder/silica). I hope to polish them as i learn more.


Also, I really wanted to start contributing to some open source projects related to Rust, and among them I found one called Servo, a project that is building on modern practices of safe systems programming. Servo is a parellal browser engine being developed in Rust language. Servo aims to bring a safe and parellal (at many levels) platform for the modern web, and protecting against the security and memory related vulnerabilities that, entails many existing browser engines such as webkit and gecko, using the type safety of Rust. Further design details can be seen [__here__](https://github.com/servo/servo/wiki/Design) and [__here__](https://github.com/servo/servo/wiki/General-implementation-and-design-notes).


Browser engines are complex piece of software that is almost like an operating system running and managing different things, from network requests, to html parsing, to layout tree construction, to painting content on screen. There are lot of things to learn. and that makes it a very interesting project for someone wanting to learn, "something from everything". I have been contributing to Servo for a month now, and so far it has been a great experience to learn from some of the awesome and very friendly people at Mozilla. I applied for GSOC'16 this year under Mozilla organization, and my project involves implementing parts of Service Worker specificaton. Service Workers are a new standard for progressive enhancement of web apps on modern web platform today.[__spec__](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/)


I just received a mail yesterday, that i have been selected for GSOC'16. This year a total of 1,206 students were accepted [(gsoc-blog)](http://google-opensource.blogspot.in/2016/04/students-announced-for-google-summer-of.html), and Mozilla was one among the 178 participating organizations. [__Here's__](https://summerofcode.withgoogle.com/organizations/5256839985889280/?sp-page_size=48) a list of all other students who were selected under Mozilla.


Many thanks to [__Josh__](https://github.com/jdm), (who will be my mentor for the project ) and to other members of Servo who have been very helpful in guiding me on writing my proposal. More details on proposal [__here__](https://summerofcode.withgoogle.com/organizations/5256839985889280/#4504639135285248). Josh has been always helpful for newcomers who want to get started with open source, and has even built a lot of great tools to help people get started with open source, like [__Asknot__](https://github.com/jdm/asknot), [__bugsahoy__](https://github.com/jdm/bugsahoy). For people looking to contribute towards servo, [__Servo Starters__](http://servo.github.io/servo-starters/) is a really good resource. I also want to thank to [__Manish__](https://github.com/Manishearth). He has been my inspiration for starting to contribute to open source. Very much excited for the days ahead, and a lot to learn. :)
