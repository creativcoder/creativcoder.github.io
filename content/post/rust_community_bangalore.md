+++
date = "2017-06-01T23:25:02+05:30"
featureimage = "http://i.imgur.com/8gwV96b.jpg"
draft = false
title = "Meet rustox ! Rust community at Bangalore"
categories = ["profiling", "rust", "memory", "valgrind"]
comments = true
slug = ""
tags = ["community", "rustox", "rust", "meetup", "2017"]
description = "A quick guide on using Valgrind on Rust code"

+++

So another rust-lang community got added to the [Users group](https://www.rust-lang.org/en-US/user-groups.html). This time in Bangalore. Its a great opportunity for people interested in learning more about the language and also for rustaceans like us to spread awareness about the benefits of adopting rust to their toolbelt as a systems language.

So at the meetup we started; celebrating 1.0 (May 15) stable release of Rust by cutting the cake. Then we got delivered an awesome pitch by [Saifi](https://www.meetup.com/rustox/members/140949432/) introducing what rust has to offer, what improvements it brings over other languages, what redundancies it resolves and why one should invest time in learning it. After the slides we got a hands on coding session which got initiated by installing and setting up rust in their machines.

--------

Here's the slide by Saifi for interested ones.
<iframe src="https://www.hashdoc.com/documents/556864/embed" width="728" height="581" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #EAE9EA; border-width:1px; margin-bottom:5px; max-width: 100%; background: #fff;"></iframe> <br>

-------

The audience of the meetup were people coming from imperative programming background (mostly python and java and c). We also discussed planning details of the next rust meetups and folks there seemed really interested which is really encouraging.

As i came from a python background and got started into rust some 2 years back, I was asked to share experiences of a newbie moving from a dynamic, managed language as python is; to a statically typed, granular control oriented language that is Rust. Key points to mention would be:

* It is time consuming to learn rust (6 months on average for someone coming from dynamically typed and imperative background), because you will be facing with topics that you didn't had to care about and also some functional programming concepts which you'll have to grok along the way.

* If you have functional programming background then it would take around 2 weeks to get comfortable with syntax. I realized this when i started reading more on haskell, type theory and category theory. So having a fp background will help.

* Newcomers to rust most often are scared by the verbose syntax, lifetime symbols and traits sprinkled over in function signatures and elsewhere but fear not my friend; they are there for a good reason because Rust puts emphasis on encoding lots of guarantees and assumptions about the correctness of your program in the source code itself and not rely on runtime checks (some exceptions to this being "bounds checking" which has to be done at runtime).

* One of the best things you get from the rustc compiler is the error messages which is unlike other compilers i have experienced. I got to know more about this by working on an [error issue](https://github.com/rust-lang/rust/pull/35567) and its great to see how articulate the compiler can be on pointing out mistakes in your code. Another thing is if you mistyped a method name or a module import it would give you hints towards that method which is sleek.

* You will get to know a lot of things from the rust compiler about the control flow of your program and how resources are managed at syntactic and semantic level.

* All i have to say is i have benefited a lot and learned some finer details about programming in general by adopting rust.

So yeah I really look forward for our rustox community on organizing amazing content and guides for people who are curious to learn and build stuff with rust. I would like to thank [Saifi](https://www.meetup.com/rustox/members/140949432/) [Ragini](https://www.meetup.com/rustox/members/216123871/) and [Jeeva](https://www.meetup.com/rustox/members/57146902/) the efforts of whom made this meetup possible. I probably missed few sessions by other folks as i came half hour late so apologies if i missed anything to mention here. Anyways Checkout photos below.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Rust Birthday cake. <a href="https://twitter.com/hashtag/rustox?src=hash">#rustox</a> <a href="https://twitter.com/hashtag/bangalore?src=hash">#bangalore</a> <a href="https://twitter.com/hashtag/rustlang?src=hash">#rustlang</a> <a href="https://twitter.com/hashtag/community?src=hash">#community</a> <a href="https://t.co/nvldsImicQ">pic.twitter.com/nvldsImicQ</a></p>&mdash; Rust Bangalore (@rustox) <a href="https://twitter.com/rustox/status/865966348949520386">May 20, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

![rustox community](http://i.imgur.com/19RNhoh.jpg)
The group pic !


![rustox community](http://i.imgur.com/m8jRiUy.jpg)

![IMAGE](http://i.imgur.com/lLYxE3M.jpg)
Me sharing experience of moving from python to rust.

I you are near bangalore, make sure you do follow us on twitter [@rustox](https://twitter.com/rustox) and refer to [rustox community page](https://sites.google.com/view/rustox/home?authuser=0), for frequent updates to talks and hackathons that we will cooking for our coming meetups. 
