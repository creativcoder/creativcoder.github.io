---
date: "2017-01-17"
tags: ["open source", "mozilla", "rust"]
coverImage: "http://i.imgur.com/D957yod.jpg"
title: "Helping new Rustacians in 2017"
path: "/learn-rust-2017"
description: "On why you should learn Rust"

---

It's almost been a year and a half with Rust and it has been a productive learning experience. Coming as a newbie programmer it made me a lot more insightful and aware of what knowledge of systems programming really entails and the nuances of it, thanks to the amazing documentation, blogs and community altogether. Maintaining a good community around a language is a hard thing and Rust sets a very good [example](https://www.youtube.com/watch?v=duv0tuPAnO0&list=PLo3w8EB99pqJ74XIGe72c9hBZWz9Y16cY&index=5). Programming in Rust really forced me to get down into the [details of compilers](https://github.com/rust-lang/rust/tree/master/src/librustc), [llvm IR](https://idea.popcount.org/2013-07-24-ir-is-better-than-assembly/), [formal systems](http://ticki.github.io/blog/a-hoare-logic-for-rust/), [category theory](http://yogsototh.github.io/Category-Theory-Presentation/#slide-0) and what not. At times the language syntax was obscure to understand and took me a time to settle in, but things fell into place. Eventually I ended up working on [Servo](https://github.com/servo/servo) implementing the [foundations](https://github.com/creativcoder/gsoc16) of Service Workers; meanwhile I also contributed to [rustc](https://github.com/rust-lang/rust/pulls?q=is%3Apr+author%3Acreativcoder+is%3Aclosed), [cargo](https://github.com/rust-lang/cargo/pull/3542) and other rust projects. The journey has been fun :)

Rust was at top on Most loved languages of 2016 according to [StackOverflow survey](http://stackoverflow.com/research/developer-survey-2016#technology-most-loved-dreaded-and-wanted) and there has been a growing interest among developers who want to get productive in Rust and build software systems that act [reliably](https://www.youtube.com/watch?v=P3sfNGtpuxc&list=PLo3w8EB99pqJ74XIGe72c9hBZWz9Y16cY&index=4).

Looking forward towards 2017, Rust community has certain goals and roadmaps put forward and the very first one mentioned there is: [Rust should have a lower learning curve](https://github.com/aturon/rfcs/blob/roadmap-2017/text/0000-roadmap-2017.md) and I think I as a programmer having a mere 2 years of real world programming experience and a year an half experience in Rust will be in a better position to highlight what areas of Rust are lacking the clarity that they deserve for a beginner.

I'll list here some of the "not so clear" topics most newcomers to Rust face. Addressing them would help progress goal [#1](https://github.com/aturon/rfcs/blob/roadmap-2017/text/0000-roadmap-2017.md) of the Rust roadmap 2017.

* How to be friends with the borrow checker or fighting less with the borrow checker - This has been posted quite a few times in stackoverflow, and just recently on [Reddit](https://www.reddit.com/r/rust/comments/5ny09j/tips_to_not_fight_the_borrow_checker/), which has received quite valuable advices. These explanations should really be part of the official documentation to benefit newcomers.

* When and where to use `ref`, `&` - This has also been asked by many folks over stackoverflow and other places, and it's indeed confusing initially. This post covers [them](http://xion.io/post/code/rust-patterns-ref.html) very well.

* Wrapping the head around different kinds of generic trait parameters : The documentation has less coverage on how extensive, traits can be and that there can be different variants of trait impls, and I think [Different Kind of Code Reuse in Rust](http://cglab.ca/~abeinges/blah/rust-reuse-and-recycle/) should be the part of the official book.

* Difficult to understand error messages - Many have expressed the fact that some of the error messages from the compiler are misleading and some use really technical words. An instance would be [Issue #31174](https://github.com/rust-lang/rust/issues/31174). Here, the message `non-scalar` cast for a newcomer sounds a bit technical and really could use a simple explanation.

* _Concept of lvalue mutability and rvalue mutability in Rust_ - There are two types of mutability (lvalue and rvalue, which gives rise to different cases of statements involving the keyword `mut`:

```rust
let mut r = some_val;
let r = &mut some_val;
let mut r = &mut some_val;
```

and there are differences in what they mutate. [Here's](https://medium.com/@rsx11/good-old-pointers-cfe8e2727e51#.n6c9zp76i) an article which covers those grounds.

* Details on ordering of wrapper types : Cases like whether to use `Option<Box<T>>` or a `Box<Option<T>>` in a struct field.

* Understanding the module system in Rust - A recent [tweet](https://twitter.com/withoutboats/status/816897015728640000) and the accompanying blog post also mentions about it and we probably should simplify the module system of Rust. I personally feel the use of `mod` keyword redundant as `use` could do its work i guess.

* Macros use cases and various ways of using them - [The little book of rust macros](https://danielkeep.github.io/tlborm/book/README.html) is indeed a great intro to them. It would be great if there was a repo containing examples of various ways macros are being used in various libraries in Rust and also when not to use them.

* Correct ways of implementing data structures in Rust: We need more of them. Alexis's [TooManyLinkedList](http://cglab.ca/~abeinges/blah/too-many-lists/book/) is by far the best one in this segment and i think we probably need more. One of the most common question i hear is the proper way to implement a graph data structure in Rust. [Modelling graphs in Rust](http://smallcultfollowing.com/babysteps/blog/2015/04/06/modeling-graphs-in-rust-using-vector-indices/) covers some grounds.

* The notion of function type implemented as traits: The `Fn`, `FnMut` and `FnOnce` traits and how they model the functions in Rust does not come easily to a newcomer as we usually don't see functions from a perspective of having types in other imperative languages. We should have a blog post explaining why functions are attributed to the traits they implement and what semantics does it entail for the programmer.

* Making sense of lots of lifetimes annotations and minimizing the overhead of reading Rust codebase: In order to get productive on using Rust libraries and also to be able to write some code, developers need to quickly get up to speed in understanding other Rust codebases. This comes as a blocker as there is a lot of syntax to go through regarding lifetimes and it takes time: `Lo<'a'>ts of <'a> and <'b><'c' T><U, V, X, Y>`. 😱  We would like to have a blog post explaining ways to read and understand such codebases.

* Different ways to use built in traits: [Rust's Built-in Traits, the When, How & Why](https://llogiq.github.io/2015/07/30/traits.html) is a very good introduction. Also, real world use case blog posts would be benefited greatly.

* Tagged Enums/Sum Types: Sum types are concepts mostly confined to functional languages, and people who do not have a background in functional languages may find them difficult to grasp. Understanding the notion of Sum types in Rust (i.e., the `Option` and `Result` type) and the way they can encapsulate parameterized types within them. This does not come intuitively for a programmer with background from other imperative languages.

To attract more developers, we also need a drive, a reason to adopt Rust into their toolbelt. A general account and list of code examples with comparision to other languages will really help programmers appreciate the language in a greater sense. There has already been steps taken [here](https://github.com/mgattozzi/rust-from-lang). 
Code reviews like [RipGrep Code Review](http://blog.mbrt.it/2016-12-01-ripgrep-code-review/) are another ways to help people understand how language constructs are put into real world projects. 

I would encourage newbie rust learners to regularly hang out in the `#rust-beginners` irc channel on `irc.mozilla.org` and just ask away. Rust community is encouraging, very active and eager to help out. Also do read a lot of Rust code. Thanks :)
