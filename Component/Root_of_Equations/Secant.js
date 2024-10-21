import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Table } from 'antd';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



export default function Secant() {

    const topic = "Secant Method"
    const [equation, setEquation] = useState("x ^ 3 - 2 * x - 5");
    const [x0, setX0] = useState(1);
    const [x1, setX1] = useState(2);
    const [ans,setans] = useState([]);
    const[datax0,setDatax0] = useState([]);
    const[datax1,setDatax1] = useState([]);
    const[datax2,setDatax2] = useState([]);
    const[dataerror,seterror] = useState([]);
    const [btnstate,setbtnstate] = useState(false);

    const columns = [
        { title: 'Iteration', dataIndex: 'iteration', key: 'iteration' },
        { title: 'X0', dataIndex: 'x0', key: 'x0' },
        { title: 'X1', dataIndex: 'x1', key: 'x1' },
        { title: 'X2', dataIndex: 'x2', key: 'x2' },
        { title: 'Error', dataIndex: 'Error', key: 'Error' },
    ];
     //graph
     const label = ['X0','X1','Error']
     const data = {
         labels: datax0,
         datasets: [
             {
                 label: label[0],
                 data: datax0,
                 fill: false,
                 backgroundColor: "rgba(75,192,192,1)",
                 borderColor: "rgba(75,192,192,1)"
             },
             {
                 label: label[1],
                 data: datax1,
                 fill: false,
                 backgroundColor: "rgba(255,99,132,1)",
                 borderColor: "rgba(255,99,132,1)"
             },
             {
                 label: label[2],
                 data: dataerror,
                 fill: false,
                 backgroundColor: "rgba(255,199,132,1)",
                 borderColor: "rgba(255,199,132,1)"
             }
            
         ]
     };
 
     if(btnstate === true){
         let data_error = [];
         for(let i=0;i<ans.length;i++){
             data_error.push(ans[i].Error);
         }
 
          seterror(data_error)   
 
         let data_x0 = [];    
         for(let i=0;i<ans.length;i++){
             data_x0.push(ans[i].x0);
             }
             setDatax0(data_x0)    
 
         let data_x1 = [];    
         for(let i=0;i<ans.length;i++){
             data_x1.push(ans[i].x1);
             }
             setDatax1(data_x1)
        let data_x2 = []; 
        for (let i=0;i < ans.length;i++){
            data_x2.push(ans[i].x2);
        }
        setDatax2(data_x2)
         
         //console.log(data_x0);
         //console.log(data_x1);
         //console.log(data_x2);
         //console.log(data_error);

         setbtnstate(false);
     }

    const secant = () => {
        axios.post('http://localhost:5000/api/SecantAPI',{
        x0:parseFloat(x0),
        x1:parseFloat(x1),
        equation:equation,    
    })
    .then(res => {
        setans(res.data.Temp_Ans)
        console.log(ans);
        setbtnstate(true);
    })
    .catch(err => {
        console.log(err);
    })
    }

    
  return (
    <div>
        <div className='container'>
            <h1>{topic}</h1>
            <label className='form-label'>Equation</label>
            <input type="text" className="form-control" value={equation} onChange={e => setEquation(e.target.value)}></input>
            <label className='form-label'>X0</label>
            <input type="text" className="form-control" value={x0} onChange={e => setX0(e.target.value)}></input>
            <label className='form-label'>X1</label>
            <input type="text" className="form-control" value={x1} onChange={e => setX1(e.target.value)}></input>
            <button className="btn btn-primary" onClick={secant}>Submit</button>
        </div>
        <div className='container'>
            <Table columns={columns} dataSource={ans} rowKey="iteration"/>
        </div>
        <div className='container'><Line data={data} /></div>
    </div>
  )
}
