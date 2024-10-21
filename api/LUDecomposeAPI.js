const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.post('/api/LUDecomposeAPI', (req, res) => {
    var matrixA = req.body.matrixA;
    var MatrixB = [].concat(...req.body.matrixB);

    var Temp_Answer = [];
    var Decompose = math.lusolve(matrixA, MatrixB);
    for (var i = 0; i < Decompose.length; i++) {
        Temp_Answer.push({
            x: i,
            value: Decompose[i][0]
        });
    }

    res.json({
        Temp_Answer: Temp_Answer,
    });
});

module.exports = router;