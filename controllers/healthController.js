const myhealth = require('../models/health')
const User = require('../models/User')

const health_title = async (req, res)=> {
    try {
        const health = await myhealth.find();
        const username = req.session.username; // ดึง username จาก session
        let user = null;
    
        if (username) {
          user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        }
    
        res.render('health', { health, user }); // ส่งตัวแปร user ไปด้วย
      } catch (error) {
        console.error('Error loading :', error);
        res.status(500).send('Error loading');
      }
}

//ส่งข้อมููลตัวอย่าง ใน Health Care Information
const health_creat = (req, res) => {
    const sampleData = [
        {
            Health_Title: "5 วิธีออกกำลังกายในบ้าน แม้พื้นที่น้อยก็ทำได้!",
            Sub_Title: "หากต้องการออกกำลังกายสามารถทำที่บ้านได้สะบายๆ",
            Health_Detial: `
        <p>ในช่วงที่โลกกำลังเผชิญกับภาวะโรคระบาดแบบนี้ ทำให้หลายคนเลือกที่จะอยู่บ้านเป็นหลัก 
        และออกไปข้างนอกเท่าที่จำเป็น เพื่อลดความเสี่ยงในการแพร่เชื้อ ซึ่งพอใช้ชีวิตอยู่แต่ในบ้านนานเข้า 
        รู้ตัวอีกทีน้ำหนักก็ขึ้น แถมร่างกายก็ไม่ฟิตเหมือนเดิมซะแล้ว</p>
        <p>แต่ความจำเป็นที่ต้องอยู่บ้านนั้นไม่ใช่ข้ออ้างของการไม่ได้ออกกำลังกาย เพราะจริงๆ 
        แล้วยังมีรูปแบบการออกกำลังกายหลากหลายประเภทที่สามารถทำได้ในบ้าน ใช้พื้นที่น้อย 
        และไม่จำเป็นต้องจ่ายเงินเพื่อซื้ออุปกรณ์ที่มีราคาสูงเลย</p>
        <p>มี 5 วิธีออกกำลังกายในบ้านมาแนะนำ และเมื่ออ่านบทความนี้จบแล้ว 
        เราหวังว่าคุณจะไม่มีข้ออ้างในการนั่งจมอยู่บนโซฟาทั้งวันอีกต่อไป 
        เพราะเมื่อโควิด-19 หมดไปจากโลกแล้ว เราทุกคนจะแข็งแรงไปด้วยกัน!</p><br>

        <strong>กระโดดเชือก</strong><br>
        <p>ถือเป็นวิธีออกกำลังกายที่ง่าย และยังสามารถเผาผลาญแคลอรีได้มากอย่างไม่น่าเชื่อ 
        เพราะการกระโดดเชือกเป็นการออกกำลังกายแบบแอโรบิกที่ทำให้หัวใจเต้นเร็วขึ้น และ
        ทำการส่งเลือดไปเลี้ยงยังส่วนต่างๆ ของร่างกายได้อย่างมีประสิทธิภาพ</p>
        <p>ทั้งนี้ ยังมีข้อควรคำนึงอยู่เล็กน้อย คือหากต้องการผลลัพธ์ที่ดีที่สุดก็ควรกระโดดเชือกอย่าง
        ต่อเนื่องไม่ต่ำกว่า 20 นาที และถ้าอยากเพิ่มการเผาผลาญให้มากขึ้นอีกหน่อย การเลือกเชื
        อกที่เส้นใหญ่และค่อนข้างมีน้ำหนัก ก็จะทำให้เราใช้แรงมากขึ้น ซึ่งจะช่วยเผาผลาญแคลอรีไ
        ด้มากขึ้นเช่นเดียวกัน</p><br>

        <strong>วิ่งขึ้น-ลงบันได</strong><br>
        <p>เชื่อว่าทุกๆ บ้านน่าจะมีบันไดอยู่แล้วเป็นปกติ หรือถ้าใครอยู่คอนโดก็สามารถพลิกแพลงไปใช้
        บันไดหนีไฟก็ได้ และถ้าใครที่ยังต้องเข้าออฟฟิศก็ยิ่งเหมาะเลย เพราะแทนที่คุณจะขึ้นลงลิฟต์
        ไปมา วิธีนี้ที่จะทำให้คุณได้ออกกำลังกายในทุกๆ วัน อย่างน้อยก็ตอนเช้าและตอนเย็น</p>
        
        <p>รู้หรือไม่ว่าการออกกำลังกายด้วยวิธีนี้สามารถเผาผลาญพลังงานได้มากกว่าที่คิด เพราะถ้าเที
        ยบกับการวิ่งบนพื้นราบธรรมดาแล้ว การวิ่งขึ้น-ลงบันไดนั้นมีความชันกว่า ทำให้มีการใช้กล้ามเ
        นื้อในส่วนอื่นๆ เพิ่มขึ้น โดยเฉพาะกล้ามเนื้อขาและน่อง</p>

        <p>แต่ข้อควรระวังก็คือการออกกำลังกายแบบนี้ไม่เหมาะกับคนที่มีน้ำหนักตัวมาก เพราะอาจจะทำให้
        หัวเข่าเกิดการบาดเจ็บได้ และเพราะการวิ่งขึ้น-ลงบันไดเป็นรูปแบบการวิ่งที่ค่อนข้างเข้มข้นและใช้
        กำลังมาก สำหรับคนที่ไม่ได้ฟิตร่างกายอย่างสม่ำเสมอจึงไม่เหมาะที่จะทำทุกวัน แนะนำว่าประมาณ
         2 ครั้งต่อสัปดาห์ก็เพียงพอแล้ว</p><br>

        <strong>เล่นโยคะ</strong><br>
        <p>วิธีนี้เหมาะกับคนที่ไม่ชอบการออกแรงหักโหมจนเกินไป เพราะโยคะจะเป็นการออกกำลังกายที่ช่วย
        เสริมสร้างความยืดหยุ่นให้กับกล้ามเนื้อ ทำให้ร่างกาย กระดูกสันหลัง และข้อต่อต่างๆ ได้ยืดเหยียด สามารถ
        ช่วยลดอาการปวดเมื่อยจากออฟฟิศซินโดรมได้ ทั้งยังช่วยให้ระบบไหลเวียนโลหิตทำงานได้ดีขึ้นอีกด้วย</p>
        <p>สำหรับคนที่ไม่เคยเล่นโยคะมาก่อนและคิดว่าเป็นกิจกรรมที่เข้าถึงยาก บอกเลยว่าคุณอาจคิดผิด เพราะแค่มีเสื่อ
        โยคะ 1 ผืนก็เริ่มต้นได้แล้ว และสมัยนี้เราไม่จำเป็นต้องไปเข้าคอร์สตามสถาบันให้ยุ่งยาก ไม่ว่าคุณจะเป็นเพียง Be
        ginner หรือ Expert ก็ตาม เพียงแค่เสิร์ชหาในยูทูบก็มีแชนแนลหลากหลายให้เลือกเล่นตามได้ทุกระดับ แถม
        ยังใช้พื้นที่ไม่มากอีกด้วย</p><br>

        <strong>ฮูลาฮูป</strong><br>
        <p>เจ้าห่วงกลมๆ ที่เป็นไอเท็มยอดนิยมของสาวๆ ในการออกกำลังกายที่บ้าน เพราะ
        เป็นอุปกรณ์ที่เน้นบริหารกล้ามเนื้อด้านข้างช่วงเอว ช่วยเพิ่มความกระชับและแข็ง
        แรงของกล้ามเนื้อบริเวณหน้าท้อง กล้ามเนื้อสะโพก มีส่วนช่วยให้เอวและก้นมีความ
        กระชับมากขึ้นเมื่อเล่นเป็นประจำ</p>
        <p>ฮูลาฮูปนับว่าเป็นหนึ่งในการออกกำลังกายที่สามารถที่เผาผลาญพลังงานได้ดีทีเดียว คือ
        ประมาณ 150-200 กิโลแคลอรีต่อการเล่นอย่างต่อเนื่อง 30 นาที ทั้งยังช่วยเพิ่มสมรรถ
        นะทางด้านแอโรบิกจากการไหลเวียนเลือดที่เพิ่มมากขึ้น ทำให้อัตราการเต้นของหัวใจเพิ่ม
        สูงขึ้น และยังช่วยทำให้ทักษะการทรงตัวดีขึ้นด้วย</p><br>

        <strong>แพลงกิ้ง</strong><br>
        <p>หนึ่งในรูปแบบการออกกำลังกายที่ใช้เวลาไม่มาก แต่สามารถช่วยเสริมสร้างกล้ามเนื้อได้ดี เหมาะ
        มากสำหรับคนที่อยากฟิตหุ่น มีกล้ามหน้าท้องสวยๆ  เพราะการทำแพลงกิ้งช่วยให้สัดส่วนมีความ
        กระชับ และทำให้ร่างกายของเราสมดุลมากยิ่งขึ้น</p>
        <p>การทำแพลงกิ้งที่ถูกต้องเริ่มจากการนอนคว่ำ แล้วใช้ข้อศอกยันพื้นในระดับความกว้างเสมอไหล่ ยก
        ตัวขึ้นบนปลายเท้าให้ขนานกับพื้นมากที่สุด ทำค้างไว้ 20 วินาที แล้วพัก 10 วินาที ทำซ้ำทั้งหมด 3 เซท</p>
        <p>การทำแพลงกิ้งจะเป็นการเกร็งกล้ามเนื้อช่วงหน้าท้องและแผ่นหลัง ซึ่งจะทำให้กล้ามเนื้อหน้าท้องและกล้ามเนื้อด้านข้าง
        ของกระดูกสันหลังมีความแข็งแรง จึงลดความเสี่ยงที่จะเกิดอาการบาดเจ็บในบริเวณดังกล่าวได้ อีก
        ทั้งการทำแพลงกิ้งที่ถูกต้องยังช่วยลดอาการปวดหลังที่เกิดจากการนั่งนานๆ ได้อีกด้วย</p><br>
    `
        },
        {
            Health_Title: "อาหารหลัก 5 หมู่มีอะไรบ้าง ที่ควรทานในแต่ละวัน",
            Sub_Title: "เรามาดูกันว่าในแต่ละวันเราควรกินอะไรบ้าง",
            Health_Detial: `<p>การรับประทานอาหารหลักให้ครบ 5 หมู่ในแต่ละวัน ที่ประกอบด้วยโปร
            ตีน คาร์โบไฮเดรต เกลือแร่ และแร่ธาตุต่าง ๆ วิตามิน และไขมัน ซึ่งมีความจำเป็นต่อร่างกาย ดังนั้น
            การเลือกรับประทานอาหารที่มีสารอาหารหลากหลาย และครบถ้วนทั้ง 5 หมู่ในสัดส่วนที่เหมาะสม จึงเป็น
            อีกปัจจัยสำคัญที่ทำให้มีสุขภาพที่ดี ซึ่งบางคนอาจจะยังไม่รู้ว่าอาหารหลัก 5 หมู่นั้น แต่ละหมู่มีอาหารประ
            เภทไหนบ้าง ในวันนี้เราจะพาไปทำความรู้จักกับอาหารหลัก 5 หมู่ มากขึ้นกันค่ะ</p><br> 

            <strong>อาหารหลักหมู่ที่ 1 โปรตีน ( เนื้อสัตว์ ไข่ นม ถั่ว )</strong><br>
            <p>โดยแหล่งอาหารที่ให้โปรตีน เช่น เนื้อหมู เนื้อไก่ เนื้อปลา นม ไข่ ถั่วเมล็ดแห้ง ถั่ว
            เหลือง ถั่วเขียว ถั่วแระ ถั่วดำ ถั่วลิสง ผลิตผลที่ได้จากถั่ว เช่น เต้าหู้ นมถั่วเหลือง ซึ่งโปร
            ตีนมีความจำเป็นต่อการทำงานของร่างกาย เพื่อให้ร่างกายมีความเจริญเติบโต รวมไปถึงช่วย
            สร้างกล้ามเนื้อ ฟื้นฟูกล้ามเนื้อ และซ่อมแซมเนื้อเยื่อส่วนที่สึกหรอได้</p>
            <p>โปรตีนที่เหมาะสมต่อวัน สำหรับคนทั่วไปควรได้รับโปรตีน 1 กรัม ต่อน้ำหนัก
            ตัว 1 กิโลกรัม และคนออกกำลังกาย ควรได้รับโปรตีน 2-3 กรัม ต่อน้ำหนัก
            ตัว 1 กิโลกรัม</p><br>
            
            <strong>อาหารหลักหมู่ที่ 2 คาร์โบไฮเดรต ( ข้าว แป้ง น้ำตาล เผือก มัน )</strong><br>
            <p>โดยแหล่งอาหารที่ให้คาร์โบไฮเดรต ได้แก่ อาหารประเภทแป้ง และธัญพืชทั้งหลาย เช่น ข้าว ขนม
            ปัง เส้นก๋วยเตี๋ยว มัน เผือก เป็นกลุ่มอาหารหลักที่ให้พลังงาน รวมทั้งอาจมีแคลเซียม และวิตามินบี หาก
            เป็นธัญพืชที่ผ่านการขัดสีน้อย เช่น ข้าวกล้อง ข้าวโอ๊ต ข้าวบาร์เลย์ ก็จะยิ่งอุดมด้วยสารอาหาร และเส้นใย
            อาหารที่ช่วยส่งเสริมระบบการย่อยอาหารให้มีสุขภาพดี ซึ่งคาร์โบไฮเดรตจะให้พลังงาน และความร้อน ช่วย
            ให้ร่างกายนำไปใช้ประโยชน์มากที่สุด ส่วนที่เหลือใช้จะเปลี่ยนเป็นไขมันสะสมในร่างกายได้</p>
            <p>คาร์โบไฮเดรตที่เหมาะสมต่อวัน สำหรับคนทั่วไป ควรได้รับคาร์โบไฮเดรต 3 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม 
            และคนออกกำลังกาย ควรได้รับโปรตีน 2-3 กรัม ต่อน้ำหนักตัว 1 กิโลกรัม</p><br>
            
            <strong>อาหารหลักหมู่ที่ 3 เกลือแร่ และแร่ธาตุต่าง ๆ ( พืชผัก )</strong><br>
            <p>โดยแหล่งอาหารที่ให้เกลือแร่ และแร่ธาตุต่าง ๆ มากจาก ฟักทอง มันเทศสีเหลือง ถั่วฝักยาว ผักบุ้ง ตำ
            ลึง แครอท คะน้า แตงกวา บวบ ฟักเขียว ผักกาดขาว ซึ่งเกลือแร่ และแร่ธาตุต่าง ๆ จากพืชผักเหล่านี้ เป็น
            สารอาหารที่ร่างกายต้องการ และขาดไม่ได้ เพราะเป็นส่วนประกอบของอวัยวะ และกล้ามเนื้อ เช่น กระดูก ฟัน 
            เลือด ทั้งนี้ยังช่วยเสริมสร้างภูมิคุ้มกันให้แข็งแรง ช่วยซ่อมแซมเซลล์ที่เสียหาย ป้องกันการบาดเจ็บของร่างกาย 
            ช่วยปกป้องกระดูกแตกหัก และช่วยป้องกันฟันผุได้</p>
            <p>เกลือแร่ และแร่ธาตุต่าง ๆ ที่เหมาะสมต่อวัน สำหรับผู้ใหญ่ที่แนะนำต่อวัน คือ ระหว่าง 920–2,300 มิลลิกรัม</p><br>
            
            <strong>อาหารหลักหมู่ที่ 4 วิตามิน ( ผลไม้ )</strong><br>
            <p>โดยแหล่งอาหารที่ให้วิตามินมาจากผลไม้ชนิดต่าง ๆ เช่น กล้วย ส้ม มะละกอ แอปเปิล 
            ลำไย มังคุด ผลไม้ตระกูลเบอร์รี่ และอื่น ๆ ทั้งนี้วิตามินสามารถแบ่งเป็น 2 จำพวก ได้แก่ 
            วิตามินที่ละลายในน้ำ และวิตามินที่ละลายในไขมัน ซึ่งประโยชน์ของวิตามินบำรุงสุขภาพเหงือก 
            และฟัน สุขภาพปาก ผิวหนังให้สดชื่น ช่วยให้ระบบการย่อย และการขับถ่ายเป็นปกติ</p>
            <p>วิตามินที่เหมาะสมต่อวัน สำหรับผู้ใหญ่ที่แนะนำต่อวัน คือ ระหว่าง 60 มิลลิกรัม และสำหรับหญิง
            ตั้งครรภ์ให้นมบุตรต้องการวิตามินประมาณ 70–96 มิลลิกรัม</p><br>
            
            <strong>อาหารหลักหมู่ที่ 5 ไขมัน ( ไขมันจากพืชและสัตว์ )</strong><br>
            <p>โดยแหล่งอาหารที่ให้ไขมัน จะแบ่งเป็นไขมันอิ่มตัวที่ส่วนใหญ่จะได้จากสัตว์ เช่น น้ำมันหมู น้ำมันไก่ น้ำมันจากวัว ครีม เนย ชีส 
            และไขมันไม่อิ่มตัวจากพืชบางชนิด เช่น น้ำมันปาล์ม น้ำมันมะพร้าว น้ำมันมะกอก น้ำมันงา น้ำมันถั่วเหลือง น้ำมันเมล็ดดอกทานตะ
            วัน น้ำมันรำข้าว น้ำมันเมล็ดดอกคำฝอย น้ำมันถั่วลิสง ซึ่งประโยชน์ของไขมันช่วยในการดูดซึมของวิตามินที่ละลายในไขมัน ให้ความ
            อบอุ่นแก่ร่างกาย นอกจากนี้ยังช่วยในการป้องกันการกระทบ กระเทือนของอวัยวะภายใน</p>
            <p>ไขมันที่เหมาะสมต่อวัน สำหรับผู้ใหญ่ที่แนะนำต่อวันประมาณ 70 กรัม ซึ่งการทานไขมัน ไม่ควรรับ
            ประทานมากหรือบ่อยจนเกินไป เพราะไขมันเป็นสาเหตุสำคัญของโรคอ้วน โรคหัวใจ และหลอดเลือดได้</p><br>
            
            <p>การทานอาหารหลักให้ครบ 5 หมู่เป็นประจำทุกวัน ที่อุดมไปด้วยโปรตีน คาร์โบไฮเดรต เกลือแร่ และแร่ธาตุต่าง ๆ วิตา
            มิน และไขมัน เพื่อให้ร่างกายที่สมบูรณ์แข็งแรง และได้สารอาหารที่ครบถ้วน แต่นอกจากการทานอาหารให้ครบ 5 หมู่แล้ว 
            การออกกำลังกายอย่างสม่ำเสมอ ดื่มน้ำมาก ๆ และพักผ่อนให้เพียงพอ ก็เป็นสิ่งที่จะช่วยให้คุณมีสุขภาพ และร่างกายที่แข็ง
            แรงอีกด้วย</p>`
        },
        {
            Health_Title: "สุขภาพดีง่ายๆ เริ่มจากการนอน",
            Sub_Title: "การตื่นเช้าเป็นกำไรของชีวิต",
            Health_Detial: ` <p><strong>“การตื่นเช้าเป็นกำไรของชีวิต”</strong>  หลาย ๆ คนคงเคยได้ยินประโยคนี้ 
            เพราะการเข้านอนเร็วและตื่นเช้ามีข้อดีต่าง ๆ มากมาย เนื่องจากเวลาที่เรานอนหลับนั้น สมองของเราจะหลั่งสาร 
            “Growth Hormone” ซึ่งในเด็ก สารนี้จะช่วยในเรื่องของการเจริญเติบโตและความสูง ส่วนในผู้ใหญ่ 
            สารนี้จะช่วยในเรื่องของการซ่อมแซมร่างกาย เผาผลาญไขมัน เสริมสร้างกล้ามเนื้อ ผิวพรรณเปล่งปลั่งและสมาน
            แผลอย่างมีประสิทธิภาพ</p>
            <p>Growth Hormone หรือ สารเคมีแห่งความเป็นหนุ่มสาว จะถูกหลั่งออกมามากที่สุดในช่วงเวลา 4 ทุ่ม – ตี 2 เราจึงเรียกช่วงเวลานี้ว่า “นาทีทองของการนอนหลับ” 
            หากได้นอนหลับอย่างมีคุณภาพในช่วงเวลาดังกล่าวจะทำให้สมองสามารถผลิตสาร Growth Hormone ได้อย่างเต็มที่</p><br>
            
            <strong>รู้หรือไม่ว่าการนอนหลับ ช่วยชะลอวัยได้?</strong><br>
            <p>ขณะที่เราหลับ นอกจากสมองจะผลิต Growth Hormone ออกมาแล้ว ยังมีการผลิตสารเมลาโทนิน (Melatonin) 
            ที่นอกจากจะช่วยให้เราหลับสนิทแล้ว สารนี้ยังมีบทบาทสำคัญในการป้องกันเซลล์ผิวหนังจากสารอนุมูลอิสระ ซึ่งสารเมลา
            โทนินนี้ถูกสร้างมากที่สุดในเวลากลางคืนขณะหลับสนิทและห้องมืดสนิท</p>
            <p>ขณะเดียวกัน หากเรานอนดึก ตื่นสาย สารเซโรโตนิน (Serotonin) หรือสารที่ทำให้เรามีความสุขสดชื่นตลอดทั้งวันก็จะลดลงตาม
            ไปด้วย ทำให้เกิดอาการเบื่อหน่าย อ่อนเพลียและเป็นโรคซึมเศร้าได้ และหากนอนไม่ครบ 8 ชม. ร่างกายจะผลิตฮอร์โมนเลป
            ติน (Leptin) น้อยลง ซึ่งสารตัวนี้มีบทบาทในการควบคุมความอยากอาหาร ดังนั้นหากอดนอนจะทำให้ความอยากอาหารเพิ่มขึ้น 
            ทำให้เราอ้วนได้ อีกทั้งยังทำให้ภูมิคุ้มกันต่าง ๆ ลดลง ระบบความทรงจำก็จะมีประสิทธิภาพลดลงด้วย เพราะ Hippocampus ส่วน
            ประกอบสำคัญของสมองที่ทำหน้าที่ถ่ายโอนข้อมูลการเรียนรู้ระหว่างวันเข้าสู่ความทรงจำระยะยาว ซึ่ง Hippocampus จะทำงานได้ดี
            ที่สุดตอนที่เราหลับเท่านั้น</p>
            <p>ในช่วงเวลาที่เรานอนหลับ ภายในร่างกายของเราจะเปรียบเหมือนมีคนแคระมากมาย (Autonomic nervous system) ช่วย
            กันทำงานที่ซับซ้อน อย่างเช่นการควบคุมหัวใจ ความดันโลหิตให้อยู่ในระดับบที่นิ่งไม่แกว่งขึ้นลงง่ายเหมือนตอนเราตื่น หรือพูด
            ง่ายๆ ว่าการนอนหลับสามารถช่วยควบคุมความดันโลหิตได้ด้วยนั่นเอง
            <p>นอกจากนี้เมื่อหลับสนิท ตับ ไต ลำไส้ ก็จะทำงานได้ดีขึ้น สังเกตได้ว่าหากคนอดนอนอาจจะมีปัญหาท้องผูก 
            หน้าตาหม่นหมอง ไม่สดชื่น ที่สำคัญสุขภาพไม่ดี นั่นเพราะส่วนหนึ่งมาจากพิษของการนอนดึกด้วย ฉะนั้นหากนอน
            พักผ่อนอย่างเพียงพอก็เปรียบเสมือนการได้ล้างพิษไปในตัวด้วย</p><br>
            
            <p>สรุปได้ว่า การนอนเข้านอนเร็วก่อนสี่ทุ่มและตื่นเช้า จะช่วยทำให้นาฬิกาชีวิตของเราเดินอย่างสมดุล 
            ไม่เร็วจนเกินไป หรือช่วยชะลอวัยได้นั่นเอง เพราะช่วงเวลาของการนอนหลับเปรียบเสมือนช่วงเวลาที่ได้รับ
            รางวัลจากธรรมชาติ หากใครสามารถเข้านอนได้ตามเวลา หลับสนิทเต็มอิ่ม ผลที่ได้ก็คือสุขภาพที่ดีจนรู้สึกได้
            นั่นเอง รู้อย่างนี้แล้วเรามาเข้านอนก่อนสี่ทุ่มกันดีกว่านะคะ</p>`
        },
        {
            Health_Title: "ข้อดีของการหายใจเข้าออกลึกๆ",
            Sub_Title: "กายหายใจมีอะไรมากกว่าที่คุณคิด",
            Health_Detial: `<p>การหายใจเข้าออกลึก ๆ หรือบางครั้งเรียกว่า การหายใจโดยใช้กะบังลม คือการหายใจเข้าลึก ๆ อย่างช้า ๆ 
            ให้อากาศผ่านเข้าทางจมูกจนเต็มปอด และทำให้กะบังลมยกสูงขึ้น การหายใจเข้าออกลึก ๆ บางครั้งอาจทำให้รู้สึกไม่เป็นธรรมชาติ 
            โดยทั่วไป เรามักจะใช้กล้ามเนื้อท้องในการหายใจ ซึ่งเรียกว่าเป็นการหายใจตื้น การหายใจตื้นจะจำกัดการเคลื่อนที่ของกะบังลม 
            ทำให้มีออกซิเจนเข้าสู่ร่างกายน้อยลง ทำให้เราหายใจถี่ขึ้้น และมีความรู้สึกกังวลเกิดขึ้นได้ งานวิจัยพบว่าการหายใจเข้าออกลึก ๆ 
            ส่งผลดีต่อสุขภาพกายและใจหลายด้านเลยทีเดียว</p>

            <strong>คลายความเครียด</strong><br>
            <p>สมองคนเราจะปล่อยฮอร์โมนคอร์ติซอล เมื่อรู้สึกเครียดและกังวล เมื่อเราฝึกหายใจเข้าออกลึก ๆ 
            หัวใจจะเต้นช้าลง และออกซิเจนจะเข้าสู่กระแสเลือด พร้อมกับสื่อสารไปที่สมองให้ผ่อนคลาย
            การศึกษาในมหาวิทยาลัยพบว่า นักศึกษาที่ได้เข้าคอร์สฝึกการหายใจเข้าออกลึก ๆ จะรู้สึกซึมเศร้าน้อยลง 
            กังวลน้อยลง และดื่มแอลกอฮอล์น้อยลง เมื่อเปรียบเทียบกับเพื่อนกลุ่มอื่น
            การหายใจเข้าออกลึก ๆ ยังช่วยกระตุ้นการหลั่งฮอร์โมนเอนดอร์ฟิน ซึ่งสามารถลดความรู้สึกเจ็บปวดได้ 
            แม้การถอนหายใจง่าย ๆ เพียงครั้งเดียวยังช่วยลดความตึงเครียดทางร่างกาย และปรับอารมณ์ให้ดีขึ้นได้</p>

            <strong>ปรับการทำงานของสมองให้ดีขึ้น</strong><br>
            <p>การศึกษาชิ้นหนึ่งได้ขอให้ผู้เข้าร่วมงานวิจัยหายใจเข้าลึก ๆ เป็นเวลา 5 วินาที และหายใจออกยาว ๆ 
            เป็นเวลา 5 วินาที รวมทั้งหมด 10 นาทีต่อวัน สัปดาห์ละ 6 ครั้ง เป็นเวลานาน 6 สัปดาห์
            ผลพบว่าผู้เข้าร่วมการศึกษานี้สามารถใช้สมองคิดได้เร็วขึ้น และทำคะแนนได้ดีขึ้น ในการทดสอบคิดเลขเร็ว
            การเล่นโยคะและเทคนิคการหายใจบางอย่างก็พิสูจน์แล้วว่าสามารถเพิ่มความสามารถของสมองในการจดจ่อ
            และทำงานอย่างตั้งใจ</p>

            <strong>ช่วยบรรเทาโรคเรื้อรังต่าง ๆ</strong><br>
            <p>การหายใจเข้าออกลึก ๆ ช่วยลดความดันโลหิตได้ด้วยการทำให้กล้ามเนื้อผ่อนคลาย เพิ่มการหมุนเวียนเลือด และควบคุมการเต้นของหัวใจให้เป็นปกติ
            งานวิจัยชิ้นหนึ่งพบว่าเทคนิคการหายใจแบบสลับข้างจมูก (ซ้ายและขวา) เป็นเวลา 10 นาทีสามารถช่วยลดความดันโลหิตในผู้ป่วยโรคความดันโลหิตสูง
            การหายใจเข้าออกลึก ๆ ยังช่วยบรรเทาโรคเบาหวานได้ด้วย
            ผู้ป่วยโรคเบาหวานที่ฝึกการหายใจเข้าออกลึก ๆ เป็นเวลา 3 เดือน มีค่า BMI ลดลงและยังมีค่าน้ำตาลในกระแสเลือดหลังรับประทานอาหารที่ลดต่ำลงอีกด้วย
            เทคนิคการหายใจอย่างผ่อนคลายสามารถทำให้การนอนหลับของผู้ป่วยโรคซึมเศร้ามีคุณภาพมากขึ้น และยังช่วยลดอาการของการอักเสบหรือติดเชื้อได้อีกด้วย</p>
            `
        }
    ];

    myhealth.insertMany(sampleData)
        .then((result) => {
            console.log("ตัวอย่างข้อมูลถูกเพิ่มเรียบร้อยแล้ว");
            res.redirect('/health'); // เปลี่ยนเป็นเส้นทางที่เหมาะสมตามที่คุณต้องการ
        })
        .catch((err) => {
            console.log(err);
        });
}

