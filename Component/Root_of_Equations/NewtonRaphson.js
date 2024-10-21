import React,{useState,useEffect} from 'react'
import Nav_Bar from '../Nav_Bar'
import axios from 'axios';
import { Table } from 'antd';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function NewtonRaphson() {

  const topic = "Newton Raphson Method";
  const [equation, setEquation] = useState();
  const [x0, setX0] = useState();
  const [ans,setans] = useState([]);
  const [btnstate,setbtnstate] = useState(false);
  const[datax0,setDatax0] = useState([]);
  const[datax1,setDatax1] = useState([]);
  const[dataerror,seterror] = useState([]);

  const fetchdata = async () => axios.get('http://localhost:2000/newtonraphson')
  .then(res => {
        console.log(res.data);
        setEquation(res.data[0].equation)
        setX0(res.data[0].x0)
        console.log(res.data[0].equation)
    }
    )
    .catch(err => {
        console.log(err);
    })

    useEffect(() => {
        fetchdata();
    },[])


    const columns = [
        { title: 'Iteration', dataIndex: 'iteration', key: 'iteration' },
        { title: 'X0', dataIndex: 'x0', key: 'x0' },
        { title: 'X1', dataIndex: 'x1', key: 'x1' },
        { title: 'Error', dataIndex: 'Error', key: 'Error' },
    ];

    const newtonRaphson = () => {
        axios.post('http://localhost:5000/api/NewtonRaphsonAPI',{
        x0:parseFloat(x0),
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
        
        console.log(data_x0);
        console.log(data_x1);
        console.log(data_error);
        setbtnstate(false);
    }

  return (
    <div>
        <div><Nav_Bar/></div>
        <h1>{topic}</h1>
        <div className="container">
            <label className='form-label'>Equation</label>
            <input type="text" className="form-control" value={equation} onChange={e => setEquation(e.target.value)}></input>
            <label className='form-label'>X0</label>
            <input type="text" className="form-control" value={x0} onChange={e => setX0(e.target.value)}></input>
            <button className="btn btn-primary" onClick={newtonRaphson}>Submit</button>
        </div>
        <div className='container'>
            <Table columns={columns} dataSource={ans} rowKey="iteration"/>
        </div>
        <div className='container'><Line data={data} /></div>
    </div>
  )
}
