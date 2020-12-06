import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './Componenti/Table';
import Header from './Componenti/Header';
import Form from './Componenti/Form';


ReactDOM.render(
  <React.StrictMode>
      <Header titolo= "Utenti Skuola"/>
      <Form />
      <Table />
  </React.StrictMode>,
  document.getElementById('root')
);
