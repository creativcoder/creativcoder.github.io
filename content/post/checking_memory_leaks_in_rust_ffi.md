+++
date = "2017-03-13T23:25:02+05:30"
featureimage = "img/ffi.jpg"
draft = false
title = "Valgrind with Rust - Checking memory leaks in your ffi library"
categories = ["profiling", "rust", "memory", "valgrind"]
comments = true
slug = ""
tags = ["profiling", "rust", "memory", "valgrind"]
description = "A quick guide on using Valgrind on Rust code"

+++

If you are someone writing Rust wrappers for C libraries, then you might as well wanna verify that you are doing the right cleanups in your destructors or you might ignorantly create potential memory leaks from usage of your library. In this post we'll see how to use the very same tool you use in your c programs, i.e., _Valgrind_ to check for memory leaks in your rust wrapper library.

In order to check for memory leaks we should first have code that does the leaking. Just to keep it brief we won't show a ffi library example, but we will be having a tiny example library having a method that does some allocation and forgets to release memory at the end of its scope (using mem::forget).

So here's our small library called `leaky_lib` with just one api called `allocate()`.

```
[lib.rs]
use std::mem;

pub fn allocate() {
    use std::mem;
    let bad_vec: Vec<char> = Vec::with_capacity(1024);
    for _ in 0..1024 {
        bad_vec.push('0');
    }
    mem::forget(bad_vec);
}

[main.rs]
fn main() {
    allocate();
}

```

Here `allocate()` allocates memory on the heap then we deliberately tell it to forget about that allocation therby explicitely causing memory leak.

Now if we run our program with `valgrind --leak-check=full ./target/release/leaky_lib`

```
creativcoder% valgrind --leak-check=full ./target/release/leaky_lib 
==2488== Memcheck, a memory error detector
==2488== Copyright (C) 2002-2015, and GNU GPL'd, by Julian Seward et al.
==2488== Using Valgrind-3.12.0 and LibVEX; rerun with -h for copyright info
==2488== Command: ./target/release/leaky_lib
==2488== 
==2488== 
==2488== HEAP SUMMARY:
==2488==     in use at exit: 0 bytes in 0 blocks
==2488==   total heap usage: 6 allocs, 6 frees, 2,000 bytes allocated
==2488== 
==2488== All heap blocks were freed -- no leaks are possible
==2488== 
==2488== For counts of detected and suppressed errors, rerun with: -v
==2488== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```

To our surprise, the leak doesn't show up anywhere in valgrind logs. What is happening here :O ?

The reason behind this is with the use of `jemalloc` being used as the default allocator in `rustc`, which as of now doesn't play well with valgrind (See details on this [issue](https://github.com/rust-lang/rust/issues/28224))

But fear not, rust also allows us to fallback to os's default allocator i.e., the free and malloc. This can be opted in by using compiler attributes at your crate root (`lib.rs`) as shown below. _( NOTE: Switching allocators only works for nightly release as of now. So just do a `rustup override set nightly` )_

```
#![feature(alloc_system)]
extern crate alloc_system;
```

So once we have those attributes in place, lets try running valgrind again.
(Some lines omitted for brevity)

```
creativcoder% valgrind --leak-check=full ./target/release/leaky_lib
==3198== Memcheck, a memory error detector
==3198== Copyright (C) 2002-2015, and GNU GPL'd, by Julian Seward et al.
==3198== Using Valgrind-3.12.0 and LibVEX; rerun with -h for copyright info
==3198== Command: ./target/release/leaky_lib
==3198== 
==3198== 
==3198== HEAP SUMMARY:
==3198==     in use at exit: 4,096 bytes in 1 blocks
==3198==   total heap usage: 15 allocs, 14 frees, 6,339 bytes allocated
==3198== 
==3198== LEAK SUMMARY:
==3198==    definitely lost: 4,096 bytes in 1 blocks
==3198==    indirectly lost: 0 bytes in 0 blocks
==3198==      possibly lost: 0 bytes in 0 blocks
==3198==    still reachable: 0 bytes in 0 blocks
==3198==         suppressed: 0 bytes in 0 blocks
==3198== 
==3198== For counts of detected and suppressed errors, rerun with: -v
==3198== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```

Aha ! this time we can see our leaks...

So lets quickly remove our explicit leaky intentions from the code. By that i mean removing the `mem::forget(v)` and re-run this again.

```
creativcoder% valgrind --leak-check=full ./target/release/leaky_lib
==3837== Memcheck, a memory error detector
==3837== Copyright (C) 2002-2015, and GNU GPL'd, by Julian Seward et al.
==3837== Using Valgrind-3.12.0 and LibVEX; rerun with -h for copyright info
==3837== Command: ./target/release/leaky_lib
==3837== 
==3837== 
==3837== HEAP SUMMARY:
==3837==     in use at exit: 0 bytes in 0 blocks
==3837==   total heap usage: 15 allocs, 15 frees, 6,339 bytes allocated
==3837== 
==3837== All heap blocks were freed -- no leaks are possible
==3837== 
==3837== For counts of detected and suppressed errors, rerun with: -v
==3837== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

Cool, no more memory leaks and we're saved.
