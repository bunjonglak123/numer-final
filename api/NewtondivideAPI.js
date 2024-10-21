const express = require("express");
//เรียกใช้และเก็บในตัวแปร
const router = express.Router();
const math = require("mathjs");
//คำสั่งให้ส่งออกโดยมีการขอข้อมูลreq และแสดงค่าres
router.post("/API/NewtondivideAPI",(req,res)=>{
    let xInput = (req.body.inputX);
    let yInput = (req.body.inputY);
    let cValue = parseFloat(req.body.c);
    let Temp_Ans = [];
      const calculateDivDiff = (divDiff, i=0, j=0) => {
        if (j === 0) {
          divDiff[i][j] = yInput[i];
        } else {
          calculateDivDiff(divDiff, i + 1, j - 1);
          calculateDivDiff(divDiff, i, j - 1);
          divDiff[i][j] =
            (divDiff[i + 1][j - 1] - divDiff[i][j - 1]) / (xInput[i + j] - xInput[i]);
        }
      };
        let n = xInput.length;
        let divDiff = new Array(n);
        for (let i = 0; i < n; i++) {
          divDiff[i] = new Array(n - i);
        }
        calculateDivDiff(divDiff, 0, n - 1);
    
        let result = divDiff[0][0];
        let product = 1;
        for (let i = 1; i < n; i++) {
          product *= cValue - xInput[i - 1];
          result += divDiff[0][i] * product;
        }
        Temp_Answer.push({
          x: i,
          value: result
      });
    res.json({
        Temp_Ans: Temp_Ans,
      });
});
module.exports = router;