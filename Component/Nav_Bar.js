import { AppstoreOutlined,FunctionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const items = [
    {
        label: 'Home',
        key: '/',
        
    },
    {
      label: 'Root of Equations',
      icon: <FunctionOutlined />,
          children: [
            {
              label: 'Bisection',
              key: '/Bisection',
            },
            {
              label: 'False Position',
              key: '/FalsePosition',
            },
            {
                label: 'One-Point Iteration',
                key: '/OnePoint',
            },
            {
                label: 'Newton Raphson',
                key: '/NewtonRaphson',
            },
            {
                label: 'Secant Method',
                key: '/SecantMethod',
            },    
          ],
       
    },
    {
        label: 'Linear Algebraic Equations',
        icon: <AppstoreOutlined />,
        children: [
            {
                label: 'Cramer Rule',
                key: '/CramerRule',
            },
            {
                label: 'Gauss Elimination',
                key: '/GaussElimination',
            },
            {
                label: 'Gauss Jordan',
                key: '/GaussJordan',
            },
            {
                label: 'LU Decomposition',
                key: '/LUDecomposition',
            },
            {
                label: 'Cholesky Decomposition',
                key: '/CholeskyDecomposition',
            },
            {
                label: 'Jacobi Iteration',
                key: '/Jacobi',
            },
            {
                label: 'Gauss Seidel',
                key: '/GaussSeidel',
            },
        ],

    },{
        label: 'Regression',
        icon: <AppstoreOutlined />,
        children: [
            {
                label: 'Linear Regression',
                key: '/LinearRegression',
            },{
                label: 'Regressionxy',
                key: '/Regressionxy',
            },
            {
                label: 'Regressionxyapi',
                key: '/Regressionxyapi',
            },
            {
                label: 'Regressioneq',
                key: '/Regressioneq',
            },
            {
                label: 'Regressioneqapi',
                key: '/Regressioneqapi',
            },
        ]
    },{
        label: 'Interpolation',
        icon:<AppstoreOutlined />,
        children: [
            {
                    label: 'Newtondivide',
                    key: '/Newtondivide',
            },
        ]
    },
    {
        label: 'Swagger',
        key: 'swagger',
    },
    {
        label: 'login',
        key: '/Login',
    },
  ];

export default function Nav_Bar() {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const onClick = (e) => {
        if(e.key === 'swagger'){
            window.location.href = 'http://localhost:2000/api-docs/';
        }
        else{
        console.log('click ', e.key);
        navigate(e.key);
        setCurrent(e.key);
    }
      };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}
