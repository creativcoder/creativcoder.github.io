---
date: "2020-06-21"
tags: ["script", "automation", "productivity", "rust", "crates.io", "crates"]
title: "A simple script to try Rust crates locally"
path: "/quick-way-to-try-crates"
excerpt: "Reducing the time for experimentation"
---

![microscope](https://unsplash.com/photos/_c70Nhh6p44/download?force=true&w=1920"Image credits: https://www.pexels.com/@pixabay")

## The problem we are solving here

Often times I find myself wanting to try crates locally on my machine when exploring the plethora of Rust crates available on
[crates.io](https://crates.io) from their Github page. The usual process goes like this:

Open terminal >
Go to my experiments folder >
Do git clone >
Try building the crate and run provided examples if any >
At this point I might decide if I want to use this crate or discard it away. Most of the times I just `cd` out of the folder and get back to my work and forget that I need to remove the crate directory from my machine.

As time passes and the more crates you explore, the amount of crates fills up quickly on your machine. You then have to manually sift through them to remove them. Also, a lot of space is used by the `/target` directory if you build these projects and forget to run `cargo clean` afterwards.

To alleviate the problem of crates piling up in my home directory, 
I created this simple script I named `try_crate` which has the following contents:


```bash
#!/usr/bin/sh

cd /tmp
repo_url=`xclip -selection c -o`
git clone $repo_url
dirname=${repo_url##*/}
cd $dirname

```

## What's happening there?

We use the `/tmp` directory to clone our crate locally and we simply copy the crate's Github URL from the clipboard. This means before you run this script, we need to copy the repository URL via `Ctrl+C`, which I usually do when cloning repos manually from the URL address bar. Cloning in `/tmp` directory solves my problem of having to remove the crate manually. After every system restart the `/tmp` directory is wiped clean.

I can then immediately run cargo run or `cargo run --example <example name>` to explore the crate.

## Using the script

To use this script:

* Make it executable: `chmod +x try_crate`

* Copy it to `/usr/local/bin`

* Copy the URL of the repository you want to copy (Ctrl + C)

* You can then run: `. try_crate`

The sourcing `.` is important here as we want to remain in the same `/tmp` directory after execution of this script. The `.` runs the script as part of the current shell instance rather than spawning a new shell session.

Well, that's about it. This is far from an ingenious script, but shaves off some time when I am working on multiple projects and need to experiment things quickly without cluttering my workspace. 

Thank you!
