//ดึงexpress
const express = require("express");
//เรียกใช้และเก็บในตัวแปร
const router = express.Router();
const math = require("mathjs");
//คำสั่งให้ส่งออกโดยมีการขอข้อมูลreq และแสดงค่าres
router.post("/api/RegressioneqAPI",(req,res)=>{

  //ส่งคำตอบกลับ
  res.json({
    Temp_Ans: Temp_Ans,
  });
});
module.exports = router;