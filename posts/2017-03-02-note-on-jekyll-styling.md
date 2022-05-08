---
title: บันทึกการแก้ไขสไตล์ของ Jekyll theme
date: 02-03-2017 13:00
tags: [note, jekyll]
---

เมื่อสองสามวันมานี้ได้เข้าไปวุ่นวายกับ `css` ของ [tupleblog](https://tupleblog.github.io/) นิดหน่อยเลยมาบันทึกไว้

เรื่องเริ่มจาก [@titipata](https://github.com/titipata) ทักมาว่าอยากเปลี่ยนรูปแบบของ code block ในบล็อกหน่อย ไอเราก็คิดมานานแล้วเหมือนกันว่ามันไม่ค่อยได้อย่างใจเท่าไหร่ ก็เลยลุยเลย เริ่มแรกก็สำรวจโค้ดที่มีอยู่ก่อนเนื่องจากเป็นธีมที่โหลดมาจาก [http://jekyllthemes.org/](http://jekyllthemes.org/) อะเนาะ ก็ไปเจอไฟล์ที่เกี่ยวข้องใน [`_sass`](https://github.com/tupleblog/tupleblog.github.io/tree/master/_sass) คือ `_pygments.scss` ที่จัดการเรื่องสไตล์ทั้งหมดของ `highlighter` ได้ความแล้วก็ไปหา color scheme สิรออะไร ให้จัดสีเองหมดคงไม่ไหวไม่มีความสามารถขนาดนั้น แล้วก็ไปเจอ [repo นี้เข้า](https://github.com/dwayne/sass-pygments/) ซึ่งก็จัดว่าเด็ดแต่ถ้ามี preview จะดีงามกว่านี้มากมากมาก จากนั้นก็ไม่รอช้า บอก [@titipata](https://github.com/titipata) ให้เลือกมาสักสองสามชื่อจะได้มาลองกันว่าจะเอาอันไหน (จริงๆ แอบคิดว่าเอามาให้หมดซะเลยให้เปลี่ยนทีหลังได้ด้วย แต่คิดไปคิดมาก็ไม่ได้อยากเปลี่ยนบ่อยขนาดนั้นปะวะ เลยตกไป) แล้วก็ได้มาสี่ห้าชื่อประมาณนี้ `xcode`, `vs`, `solarized`, `monokai`, `pastie` แล้วก็ `manni` ลองไปลองมาสุดท้ายได้ `manni` โอเคจบตรงนี้ไป

นั่งลองไปสักพัก ฟ้อนต์ไม่ค่อยได้วุ้ย มาๆๆ เลือกฟ้อนต์หน่อยเพื่อน ระดับนี้แล้วก็ต้อง open fonts อะนะ แล้วจะให้ดีฟ้อนต์สำหรับโค้ดก็น่าจะเป็น **monospace** โอเคไปเลยจ้า [Google Fonts](https://fonts.google.com/?category=Monospace) นั่งมองกันสักพักก็ได้มาอีกสามชื่อ คัดเลือกกันสักพักก็ได้ [**Roboto Mono**](https://fonts.google.com/specimen/Roboto+Mono) มาเป็นที่หนึ่ง ก็ไปจัดการแปลงฟ้อนต์เพื่อใช้สำหรับเว็บด้วยเครื่องมือเจ้าเดิม [fontsquirrel](https://www.fontsquirrel.com/tools/webfont-generator) ได้ไฟล์ `woff` `eot` `svg` `ttf` มาเสร็จสรรพ แล้วก็พบว่าการเพิ่มฟ้อนต์เข้าเว็บนี่ยุ่งยากเหมือนกันนะ (เคยทำตอนเปิดบล็อกแรกๆ แต่ลืมไปละ ลืมสนิท) ทำอยู่สักพักทำไมไม่ได้สักทีฟะ เลยต้องไปขุด commit เก่าที่เคยทำไว้ดู กราบขอบคุณที่โลกนี้มี `git`.. ตามไปดู [commit นี้](https://github.com/tupleblog/tupleblog.github.io/commit/e0a4933842687a6196d4c4bf2fff63c98c17e87f#diff-6badce5a0657d8fcbf3905e5c8d4f6fa)เลย ตรงนี้เลยที่ลืม ลืม  `import`..

โอเค ปรับขนาดอะไรเรียบร้อยมาสังเกตเห็นของแปลกอีกละ เส้นขอบของกรอบกับ `padding` ไม่เท่ากันเวลาใช้ <code>{% raw %}```{% endraw %}</code> กับ `{% raw %}{% highlight %}{% endraw %}` ตึกโป๊ะ ก็เลยแงะ inspector มาดูพบว่า `{% raw %}{% highlight %}{% endraw %}` คอมไพล์แล้วได้

```html
<figure>
    <pre class="highlight">
        <code></code>
    </pre>
<figure>
```

ส่วน <code>{% raw %}```{% endraw %}</code> คอมไพล์ได้

```html
<div class="highlight">
    <pre>
        <code></code>
    </pre>
</div>
```

ซึ่ง `<figure>` มี `padding` เป็นของตัวเอง ส่วน `.highlight` มี `border` เป็นของตัวเอง เอ้อ เอาสิ ก็มานั่งหาทางแก้แบบเชิงเทคนิค คิดไปสักพักยังไม่ทันคิดออก [@titipata](https://github.com/titipata) บอกเออ งั้นเปลี่ยนเป็น <code>{% raw %}```{% endraw %}</code> แม่มให้หมดเลยดีกว่า (สาเหตุที่มีทั้งสองแบบเพราะแบบ triple-ticks นี่พึ่งมารองรับตอน **Jekyll 3**) ฟ้าบบบ สิบนาทีผ่านไป `push` มาอย่างไว ยอมมันเลย

code block ของ [tupleblog](https://tupleblog.github.io/) ก็เลยหน้าตาเปลี่ยนไปด้วยประการฉะนี้

ปิดบล็อกนี้ไปด้วย [commit](https://github.com/tupleblog/tupleblog.github.io/commit/e7f7439ba00ba627e2977b9ae7ad64939d7d384e) ที่ได้แก้สไตล์ตามที่เล่ามาทั้งหมด



