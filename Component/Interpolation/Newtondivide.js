import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { Table } from 'antd';

export default function Newtondivide() {
    const [inputX,setInputX] = useState([0,20000,40000,60000, 80000]);
    const [inputY,setInputY] = useState([9.81,9.7487,9.6879,9.6879 ,9.5682]);
    const [c,setC] = useState(42000);
    const [ans,setans] = useState();
const columns = [
    { title: 'result', dataIndex: 'result', key: 'result' },
];
const newtondivide = () => {
    axios.post('http://localhost:5000/api/NewtondivideAPI',{
        inputX:inputX,
        inputY:inputY,
        c:c,
})
.then(res => {
    setans(res.data.Temp_Ans)
    console.log(ans);
    
})
.catch(err => {
    console.log(err);
})
}
return( <div>
    <h1>Newton Divide Calculator</h1>
    <div>
      <label>Enter x </label>
      <input type="text" value={inputX} onChange={e => setInputX(e.target.value)} />
    </div>
    <div>
      <label>Enter y </label>
      <input type="text" value={inputY} onChange={e => setInputY(e.target.value)} />
    </div>
    <div>
      <label>Enter c </label>
      <input type="number" value={c} onChange={e => setC(e.target.value)} />
    </div>
    <button onClick={newtondivide}>Calculate</button>
    <div>
      <Table columns={columns}dataSource={ans}/>
    </div>
  </div>
  );
}