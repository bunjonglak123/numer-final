import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Table } from "antd";
import axios from "axios";

export default function Regressionxy() {
    const columns = [
        { title: 'x1', dataIndex: 'x1', key: 'x1' },
        { title: 'fx', dataIndex: 'fx', key: 'fx' },
        { title: 'a0', dataIndex: 'a0', key: 'a0' },
        { title: 'a1', dataIndex: 'a1', key: 'a1' },
        { title: 'Result', dataIndex: 'value', key: 'value' },
    ];
  const [inputData, setInputData] = useState([]);
  const [x1, setX1] = useState([]);
  const [fx, setFx] = useState([]);
  const [btnstate, setbtnstate] = useState(false);
  const [n, setN] = useState(0);
  const [ans,setAns] = useState([]);
  const [datax1,setDatax1] = useState([]);
  const [datafx,setDatafx] = useState([]);
  const [dataa0,setDataa0] = useState([]);
  const [dataa1,setDataa1] = useState([]);
  const [iteration,setIteration] = useState([]);
  const [dataResult,setDataResult] = useState([]);


  const handleNChange = (e) => {
    const newN = parseInt(e.target.value, 10);
    setN(newN);
    setInputData(Array.from({ length: newN }, () => ({ x1: x1, fx: fx })));
  };
  
  const data = {
    labels: datafx,
    datasets: [
      {
        label: "result",
        data: dataResult,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "fx",
        data: fx,
        backgroundColor: "rgba(255,0,0,1)",
        borderColor: "rgba(255,0,0,1)",
        fill: false,
      },
    ],
  };
  const regressionxyapi = () => {
        
    axios.post('http://localhost:5000/api/RegressionxyAPI',{

    x1:x1,
    fx:fx,
    n:parseInt(n),
})
//จากนั้นส่งค่ากลับเมื่อกดปุ่ม
.then(res => {
    setAns(res.data.Temp_Ans)
    setbtnstate(true);
})
.catch(err => {
    console.log(err);
})
if(btnstate === true){ 
    let data_x1 = [];
    let data_fx = [];
    let data_a0 = [];
    let data_a1 = [];
    let data_Result = [];


    //ลูปเก็บคำตอบลงdata  เพื่อให้graphเอาไปใช้
    for(let i=0;i<ans.length;i++){
        data_Result.push(ans[i].value);
        data_x1.push(ans[i].x1);
        data_fx.push(ans[i].fx);
        data_a0.push(ans[i].a0);
        data_a1.push(ans[i].a1);

    }
     setDatax1(data_x1)
     setDatafx(data_fx)
     setDataa0(data_a0)
     setDataa1(data_a1)
     setDataResult(data_Result)
     console.log(data_Result)

    setbtnstate(false);
}
}


const dataforregression = () => {
        
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
        onClick={dataforregression}
        style={{ margin: "5px 20px 20px 20px" }}
      >
        setValue
      </button>
      <button
        onClick={regressionxyapi}
        style={{ margin: "5px 20px 20px 20px" }}
      >
        Calculate
      </button>
      <div className='container'>
        <Table columns={columns} dataSource={ans} rowKey="result"/>
    </div>
      <div>
        <Line data={data} />
      </div>
    </div>
  );
}
