import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default function Regressionxy() {
  const [inputData, setInputData] = useState([]);
  const [results, setResults] = useState(Array(0).fill(null));
  const [n, setN] = useState(0);
  const [btnstate, setbtnstate] = useState(false);
  const [x1, setX1] = useState([]);
  const [fx, setFx] = useState([]);
 let xmean;
 let fxmean
  for(let i=0 ;i<n;i++){
    xmean+= x1[i];
    fxmean += fx[i];
  }
  const x1Mean = xmean/ n;
  const fxMean = fxmean / n;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (x1[i] - x1Mean) * (fx[i] - fxMean);
    denominator += (x1[i] - x1Mean) ** 2;
  }

  const a1 = numerator / denominator;
  const a0 = fxMean - a1 * x1Mean;

  function calculateFx(x1Value) {
    return a0 + a1 * x1Value;
  }

  const calculateResults = () => {
    const newResults = inputData.map(({ x1 }) => calculateFx(x1));
    setResults(newResults);
  };

  const handleNChange = (e) => {
    const newN = parseInt(e.target.value, 10);
    setN(newN);
    setInputData(Array.from({ length: newN }, () => ({ x1: 0, fx: 0 })));
    setResults(Array(newN).fill(null));
  };

  const data = {
    labels: inputData.map(({ x1 }) => x1),
    datasets: [
      {
        label: "result",
        data: inputData.map(({ x1 }) => a0 + a1 * x1),
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "fx",
        data: inputData.map(({ fx }) => fx),
        backgroundColor: "rgba(255,0,0,1)",
        borderColor: "rgba(255,0,0,1)",
        fill: false,
      },
    ],
  };const dataforregression = () => {
        
    axios.post('http://localhost:5000/api/dataforRegression',{
    n:parseInt(n),
})
//จากนั้นส่งค่ากลับเมื่อกดปุ่ม
.then(res => {
    const newData = res.data.Temp_Data;
    setInputData(newData);
    setbtnstate(true);
})
.catch(err => {
    console.log(err);
})

  if(btnstate === true){
    let x1 = [];
    let fx = [];  
    //ลูปเก็บคำตอบลงdata  เพื่อให้graphเอาไปใช้
    for(let i=0;i<n;i++){
        x1.push(inputData[i].x1);
        fx.push(inputData[i].fx);

    }
     setX1(x1)
     console.log(x1)
    setFx(fx) 
    console.log(fx)

    setbtnstate(false);
}
}


  return (
    <div>
      <label>Enter the value of n:</label>
      <input
        type="text"
        value={n}
        onChange={handleNChange}
        style={{ marginBottom: "20px" }}
      />
      {inputData.map((data, index) => (
        <div key={index} style={{ marginLeft: "10px" }}>
          <label>x1:</label>
          <input
            type="text"
            value={data.x1}
            onChange={(e) => {
              const newX1Value = parseFloat(e.target.value);
              setInputData((prevData) =>
                prevData.map((item, i) =>
                  i === index ? { ...item, x1: newX1Value } : item
                )
              );
            }}
          />
          <label>fx:</label>
          <input
            type="text"
            value={data.fx}
            onChange={(e) => {
              const newFxValue = parseFloat(e.target.value);
              setInputData((prevData) =>
                prevData.map((item, i) =>
                  i === index ? { ...item, fx: newFxValue } : item
                )
              );
            }}
          />
        </div>
      ))}
      <button
        onClick={calculateResults}
        style={{ margin: "5px 20px 20px 20px" }}
      >
        Calculate
      </button>
      <button
        onClick={dataforregression}
        style={{ margin: "5px 20px 20px 20px" }}
      >
        setValue
      </button>
      {results.every((result) => result !== null) && (
        <div style={{ margin: "5px 20px 20px 20px" }}>
          {results.map((result, index) => (
            <h5 key={index}>
              ค่า f({inputData[index].x1}) คือ {result}
            </h5>
          ))}
        </div>
      )}

      <div>
        <Line data={data} />
      </div>
    </div>
  );
}
