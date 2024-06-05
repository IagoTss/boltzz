// frontend/src/App.js
import React from 'react';
import './App.css';
import FormComponent from './FormComponent';
import PedidosComponent from './PedidosComponent';
import ExcelDownloadComponent from './ExcelDownloadComponent';

function App() {
  return (
    <div className="container">
      <h1 className="mt-5">Sistema de Pedidos</h1>
      <FormComponent />
      <hr />
      <PedidosComponent />
      <hr />
      <ExcelDownloadComponent />
    </div>
  );
}

export default App;
