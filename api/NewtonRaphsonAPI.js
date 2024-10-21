const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.post('/api/NewtonRaphsonAPI', (req, res) => {
    var equations = math.compile(req.body.equation);
    var x0 = parseFloat(req.body.x0);
    var x1 = 0;
    var n = 0;
    var check;
    var Temp_Ans = [];
    
    do{
        x1 = x0 - (equations.evaluate({x:x0}) / math.derivative(req.body.equation,'x').evaluate({x:x0}));
        n++;
        check = Math.abs((x1 - x0) / x1).toFixed(7);
        Temp_Ans.push({
            iteration: n,
            x0: x0,
            x1: x1,
            Error: check,
        });
        x0 = x1;
    }while(check > 0.000001 && n < 100);
    res.json({
        Temp_Ans: Temp_Ans,
    });
});

module.exports = router;