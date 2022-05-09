---
title: มาลองเขียนแอปแอนดรอยด์เชื่อมต่อกับบลูทูธบน Arduino กัน
date: 20-03-2017 13:17
tags: [android, arduino]
---

บล็อกสั้นวันนี้ขอเสนอการเขียนแอปแอนดรอยด์แบบง่ายๆ ด้วย Xamarin แต่จะว่าเขียนก็ไม่ถูกนะ เพราะก็อปเค้ามาแก้นิดเดียว แฮร่ แต่เนื่องจากโค้ดต้นฉบับเป็น open source ใต้ License Apache 2.0 แถมเราไม่ได้ทำเพื่อใช้แสวงหากำไรอีก ถือว่าเพื่อการศึกษาเนาะ

เริ่มกันเลย อุปกรณ์ที่เราใช้คือ Arduino Uno + HC-05 + Android 6.0 smart phone โดย HC-05 เป็น bluetooth module ที่เชื่อมต่อกับ Arduino Uno เนื่องจากบล็อกนี้จะบันทึกส่วนของแอปแอนดรอยด์เท่านั้น เพราะฉะนั้น รายละเอียดการต่อบอร์ดบลูทูธเข้ากับ Arduino เอย Arduino sketch เอย ให้ไปตามดูใน [Instructables](http://www.instructables.com/id/Arduino-AND-Bluetooth-HC-05-Connecting-easily/?ALLSTEPS) ดังลิงค์ที่แปะไว้ให้นี้เนาะ

สมมติว่าต่อบอร์ดเสร็จ อัดโค้ดใส่ Arduino เสร็จ จับคู่ HC-05 กับมือถือของเราเสร็จ ขั้นตอนต่อไปเราก็จะมาเริ่มในส่วนของโค้ด Android กัน ในส่วนนี้เราจะใช้ Visual Studio + Xamarin ในการเขียน ซึ่งเราก็จะเขียนแอปง่ายๆ มีสองปุ่มคือเปิดกับปิด เพื่อเปิดและปิด LED ที่มีอยู่บนบอร์ด Arduino อยู่แล้ว อ้อลืมไป ไม่ใช่เขียนแต่เป็นดัดแปลง ถ้ามี Visual Studio แล้วก็ไปโคลน repo นี้มาเลย [xamarin/monodroid-samples](git@github.com:xamarin/monodroid-samples.git) แล้วเข้าไปในโฟลเดอร์จะเห็น Bluetooth Chat ก็เข้าไปอีกครั้ง ที่นี้ก็จะมาเริ่มแก้กัน เริ่มจากเปลี่ยน Layout จาก `ListView` เป็น `LinearView` เสร็จแล้วก็ใส่ Header text ไปตามสะดวก เช่น **LED SWITCH** ก็ได้ จากนั้นก็ลากปุ่มมาสองปุ่ม ตั้งชื่อเป็นปุ่ม ON กับ OFF ใส่ string กับ id ให้เรียบร้อย จากนั้นก็ไปแก้โค้ดกัน

## BluetoothChat.cs

ก่อนอื่นเพิ่ม `const` กันก่อนก่อนเข้า method `OnCreate()` ให้ใส่ led status เข้าไป

```cs
// LED status
private const string LED_ON = "1";
private const string LED_OFF = "0";
```

ใน method `SetupChat()` ให้คอมเม้นต์ให้หมดเหลือไว้แค่ `chatService` กับ `outStringBuffer` จากนั้นก็หาน้องปุ่มด้วย `id` แล้วใส่ event click handler ไปตามนี้

```cs
// Initialize the array adapter for the conversation thread
//conversationArrayAdapter = new ArrayAdapter<string>(this, Resource.Layout.message);
//conversationView = FindViewById<ListView>(Resource.Id.@in);
//conversationView.Adapter = conversationArrayAdapter;

// Initialize the compose field with a listener for the return key
//outEditText = FindViewById<EditText>(Resource.Id.edit_text_out);
// The action listener for the EditText widget, to listen for the return key
//outEditText.EditorAction += delegate (object sender, TextView.EditorActionEventArgs e) {
//    // If the action is a key-up event on the return key, send the message
//    if (e.ActionId == ImeAction.ImeNull && e.Event.Action == KeyEventActions.Up)
//    {
//        var message = new Java.Lang.String(((TextView)sender).Text);
//        SendMessage(message);
//    }
//};

//// Initialize the send button with a listener that for click events
//sendButton = FindViewById<Button>(Resource.Id.button_send);
//sendButton.Click += delegate (object sender, EventArgs e) {
//    // Send a message using content of the edit text widget
//    var view = FindViewById<TextView>(Resource.Id.edit_text_out);
//    var message = new Java.Lang.String(view.Text);
//    SendMessage(message);
//};

// On button
onButton = FindViewById<Button>(Resource.Id.onButton);
onButton.Click += delegate (object sender, EventArgs e)
{
    SendMessage(new Java.Lang.String(LED_ON));
};

// Off button
offButton = FindViewById<Button>(Resource.Id.offButton);
offButton.Click += delegate (object sender, EventArgs e)
{
    SendMessage(new Java.Lang.String(LED_OFF));
};

// Initialize the BluetoothChatService to perform bluetooth connections
chatService = new BluetoothService(this, new MyHandler(this));

// Initialize the buffer for outgoing messages
outStringBuffer = new StringBuffer("");
```

## BluetoothService.cs

ไฟล์นี้แก้นิดเดียว โดยให้เปลี่ยน UUID ของที่เค้าให้มาเป็น UUID สำหรับอุปกรณ์ serial bluetooth ทั่วไป โค้ดข้างล่างคือคอมเม้นต์อันเก่าแล้วใส่อันใหม่ลงไป ส่วนที่มาของ UUID นี้ไปดูได้ที่ [Android documentation](https://developer.android.com/reference/android/bluetooth/BluetoothDevice.html#createInsecureRfcommSocketToServiceRecord(java.util.UUID))

 ```cs
//private static UUID MY_UUID = UUID.FromString ("fa87c0d0-afac-11de-8a39-0800200c9a66");
private static UUID MY_UUID = UUID.FromString("00001101-0000-1000-8000-00805F9B34FB");
 ```

 เสร็จละ จากนั้นก็เสียบมือถือ debug ดู จะพบ error ขึ้นมาจำนวนหนึ่งเกิดจากการที่ตัวแปรบางตัวขาดๆ เกินๆ ก็ตาม debug ลบๆ คอมเม้นต์ๆ กันเอาตามสัญชาตญาณ

 อนึ่ง บล็อกนี้ออกแนวจดไว้ดูเองจึงไม่เขียนละเอียด ใครผ่านมาอ่านทำตามไม่ได้ก็ต้องขออภัยมา ณ ที่นี้ด้วย หากมีข้อสงสัยเพิ่มเติมติดต่อได้ตามที่อยู่แถบล่างของบล็อกได้เลยฮะ