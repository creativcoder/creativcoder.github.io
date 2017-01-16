+++
date = "2016-02-21T12:20:17+05:30"
draft = false
title = "Using Trait objects in Rust"
categories = ["mozilla"]
comments = true
showpagemeta = true
slug = ""
tags = ["servo", "rust", "open-source", "gsoc"]
description = "making your rust code polymorphic"

+++

This, post aims to give, a very gentle introduction to traits objects in rust aimed at people who already are familiar with Traits in Rust. If you don't know about traits well, a good read is [here](http://blog.rust-lang.org/2015/05/11/traits.html). A trait is the specification of an interface. That interface can contain functions (both member, and non-member), types and constants. In rust world, they are pretty much everything underlying the constructs we use like operators, functions, loops, and also can serve as identities for marking entities as being thread safe (the Send and Sync). Traits are similar to typeclasses in haskell.

Now, a Trait Object in rust is denoted by a `&` before its name. So when can we use a trait object ? A possible use case is shown here. We will base our understanding on taking a real world example. Understanding this way eventually leads us to the insight, of applying it into our day today rust code.

Lets say we want to create a muscian who is very versatile and our goal is to give him the ability, or more technically a `method`  by which he can play any instrument given to him. So lets create a musician.

```
struct Musician {
    name:String
}
```

Lets create a constructor for our musician, so its easy to create a musician inside our `main` method.

```
impl Musician {
    fn new(name: &str) -> Self {
        Musician { name: name.to_string() }
    }
}
```

Lets create some musicial instruments for the musician to play.

A Piano.
```
struct Piano {
    keys:usize
}

impl Piano {
    fn new(key:usize) -> Self {
        Piano { keys: key }
    }
}
```
and a Guitar.
```
enum GuitarType {
    Acoustic,
    Electric
}

use GuitarType::*;

struct Guitar {
    _type:GuitarType
}

impl Guitar {
    fn new(_typ:GuitarType) -> Self {
        Guitar { _type: _typ }
    }
}
```

And lets define a trait called `Playable`, which has a method called `play`.
```
trait Playable {
    fn play(&self);
}
```

Now we will impl, the `Playable` trait for both of our instruments:
```
impl Playable for Guitar {
    fn play(&self) {
        println!("playing guitar");
    }
}

impl Playable for Piano {
    fn play(&self) {
        println!("playing piano");
    }
}
```

Now comes the interesting part. Look closely.
```
impl Musician {
    fn play_instrument(&self, ins:&Playable) {
        ins.play();
    }
}


fn main() {
    let musician = Musician::new("Sam");
    musician.play_instrument(&Piano::new(34));
    musician.play_instrument(&Guitar::new(Acoustic));
}
```

Here we are defining a generic method `play_instrument` on our `Musician` struct that is able to take any type (`&Playable`) that implements the Playable trait. We have used a trait object here.
So this `play_instrument` method will take any argument, for the `ins` parameter, which has implemented the `Playable` trait, which in our case are `Guitar` and `Piano`.

We have made our Musician, play any instrument by using trait objects. So it can play a guitar as well as a piano, using a trait object as a parameter.

Trait objects mimics a sort of dynamic dispatch or runtime polymorphism.
It uses the virtual method table internally, for resolving the appropriate method to call.
At runtime, at invocation of the `play_instrument` method Rust uses two pointers: one for the value with the which the method was invoked and the other which points to the table of methods for that specific trait impls, and after resolving the method it pass the value pointer
to that specific method. This all happens at runtime. So trait objects have a runtime overhead, as compared to static dispatch by using only traits.

So that was it. I am fairly new to rust and would love to know if i missed or misinterpreted anything, that should be known to every Rustacian out there. Let me know by your comments below.
