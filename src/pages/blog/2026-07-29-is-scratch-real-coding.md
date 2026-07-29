---
templateKey: blog-post
title: Is Scratch Real Coding?
titleColor: "#264548"
bgColor: "#faf6ee"
date: 2026-07-28T23:26:16.663Z
description: >+
  If your kid has come home excited about a game or animation they made in
  Scratch, you've probably wondered: is this actually teaching them to code? The
  colorful blocks, the cartoon sprites, the drag-and-drop interface,  it feels
  more like play than programming. 

  So what's really going on under the hood?

featuredPost: false
featuredImage:
  image: /img/scratch-thumbnail.jpg
  alt: Accessibility name
---
The short answer is yes. Scratch is real coding. But the longer answer is more interesting,  and it's one we've thought a lot about at The Coding Space, to the point where we built our own version.

## **Where Scratch came from**

Scratch was developed at MIT's Media Lab by a research group called the Lifelong Kindergarten Group, led by professor Mitch Resnick. The idea was simple but radical: what if kids could learn to code the same way they learn to build with LEGOs, by making things they actually care about? Instead of memorizing syntax, kids would snap logic blocks together and see their ideas come to life on screen. Scratch launched in the mid-2000s and has since grown into one of the most widely used coding platforms in the world, with tens of millions of projects shared by kids across nearly every country. 

The concepts underneath those colorful blocks are real: loops, conditionals, variables, events, functions. When a student writes a Scratch program that makes a sprite move when you press an arrow key, they're thinking through the same logic a professional developer would use. The blocks are just the training wheels, and good ones at that.
So why did we build something different? 

## **Where we took Scratch**

We love Scratch. We've taught with it for years. But we kept running into the same problem, over and over, with nearly every student we worked with.

Here's a classic example. A student writes a loop that hides a sprite, then shows it, over and over. They run it expecting to see the sprite blink. Nothing happens, the sprite just disappears. Why?

![](/img/scritch2.png)

![](/img/scritch1.png)



The screen doesn't update every time a block runs. It only updates at specific "yield points" like the end of a loop or a wait block. So when that hide/show loop runs, Scratch is actually processing both blocks before the screen gets a chance to catch up. The sprite technically blinks, but so fast that the screen never shows it. The computer isn't "going too fast" (a phrase that's never fully satisfied a curious 10-year-old); it's just that Scratch has invisible rules about when the screen refreshes, and students can't see them.
This matters because it teaches a habit that doesn't transfer anywhere else in coding. No other programming language works this way.

So we built **Scritch** (our own version of Scratch) with one core change: the screen updates immediately after any block that causes a visual change. Move a sprite, the screen updates. Change a costume, the screen updates. Hide a sprite, the screen updates. The result is that students can actually see what their code is doing, step by step. When something goes wrong, you see it happen in real time. 

If your child is working in Scratch, they're coding. They're just doing it in the place that gives them the best possible start.

🔗 Curious about what level is right for your child? Browse our classes here: https://www.thecodingspace.com/programs/our-coding-classes/