// const health_creat_input = async(req, res) => {
//     const { Health_Title, Sub_Title, Health_Detial } = req.body;

//     const newHealth ={
//         Health_Title,
//         Sub_Title,
//         Health_Detial
//     };

//     myhealth.insertMany(newHealth)
//     .then((result) => {
//         console.log(Health_Detial)
//         console.log("ตัวอย่างข้อมูลถูกเพิ่มเรียบร้อยแล้ว");
//         res.redirect('/health'); // เปลี่ยนเป็นเส้นทางที่เหมาะสมตามที่คุณต้องการ
//     })
//     .catch((err) => {
//         console.log(err);
//     });
    
// };

const health_creat_input = async (req, res) => {
    const { Health_Title, Sub_Title, Health_Detial } = req.body;

    console.log('ข้อมูลที่ได้รับ:', { Health_Title, Sub_Title, Health_Detial }); // ตรวจสอบว่ามี HTML หรือไม่

    const newHealthArticle = new myhealth({
        Health_Title, 
        Sub_Title,
        Health_Detial // ให้แน่ใจว่า Health_Detial มีค่า HTML
    });

    try {
        await newHealthArticle.save();
        res.redirect('/health');;
    } catch (error) {
        console.error('Error saving article:', error);
        res.status(500).send('เกิดข้อผิดพลาดในการบันทึกบทความ');
    }
};

