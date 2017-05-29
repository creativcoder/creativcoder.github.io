+++
date = "2016-06-19T22:36:08+05:30"
draft = false
title = "A short intro to type classes in Haskell"
categories = ["functional-programming"]
comments = true
showpagemeta = true
slug = ""
tags = ["haskell", "functional-programming", "typeclasses"]
description = "Getting familiar with the arcane syntax"

+++

Haskell as a language, always fascinates me with its unique typesystem and constructs that offer expressiveness, like no other languages.

Today I want to share something i learned called Type classes in haskell.

Let's create a simple useless function in haskell, to discover what a typeclass is.

So here's our `magical` function:

```
-- simple_haskell.hs
magical x y = (x+y) * (x-y)
```

now, lets load it in ghci real quick,

```
ghci> :l simple_haskell.hs
```

Now when we examine the type of `magical` by:

```
:t magical
```
what we get is this:

```
Num a => a -> a -> a
```
Ah, you see a chain of a's. Thats really not helpfull ghci :|

y u no simple to read haskell. :D

Okay lets break it down... shall we !

Here our  a -> a -> a just says that, our function `magical`, takes two types `a` (the first two a's) and returns a type `a`.
Yeah, functions in haskell are typed just like that. Take a note that the last one always is the return type. Actually, there is more going on here, which is called currying in functional lingo, but that will be part of another post.

So whats with the first `Num a`. This is what what we are interested in.
The `Num` in `Num a`, is a `typeclass` in haskell, and the `a`, is what we call a type variable, (just a placeholder if you will).

Now the `Num` typeclass in Haskell as an analogy; is a holder of a family of concrete `Num`ish types, which can be `int`, `long`, `float`, `double` etc. Similary `Eq` is another typeclass in haskell, that is used to provide total ordering semantics for two comparable types.

Typeclasses in haskell is a construct which encapsulates different functions or behaviours for any type, that falls under that typeclass. They allow you to generalize over a multitude of types confirming to a set of protocol.

Thats it folks. I intend to update this article in future with more details.
