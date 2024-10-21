//ดึงexpress
const express = require("express");
//เรียกใช้และเก็บในตัวแปร
const router = express.Router();

//คำสั่งให้ส่งออกโดยมีการขอข้อมูลreq และแสดงค่าres
router.post("/api/RegressionxyAPI",(req,res)=>{
    let x1 = req.body.x1;
    console.log(x1)
    let fx = req.body.fx;
    console.log(fx)
    let n = parseInt(req.body.n);

    let xMean = 0;
    let yMean = 0;
    for(let i=0;i<n;i++){
        xMean += x1[i];
        yMean += fx[i];
    }
    const x1Mean = xMean/ n;
    const fxMean = yMean / n;
    let numerator = 0;
    let denominator = 0;
  
    for (let i = 0; i < n; i++) {
      numerator += (x1[i] - x1Mean) * (fx[i] - fxMean);
      denominator += (x1[i] - x1Mean) ** 2;
    }
  
    const a1 = numerator / denominator;
    const a0 = fxMean - a1 * x1Mean;
    let Temp_Ans = [];
   for(let j = 0 ; j<n;j++){

    let value=a0+a1*x1[j];
    Temp_Ans.push({
        x1: x1,
        fx: fx,
        a0: a0,
        a1: a1,
        value: value
      });
   }
    
  //ส่งคำตอบกลับ
  res.json({
    Temp_Ans: Temp_Ans,
  });
});
module.exports = router;