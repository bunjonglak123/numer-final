import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Table } from 'antd';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
export default function Bisection(){
    //สร้างตัวแปร
    const [equation, setEquation] = useState("");
    const [xl, setXl] = useState();
    const [xr, setXr] = useState();
    const [ans, setans] = useState([]);
    const [btnstate, setbtnstate] = useState(false);
    const [dataxm,setDataxm] = useState([]);
    const [dataerror,seterror] = useState([]);
    const [iteration,setiteration] = useState([]);
   //สร้างcolumnเก็บdataแบบตาราง
    const columns = [
        { title: 'Iteration', dataIndex: 'iteration', key: 'iteration' },
        { title: 'xl', dataIndex: 'xl', key: 'xl' },
        { title: 'xr', dataIndex: 'xr', key: 'xr' },
        { title: 'xm', dataIndex: 'xm', key: 'xm' },
        { title: 'Error', dataIndex: 'Error', key: 'Error' },
    ];//รับค่าdataไปเก็บไว้ในตัวแปร
    const fetchdata = async() => axios.get('http://localhost:2000/bisection',{
            headers: { "authorization": localStorage.getItem("token") } 
        })
        //setตัวแปร
        .then(res => {
            console.log(res.data);
            setEquation(res.data.equation)
            setXl(res.data.xl)
            setXr(res.data.xr)
            console.log(res.data.equation)
        }
        )
        //จับerror
        .catch(err => {
            console.log(err);
        })
        //เมื่อกดpathนี้จะแจ้งเตือน
        useEffect(() => {
            if(localStorage.token == undefined){
                alert("Please Login")
                //ยังไม่ได้sendคนเข้าไปในหน้าlogin
            }
            else{
            fetchdata();
        }
        },[])
        //remove token = logout
        function  logout(){
            localStorage.removeItem("token")
            window.location.reload();
        }
        //graph
    const label = ['XM','Error']
    const data = {
        labels: iteration,
        datasets: [
            {
                label: label[0],
                data: dataxm,
                fill: false,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: label[1],
                data: dataerror,
                fill: false,
                backgroundColor: "rgba(255,99,132,1)",
                borderColor: "rgba(255,99,132,1)"
            }
        ]
    };
    //ดำเนินส่งค่าไปคำนวณ
    const bisection = () => {
        
        axios.post('http://localhost:5000/api/BisectionAPI',{
        xl:parseFloat(xl),
        xr:parseFloat(xr),
        equation:equation,
    })
    //จากนั้นส่งค่ากลับเมื่อกดปุ่ม
    .then(res => {
        setans(res.data.Temp_Ans)
        setbtnstate(true);
        console.log(ans);
        
    })
    .catch(err => {
        console.log(err);
    })
}
//ถ้ากดปุ่มแล้วจะได้อะไรบ้าง
if(btnstate === true){
    let data_error = [];
    let data_xm = [];  
    let iteration = []
    //ลูปเก็บคำตอบลงdata  เพื่อให้graphเอาไปใช้
    for(let i=0;i<ans.length;i++){
        data_error.push(ans[i].Error);
        data_xm.push(ans[i].xm);
        iteration.push(i+1);
    }
     seterror(data_error)
    setDataxm(data_xm) 
    setiteration(iteration)     
    //console.log(data_error);
    //console.log(data_xm);
    setbtnstate(false);
}
return (
    <div>
        
        <div className="container">
            <button className="btn btn-primary" onClick={logout}>Logout</button>
            <h1>Bisection</h1>
                <div className='container'>
                <label className='form-label'>Equation</label>
                <input type="text" className="form-control" data-testid="equation" value={equation} onChange={e => setEquation(e.target.value)}></input>
                <label className='form-label'>xl</label>
                <input type="text" className="form-control" data-testid="XL" value={xl} onChange={e => setXl(e.target.value)}></input>
                <label className='form-label'>xr</label>
                <input type="text" className="form-control" data-testid="XR" value={xr} onChange={e => setXr(e.target.value)}></input>
                <button className="btn btn-primary" onClick={bisection} id="submit" >Submit</button>
                </div>
        </div>
    <div className='container'>
        <Table columns={columns} dataSource={ans} rowKey="iteration"/>
    </div>
        <div className='container'><Line data={data} /></div>
    </div>
  )
}