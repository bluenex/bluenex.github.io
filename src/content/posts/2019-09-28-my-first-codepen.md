---
title: บันทึกครั้งแรกกับการเขียน CodePen
date: 2019-09-28T00:03
tags: [web]
---

 ไม่ได้เขียนบล็อกมานานมาก (มากกกกกกจริงๆ) บล็อกล่าสุดเขียนเมื่อเกือบสองปีก่อน 5555 พอดูเวลาของบล็อกแรกก็พบว่าเฮ้ย เราทิ้งบล็อกไว้บน GitHub Pages มาจะสี่ปีแล้วนะ ช่วงนี้กำลังพยายามหาเวลามาจัดการกับสิ่งที่ติดค้างอยากทำมานาน และนี่ก็เป็นหนึ่งในสิ่งที่อยากทำ นั่นก็คือการเขียน CodePen ของตัวเองบ้างซะที

 ที่ผ่านมาเราก็ได้ใช้บริการ (ส่องโค้ดคนอื่น) พวกนี้มาตลอด ทั้ง CodePen, CodeSandbox หรือ JSFiddle แต่ก็ไม่เคยจะมีจังหวะมาเขียนอะไรที่เกิดจากไอเดียตัวเองจริงๆ ซะที มาวันนี้โอกาสดี มีสิ่งที่อยากทดลองจากโปรเจ็คนึงที่ทำอยู่ก็เลยทำซะเลย

 Pen นี้แค่อยากลองว่าเราจะสามารถเซตสีพื้นหลังของไอคอนจาก FontAwesome ให้มันเพิ่มขึ้นเป็น % ได้มั้ย ลองค้นๆ ดูก็เจอคนทำด้วยวิธีที่เราเองก็คิดแว๊บแรกเมื่อเจอโจทย์นี้ เช่น วาดไอคอนขึ้นมาสองอันซ้อนทับกัน กำหนดขนาดของชั้นบนแล้วซ่อนส่วนเกินด้วย `overflow: hidden` แต่คิดไปคิดมา gradient ก็น่าจะทำได้นี่หว่า ก็เลยลองไปตามนั้น

 สำหรับ Environment นั้นเราชอบ React กับ styled-components มากๆ แต่เนื่องจากไม่เคยใช้ CodePen มาก่อน เลยเสียเวลางมว่ามัน import ยังไงไปสักพักใหญ่ๆ แต่พอเริ่มคุ้นแล้วก็เพลินเลย จบบล็อกนี้ไปเท่านี้เลยดีกว่า ปิดท้ายกันด้วย Pen โลด

<iframe height="406" style="width: 100%;" scrolling="no" title="Font icon percentage bg" src="https://codepen.io/bluenex/embed/preview/oNvOZJY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/bluenex/pen/oNvOZJY">
  Font icon percentage bg</a> by Tulakan Ruangrong (<a href="https://codepen.io/bluenex">@bluenex</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

ปล. ยังมีเรื่องของ Performance ซึ่งเราก็ไม่รู้ว่าแบบไหนทำได้ดีกว่ากัน ลองค้นคร่าวๆ ก็ไม่เจออะไรเป็นพิเศษ ถ้ามีอะไรเพิ่มเติมไว้ค่อยมาอัพเดททีหลังละกัน 😬
