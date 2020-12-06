---
date: "2020-12-06"
title: How to setup NextJS with TailwindCSS 🌊
description: A quick guide to getting up and running with tailwindcss
path: "/setup-nextjs-tailwind"
tags: ["tailwindcss", "react", "nextjs", "stylesheets", "frontend"]
excerpt: "Quick guide for getting up and running with NextJS and TailwindCSS"
---

![Cover](https://dev-to-uploads.s3.amazonaws.com/i/wkne1amv5nhxnp1553ps.png)

Lately, I've been dabbling with frontend projects and as a result, have been looking for the best out-of-the-box frontend stack. I found NextJS with TailwindCSS checks most of my requirements. As a backend engineer who does not want to dabble  much with setting up a website or a project with hundreds of webpack plugins and manual configurations, I think NextJS with TailwindCSS provides a great rapid prototyping experience.

So I thought of putting together an article as a note to self about setting up TailwindCSS with NextJS. Hopefully this will also be helpful to you if you are starting a project with the same stack.

First, a bit of intro to these. 

NextJS is a framework built on top of react with all the three lettered jazz (SSR and friends). The website explains it better than I do: https://nextjs.org/

[TailwindCSS](https://www.youtube.com/watch?v=3u_vIdnJYLc&t=10s) on the other hand is the next best thing to happen to CSS ecosystem after Bootstrap (in my opinion). It let's one prototype and experiment with UIs quickly without having to switch back and forth between your HTML and CSS files because in TailwindCSS, what you get is lego like blocks of CSS classes which you can mix and mash to create beautiful layouts. Later, when these classes get too big, you can extract the them into their own styled components using the `@apply` directive. It's like writing a bunch of lines of code and then extracting them out as functions. Quite amazing! As someone who does mostly backend, this is certainly an efficient way to prototype and get feedback on UI design. It reduces the context switch by a lot!

With that introduction out of the way, let's dive right in!

First, we'll create a NextJS app by running:

```
npx create-next-app next-tailwind
```

`npx` allows you to run binary packages from npm directly without installing them locally. Then, we'll cd into the folder and add the `tailwindcss` package:

```
cd next-tailwind
yarn add tailwindcss
```

Once that's added, we move in our `styles` folder and we'll create a `globals.css` file (might already be there for you):

```
touch styles/globals.css
```

To this file, we'll add the following tailwind directives and remove any existing styles if any:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The doc explains what they do: https://tailwindcss.com/docs/functions-and-directives
We'll also add a tailwind configuration file as you might need to customize the built-in style components classes it provides (injected via the above directives). So we'll run:

```
npx tailwindcss init
```

This creates a `tailwind.config.js` file at the root with basic fixtures for all customizable options:

```js
// tailwind.config.js

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

```

One can also pass `--full` to populate the full list of configurable fields.

The final step is to add a postcss configuration file as we'll need to convert the contents of `globals.css` and any tailwind classes we write in on our page to plain CSS for our browser to understand. We'll create a configuration file for postcss at root:

```
touch postcss.config.js
```

where we'll add the following:

```js
// postcss.config.js

module.exports = {
	plugins: [
		'tailwindcss'
	]
}

```

We specify the plugin we want to use which is `tailwindcss`. With that, our setup is complete. Let's take it up for spin: 

```
yarn dev
```

To try tailwind, let's clear everything in `pages/index.js` and paste the following:

```jsx
// pages/index.js

export default function Home() {
  return (
    <div className="bg-yellow-300 flex h-screen justify-center items-center">
      <button className="bg-white p-5 shadow-lg duration-200 hover:bg-yellow-200 transform hover:-skew-x-12">
        Hello tailwind next
      </button>
    </div>
  )
}
```

That's a classic centered `div` example we've just created using a bunch of tailwind classes sprinkled in between.

Our parent div is a flex wrapper `"flex"` with a yellow background `"bg-yellow-300"` with screen height `"h-screen"` where items on main-axis (horizontal) are aligned as `"justify-center"` and items on cross-axis (vertical) are `"items-center"`.

The button within, has a white background `"bg-white"` with a shadow `"shadow-lg"` and a padding `"p-5"`. We also put some styles on the hover state: `"hover:bg-yellow-200 transform hover:-skew-x-12 duration-200"`. Here we are just saying: on hover make the background yellow and skew it clockwise (-12deg) and transition with 200ms.

Let's head over to our browser to see it in effect:

![Tailwind demo](https://dev-to-uploads.s3.amazonaws.com/i/itr5o87lsxkugfi7zo3y.jpg)

Neat! 

As you can see, we did all of this without ever touching any CSS file. Also, these class names are quite intuitive and having worked multiple times with tailwind, I now rarely need to look them up during rapid prototyping, which cuts another chunk of time spent looking at the docs.

It was with tailwind that I was able to quickly create a very simple landing page for [avrow](https://creativcoder.dev/avrow).

As an added note: [Tailwind playground](https://play.tailwindcss.com/) is an online tailwind playground that you can use to rapidly prototype UIs.

And that's how you setup tailwind with NextJS. Until next time.

Source code for this post is available at: https://github.com/creativcoder/next-tailwind

Cheers!