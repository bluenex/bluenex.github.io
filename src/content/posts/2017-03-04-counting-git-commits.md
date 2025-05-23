---
title: นับคอมมิทใน Git Repo กันดีกว่า
date: 04-03-2017 01:17
tags: [git]
---

เป็นธรรมดาที่เมื่อถึงจุดๆ นึงก็จะอยากรู้ว่าเราทำอะไรไปบ้างแล้ว มากขนาดไหนกัน โดยเฉพาะเมื่อใช้ git ที่บันทึกทุกอย่างตั้งแต่เริ่มสร้าง repo ยิ่งน่าสนใจ คำตอบของคำถามที่เป็นชื่อของโพสต์นี้ก็ไม่ยากเลย กูเกิลสิครับ ปะ ขอแบ่งเป็นนับแยกกับนับรวมละกัน

### นับแยก author

อันนี้จะใช้ `shortlog` ซึ่งก็เป็นคำสั่งของ git นี่แหละ ถ้ารัน `git shortlog` เฉยๆ ก็เหมือนปริ้นท์หน้าคอมมิทบน Github หรือ Bitbucket มาดูนั่นแหละ เพราะฉะนั้นมันจึงมี option ให้ใช้ ถ้าจะนับคอมมิททั้งหมดแยกตาม author โดยเรียงจากมากไปน้อยก็

```sh
git shortlog -s -n | cat
```

โดย `-s` คือเอามาแต่ author กับจำนวน ไม่เอาข้อความ ส่วน `-n` ก็เรียงโดยจำนวนคอมมิทแทนที่จะเรียงตามอักษรแทน สุดท้าย `| cat` ก็คือให้แสดงผลในบรรทัดต่อไปแทนที่จะเข้าไปใน read-only text file เอ้อ เกือบลืม อันนี้คือจะนับเฉพาะใน master branch เท่านั้นนะ ถ้ามีคอมมิทใน branch อื่นและยังไม่ได้ merge ก็จะไม่นับ ถ้าอยากนับทั้งหมดรวมพวกนั้นด้วยก็นี่เลย

```sh
git shortlog -s -n --all | cat
```

### นับรวมทั้งหมด

ส่วนอันนี้ต้องเล่นท่าหน่อย ดูคำสั่งก่อนเลย

```sh
git shortlog -s | grep -Eo "[0-9]{1,}" | awk '{ SUM += $1} END { print SUM }'
```

มาดูกันมันคืออะไรบ้าง

- `grep` เป็นคำสั่งที่ไว้ใช้ทำเกี่ยวกับ Regular Expression โดยชื่อเต็มก็คือ Global Regular Expression Print (พึ่งจะเคยเปิดหานี่แหละ) ส่วน option ของมันก็ต้องขอบอกว่าไม่เข้าใจเหมือนกันว่า `-E` ใช้ทำอะไร แต่ `-o` นี่ใช้เพื่อให้มันแสดงเฉพาะ output ที่แมตช์กันแทนที่จะแสดงทั้งบรรทัดเหมือนปกติ สุดท้ายคือ `[0-9]{1,}` เป็นการบอก `grep` ว่าให้หาแต่ตัวเลขนะ (`[0-9]`) และถ้าเป็นตัวเลขติดๆ กันก็เอามาทั้งก้อนเลย (`{1,}`) ประมาณนั้น

- `awk` เป็นคำสั่งที่ไว้หา text ที่แมตช์เหมือนกัน และเมื่อเจอแล้วก็จะรันคำสั่งตามที่ได้เขียนไว้ ซึ่งในกรณีนี้คือ `'{ SUM += $1} END { print SUM }'` สรุปง่ายๆ มันจะเอา text ทั้งหมดมาบวกกันทีละบรรทัดไปเรื่อยๆ จนถึงบรรทัดสุดท้าย จากนั้นค่อยปริ้นท์ผลลัพธ์ออกมา

ที่นี้ก็รู้คำสั่งกันแล้ว ลองไปรันดูดีกว่า ของเราได้ออกมาแบบนี้

```sh
ThesisProject [master] git shortlog -s -n --all | cat
   149  bluenex
    27  Bluenex
    10  tulakann
     1  Tulakan Ruangrong

ThesisProject [master] git shortlog -s --all | grep -Eo "[0-9]{1,4}" | awk '{ SUM += $1} END { print SUM }'
187
```

นับ thesis repo กันเลยทีเดียว ฮ่าาา นี่ขนาดเก็บผลเสร็จแล้วอะไรแล้วแต่ repo ก็ยัง active อยู่ อันนี้น่าจะยกความดีความชอบให้ git ได้เต็มๆ เลยแหละ เพราะโค้ดมันเป็น singleton มีที่เดียว ไม่ว่าจะทำงานจากเครื่องไหนก็เก็บโค้ดที่อัพเดทแล้วไว้ที่นี่มันก็เลยยังเติบโตมาได้เรื่อยๆ เจอบั๊กก็มาตามแก้ ใส่ issue อะไรก็ช่วยได้มาก สรุปคือถ้าต้องทำงานอะไรก็ตามที่เกี่ยวกับการเขียนโค้ดก็ใช้เหอะ เนาะ

### ref.

- [Adding numbers from the result of a grep](http://unix.stackexchange.com/questions/4840/adding-numbers-from-the-result-of-a-grep)
- [How Do I fetch only the numbers in grep?](http://askubuntu.com/questions/184204/how-do-i-fetch-only-the-numbers-in-grep)
- [Showing Git Commit Counts](http://zanshin.net/2012/06/08/showing-git-commit-counts/)

