import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cep_origem: '',
    cep_destino: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6969/EnviarDados', formData);
      console.log('Resposta do servidor:', response.data);
      alert('Pedido enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar pedido.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome:</label>
        <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Telefone:</label>
        <input type="text" className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>CEP Origem:</label>
        <input type="text" className="form-control" name="cep_origem" value={formData.cep_origem} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>CEP Destino:</label>
        <input type="text" className="form-control" name="cep_destino" value={formData.cep_destino} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Enviar Pedido</button>
    </form>
  );
};

export default FormComponent;
