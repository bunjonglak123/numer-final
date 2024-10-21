const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.post('/api/CramerRuleAPI', (req, res) => {
    var matrixA = req.body.matrixA;
    var MatrixB = [].concat(...req.body.matrixB);

    var Temp_Answer = [];
    var detA = math.det(matrixA);
    for (var i = 0; i < matrixA.length; i++) {
        var temp = math.clone(matrixA);
            for(var j=0;j<matrixA.length;j++){
                temp[j][i] = MatrixB[j];
            }
            var detAi = math.det(temp);
            var result = detAi/detA
            Temp_Answer.push({
                x:i,
                value:result
            });
        };
    

    res.json({
        Temp_Answer: Temp_Answer,
    });
});

module.exports = router;