const express = require('express');
const router = express.Router();
const math = require('mathjs');
router.post("/api/OnePointAPI", (req, res) => {
    var equation = math.compile(req.body.equation);
    var x0 = parseFloat(req.body.x0);
    var x1 = 0;
    var n = 0;
    var check = parseFloat(0.0);
    var temp_Ans = [];
    do {
        x1 = equation.evaluate({x: x0});
        n++;
        temp_Ans.push({
            iteration: n,
            x0: x0,
            x1: x1,
            Error: check
        });
        check = math.abs((x1 - x0) / x1).toFixed(6);
        x0 = x1;
    } while (check > 0.000001 && n < 10000);
    res.json({temp_Ans: temp_Ans});
});


module.exports = router;