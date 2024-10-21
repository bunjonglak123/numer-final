//ดึงexpress
const express = require("express");
//เรียกใช้และเก็บในตัวแปร
const router = express.Router();
const math = require("mathjs");
//คำสั่งให้ส่งออกโดยมีการขอข้อมูลreq และแสดงค่าres
router.post("/api/BisectionAPI",(req,res)=>{
    let eq = math.compile(req.body.equation);
    let xl = parseFloat(req.body.xl);
    let xr = parseFloat(req.body.xr);
    let xm = 0;
    let n = 0;
    let check;
    let Temp_Ans = [];

const findxm = (xl, xr) => {
    return (parseFloat(xl) + parseFloat(xr)) / 2;
  };
  do {
    xm = findxm(xl, xr);
    n++;

    Temp_Ans.push({
      iteration: n,
      xl: xl,
      xm: xm,
      xr: xr,
      Error: check,
    });

    if (eq.evaluate({x:xm}) > 0) {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xr = xm;
    } else {
      check = Math.abs((xm - xl) / xm).toFixed(8);
      xl = xm;
    }
  } while (check > 0.000001 && n < 100);
  //ส่งคำตอบกลับ
  res.json({
    Temp_Ans: Temp_Ans,
  });
});
module.exports = router;