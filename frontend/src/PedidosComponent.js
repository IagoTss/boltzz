// frontend/src/PedidosComponent.js
import React, { useEffect, useState } from 'react';

const PedidosComponent = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6969/pedidos')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Erro ao buscar pedidos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Solicitante</th>
            <th>Telefone</th>
            <th>CEP Origem</th>
            <th>CEP Destino</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.nome_solicitante}</td>
              <td>{pedido.telefone}</td>
              <td>{pedido.cep_origem}</td>
              <td>{pedido.cep_destino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosComponent;
