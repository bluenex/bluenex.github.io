---
title: ทำความรู้จักกับตัวช่วยสร้าง embed link แบบ responsive
date: 18-03-2016 19:15
tags: [web]
---

สืบเนื่องมาจากบล็อกที่แล้ว พอลองกลับไปอ่านในมือถือก็พบว่าวิดิโอจาก YouTube ที่ลงไว้มันไม่ responsive ซะงั้น ว่าจะนั่งแก้เองลองไปเรื่อยๆ ก็ขี้เกียจ ก็เลยลองหาดูเผื่อจะเจอ snippet ง่ายๆ จาก StackOverflow ไปๆ มาๆ ก็ไปเจอโปรเจ็ค [embedresponsively.com](http://embedresponsively.com) นี้เข้าก็น่าสนใจดีเพราะมันง่ายเหลือเกิน จะเอามาใส่ css ของตัวเองก็ง่าย ก็เลยอยากจะบันทึกไว้ในบล็อกนี้ซะหน่อย ตัวโปรเจ็คนี้[มีอยู่บน Github ด้วย](https://github.com/jeffehobbs/embedresponsively/)เผื่อใครสนใจ

การทำงานของแอปนี้คือช่วยแปลง embed link ที่เราได้รับมาจากบริการต่างๆ ให้กลายเป็น responsive แล้วก็ให้ลิงค์เรากลับมาอีกที พอเราเอาไปแปะในเว็บของเรามันก็จะ responsive สวยงามตามดังที่หวังไว้ วิธีการก็ตรงไปตรงมา คือเอาลิงค์ที่เราได้มาไปใส่ css snippet เพิ่มเติมเพื่อให้แสดงผลแบบ responsive แล้วก็ให้เราเอาไปแปะทั้งก้อนแบบนั้นแหละ ลองมาดูตัวอย่างกันสักวิดิโอนึง

```
https://www.youtube.com/watch?v=feVeUWCu15E
```

พอเอาไปใส่ในแอป เราก็จะได้โค้ด HTML กลับมาเป็นแบบนี้

```html
<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/feVeUWCu15E' frameborder='0' allowfullscreen></iframe></div>
```
และถ้าเอาทั้งก้อนไปแปะบนเว็บของเราก็จะได้วิดิโอแบบข้างล่างนี้ ลองเช็คดูทั้งในมือถือและคอมก็จะเห็นว่าแสดงผลได้ responsive น่าชื่นใจ

<div class='embed-container'>
  <iframe src='https://www.youtube.com/embed/feVeUWCu15E' frameborder='0' allowfullscreen></iframe>
</div>

จริงๆ แล้วมันก็คือการแปะ css ที่อยู่ในแท็ก `<style>` มาด้วยนั่นเอง เราจึงสามารถแกะออกมาแล้วก็เอาไปใส่ไฟล์ css ของเราได้อย่างง่ายๆ แต่ถ้าให้ลองแก้เองล่ะก็คงใช้เวลาประมาณนึงเลยมั้ง กราบขอบพระคุณ [@jeffehobbs](https://github.com/jeffehobbs) ผู้พัฒนาเว็บแอปนี้มา ณ ที่นี้ ว่าแล้วก็ลองเอาโค้ด css มาเรียงซะหน่อย

```css
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.embed-container iframe, .embed-container object, .embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

ครั้งต่อๆ ไปก็แค่เอา embed link จาก YouTube มา เอา `width` กับ `height` ออกจาก `<iframe>` แล้วก็จับใส่เข้าไปใน `<div class="embed-container"></div>` เป็นอันเสร็จ นอกเหนือไปจาก YouTube แล้ว แน่นอนว่าก็มีอีกหลายบริการที่โปรเจ็คนี้ช่วยได้ เช่น *Vimeo, Dailymotion, Google Maps, Instagram, Vine* เป็นต้น ถ้าสนใจก็ไปลองเล่นกันดูโลดฮะ
