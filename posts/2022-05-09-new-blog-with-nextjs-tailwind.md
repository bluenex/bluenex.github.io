---
title: "A new website and blog with Next.js and Tailwind CSS"
date: 09-05-2022 16:35
tags: [nextjs, tailwindcss, web]
---

It is time for a new blog post and the first ever English post! In the past few years, my work has been mostly relied on [styled-components]([https://](https://styled-components.com/)) for styling React projects I have been working on. Recently, I have got a chance to try something new (during the late recovery from COVID-19) and I picked [Chakra UI](https://chakra-ui.com/) and [Tailwind CSS](https://tailwindcss.com/). The experience so far is great but there are still many things to learn.

I have finished a couple of small projects using Chakra UI in the past months and feel that Chakra UI is so good at providing base styles and utilities so we can focus on the other tasks at hand rather than the design. That said, the customization is fairly good, not so much constrain. However, my soon to spin off project will need to be more easily to transfer to the other team members, so I think I should try another library which is favored by a community (felt by my gut feeling 😬) and I am going with Tailwind CSS.

## Tailwind CSS

In order to prepare myself for the next project, I try playing and researhing around to improve my knowledge to be able to decide whether to actually go with Tailwind CSS or not. And that is when I found a post by [Code in the Wind #1](https://www.facebook.com/events/5398524660192656/?post_id=5402035836508205&view=permalink) and learned about [tailwindPLAY](https://play.tailwindcss.com/). In that post there is an example question so I tried drawing without previous knowledge about Tailwind CSS and once I finished the question, I gained some confidence to try it out more.

## A new website

My personal website domain ([https://bluenex.dev](https://bluenex.dev)) was a simple blog built by [Jekyll Now](https://github.com/barryclark/jekyll-now) and served on GitHub Pages. My goal this time was to build a new personal website using Next.js and Tailwind CSS with TypeScript and still deploy on GitHub Pages.

The experience with Tailwind CSS is great and I am very happy with the result.

### Issue

To deploy on GitHub Pages, the site has to be exported with `next export` and with that, [some of the features are not available](https://nextjs.org/docs/advanced-features/static-html-export). One of the features that I initially need to use is the `getServerSideProps` to get tags and years of all posts for navigation in `/blog` route. However, it is not supported by static export.

Considering that this data won't be changed unless I added a new post. I workaround this by implementing a script to run before `npm run dev` called `predev.js` to gather all the tags and years and store as a `static-data.json`. The only thing I need to be aware is to not forget running `npm run dev` or `npm run predev` before deploying.

## Summary

The site is now up and running on [https://bluenex.dev](https://bluenex.dev). The design is the bare minimum I can think of by myself to satisfy my expectations. This personal website project is actually a good start for the upcoming project. There are more to improve and I will be back to this project from time to time.

This is my first post in English so the language may not be natural. Anyway, I hope it is readable and helpful for others who want to start something new.