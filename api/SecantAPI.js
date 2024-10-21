const express = require('express');
const router = express.Router();
const math = require('mathjs');
router.post('/api/SecantAPI', (req, res) => {
    var equation = math.compile(req.body.equation);
    var x0 = parseFloat(req.body.x0);
    var x1 = parseFloat(req.body.x1);
    var x2 = 0;
    var n = 0;
    var check;
    var Temp_Ans = [];
    do {
        x2 = x1 - (equation.evaluate({x: x1}) * (x1 - x0)) / (equation.evaluate({x: x1}) - equation.evaluate({x: x0}));
        n++;
        check = math.abs((x2 - x1) / x2).toFixed(7);
        Temp_Ans.push({
            iteration:n,
            x0:x0,
            x1:x1,
            x2:x2,
            Error:check,
        });
        x0 = x1;
        x1 = x2;
    } while (check > 0.000001 && n < 100);
    res.json({
        Temp_Ans: Temp_Ans,
    });
});

module.exports = router;