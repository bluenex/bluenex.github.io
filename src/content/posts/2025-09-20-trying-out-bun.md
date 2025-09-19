---
title: "Trying out Bun"
date: 20-09-2025 00:34
tags: [web, bun]
---

I've got some time while the lovely son is at my sister's house and I feel like I want to spend an hour trying something new. So I decided to try out [Bun](https://bun.sh/).

Starting with gathering ideas of what to do by discussing with LLM and then planning about where to deploy and boom, I got my hands dirty with it—pretty fun hour!

So I've built a simple static website with Bun + React that calls a worker to count page views and store it in Cloudflare KV. The implementation is simple but took some time to figure out how to deploy properly. Below is how it looks.

![screenshot of the bun website](/images/bun-hit-counter.jpg)

Although not very fancy and not quite deep enough to admire the performance of Bun, at least I learned how Bun's project structure looks like, how to deploy it to Cloudflare Pages and lastly got to post this blog.

Check it out on [GitHub](https://github.com/bluenex/bun-hit-counter) or the [live site](https://buncount.bluenex.dev/).
