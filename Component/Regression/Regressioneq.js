import React, { useState } from "react";
import { Line } from "react-chartjs-2";

export default function Regressioneq() {

  const [equation,setEquation] = useState("");
  const [inputData, setInputData] = useState([]);
  const [results, setResults] = useState(Array(0).fill(null));
  const [n, setN] = useState(0);

  const x1Mean =
    inputData.reduce((acc, val) => acc + val.x1, 0) / inputData.length;
  const fxMean =
    inputData.reduce((acc, val) => acc + val.fx, 0) / inputData.length;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < inputData.length; i++) {
    numerator += (inputData[i].x1 - x1Mean) * (inputData[i].fx - fxMean);
    denominator += (inputData[i].x1 - x1Mean) ** 2;
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
  const handleEquationChange = (e) => {
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
  };

  return (
    <div>
        <label>Enter the value of equation:</label>
        <input type="text" className="form-control" data-testid="equation" value={equation} onChange={handleEquationChange}></input>
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
      >
        Calculate
      </button>
      {/* ??*/}
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
