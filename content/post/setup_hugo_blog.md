+++
date = "2015-09-15T21:29:42+05:30"
draft = false
title = "Creating a Hugo blog on Github pages workflow"
categories = ["blogs"]
comments = true
showpagemeta = true
slug = ""
tags = ["hugo", "blog", "setup", "beginner"]
description = "Get up and running with hugo"

+++


So, I migrated my blog to hugo; and after reading a few posts on setting up a new blog with Hugo,I found many of them were really not elaborate enough for newcomers to hugo, and so this post. Hugo is a really lean and fast static site generator written in Go. Now, ill give a high-level overview of how our blog will be setup. Inside our blog repo their will be two branches, once `source`, which will store only our posts in markdown and other configs and the other branch will be `master`, which will contain all files generated in the public folder by hugo.


So here goes:


Get Hugo
----------
The obvious step. Head over to the Hugo website and download the most recent release [here](https://github.com/spf13/hugo/releases).


Make your home
-------------

Our blog needs a place to stay, right. So, Create a repository on Github by your username (`<username>.github.io`). Then, create a folder on your local machine, with the same name and do a `git init` and then add your remote repo url which we created above with

```
git remote add origin https://github.com/<username>/<username>.github.io.git
```

Lets Hugo
--------------

In your local folder, to create a new hugo site; type:
`hugo new site [path]`, the path is where you want to create your hugo site, which in our case is a `.` , since we're inside our blog folder. 
This will create a new hugo site with all the required directory structure.

`<username>.github.io`
: |--   `.git`
: |---   `archetypes/`
: |---   `content/`
: |---   `data/`
: |---   `layouts/`
: |---   `static/`
: |---   `config.toml`

our blog posts in markdown syntax will reside at `content` and the `config.toml` contains site wide configurations, which we will customize soon. 

Embellishments
--------------

You want your blog, to be different from the usual, so Hugo has you covered. You can choose from a wide variety of themes developed by good open source guys, from the [Hugo themes](http://themes.gohugo.io) repository, but while browsing through the themes section, i found the themes, don't have a consistent procedure for integrating the theme into their hugo blog, and some of them are missing their docs as well. So, here, ill pick the one i chose (`grayshade`) and will explain how to setup `greyshade` for your blog. Once you get the know-how of setting a single theme, then picking on others will be easy.

We'll add the greyshade theme, as a submodule in our blog repository, so that in future if the creator of the theme makes new updates to the theme, we can be sure that all changes are synced, and can update the theme as well.
You might ask what a submodule is ? Well a submodule in git is basically just a git repository (our theme) inside another git repository (our blog). I hope that makes sense. Git maintains a reference to the submodules in folder `.git/modules`. More on submodules [here](http://blog.jacius.info/2009/08/09/your-git-submodule-and-you/).

First clone the greyshade [theme](https://github.com/cxfksword/greyshade)
repository by : `git submodule add https://github.com/cxfksword/greyshade themes/greyshade`.
We have to copy the theme repo, inside a folder `themes` with a name `greyshade`.

Now, remember about `config.toml` in our root dir, that is site wide configuration file. You can configure that, according to your own, by reading hugo docs, but the greyshade repo already has a template `config.toml` for us. So just look at their [README.md](https://github.com/cxfksword/greyshade#setup), and configure according to your own.


Time for Content
--------------

Now time for some actual content.

Inside your blog repo, type `hugo new post/intro-post.md`. With that, hugo will generate a `intro-post.md` file with some metadata, like timestamps, titles etc., inside `content/post` directory. Now you can write your post in markdown syntax in `intro-post.md`

After you're done with that, remember to set `draft = false`. So that hugo will not ignore the post when its building the html files.

Note: At this point, its a good idea to commit and push our blog repo to our Github. (We'll give our branch name `source`)
So first do a `echo 'public' >> .gitignore `, since we dont want our public folder to be in our `source` branch.
Then do, a `git checkout -b source`, followed by `git add -A`, 
then `git commit -m "updated src blog"`,
finally `git push origin source`.


Show it to the world
--------------

So, you'd like to show your shiny new blog post to the world !
While still in our same repo, issue the command, `hugo --theme=greyshade`.
With that, hugo will generate our site in the folder named `public`, and you can view the generated site on localhost using:
`hugo serve --theme=greyshade`. So far so good.

Now get inside the public folder and do a git init again here. This inner repository will go to our `master` branch on Github.

Then, as before:
`git add -A`
`git commit -m "published blog"`
`git push origin master`

Note: Don't forget to add the same remote url in this repo as well.

And with that, you're blogging away, with hugo on `<username>.github.io`.

I hope that helped. Let me know by comments.
