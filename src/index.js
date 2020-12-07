import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Componenti/Table';
import Header from './Componenti/Header';
import Form from './Componenti/Form';
import { Provider as AlertProvider } from 'react-alert';
//import AlertTemplate from 'react-alert-template-basic';


const options = {
  position: 'top right',
  timeout: 2000,
  offset: '30px',
  transition: 'fade'
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    {message}
  </div>
)

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <React.StrictMode>
        <Header />
        <Form />
        <Table />
    </React.StrictMode>
  </AlertProvider>,
  document.getElementById('root')
);
