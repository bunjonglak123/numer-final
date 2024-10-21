//ดึงexpress
const express = require("express");
//เรียกใช้และเก็บในตัวแปร
const router = express.Router();

//คำสั่งให้ส่งออกโดยมีการขอข้อมูลreq และแสดงค่าres
router.post("/api/dataforRegression",(req,res)=>{
    let n = parseInt(req.body.n);
    let Temp_Data =[];
    let x1 = [10,15,20,30,40,50,60,70,80];
    let fx = [5,9,15,18,22,30,35,38,43];

    for(let i =0 ; i<n ;i++){
    Temp_Data.push({
      x1: x1[i],
      fx: fx[i],
    });
}

  //ส่งคำตอบกลับ
  res.json({
    Temp_Data: Temp_Data,
  });
});
module.exports = router;