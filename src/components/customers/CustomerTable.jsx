import React from "react";

const CustomerTable = ({ customers = [], onEdit }) => {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>CPF</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {customers.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>{c.cpf}</td>
            <td>
              <button onClick={() => onEdit?.(c.id)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;