const resetHealthData = (req, res) => {
    myhealth.deleteMany({})
        .then(result => {
            console.log("ลบข้อมูลทั้งหมดในคอลเล็กชันสำเร็จ");
            res.redirect('/health'); // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการหลังจากลบสำเร็จ
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error resetting data');
        });
};

const health_detail = (req, res)=> {
     const articleId = req.params.id;
    
    myhealth.findById(articleId)
        .then(result => {
            res.render('healthDetail', { title: result.Health_Title, article: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving article');
        });
};

const getHealthDetail = (req, res) => {
    const articleId = req.params.id;
    
    myhealth.findById(articleId)
        .then(result => {
            res.render('healthDetail', { title: result.Health_Title, article: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving article');
        });
};

const deleteHealthDetail = (req, res) => {
    const articleId = req.params.id; // รับค่า id ของบทความจาก URL

    myhealth.findByIdAndDelete(articleId)
        .then(result => {
            if (result) {
                res.redirect('/health'); // หลังจากลบสำเร็จ ให้รีไดเร็กไปยังหน้ารายการบทความ
            } else {
                res.status(404).send('Article not found'); // หากไม่เจอบทความ
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error deleting article'); // ข้อผิดพลาดในการลบ
        });
};


module.exports = {
    health_title,
    health_creat,
    getHealthDetail,
    resetHealthData,
    health_creat_input,
    deleteHealthDetail
}