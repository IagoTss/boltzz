// frontend/src/ExcelDownloadComponent.js
import React from 'react';
import axios from 'axios';

const ExcelDownloadComponent = () => {
  const downloadExcel = async () => {
    try {
      const response = await axios.get('http://localhost:6969/excel/pedidos', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pedidos.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erro ao baixar o arquivo Excel:', error);
      alert('Erro ao baixar o arquivo Excel.');
    }
  };

  return (
    <button onClick={downloadExcel} className="btn btn-success">
      Baixar Pedidos Excel
    </button>
  );
};

export default ExcelDownloadComponent;
