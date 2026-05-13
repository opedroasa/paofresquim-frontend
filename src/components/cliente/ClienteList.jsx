import { useEffect, useState } from "react";
import ClienteForm from "./ClienteForm";
import api from "../../services/api";

export default function ClienteList() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);

  const carregarClientes = async () => {
    try {
      const response = await api.get("/clientes");
      setCustomers(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes", error);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put("/clientes", {
          ...data,
          idCliente: editing.idCliente
        });
      } else {
        await api.post("/clientes", data);
      }

      setEditing(null);
      await carregarClientes();
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      await carregarClientes();
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Clientes</h1>

      <ClienteForm
        onSave={handleSave}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {customers.map((c) => (
        <div
          key={c.idCliente}
          style={{ borderBottom: "1px solid #ccc", padding: 10 }}
        >
          <strong>{c.nome}</strong>
          <p>{c.email}</p>
          <p>{c.telefone}</p>
          <p>{c.cpf}</p>
          <p>{c.dataNascimento}</p>

          {c.endereco && (
            <p>
              {c.endereco.logradouro}, {c.endereco.numero} -{" "}
              {c.endereco.cidade}/{c.endereco.uf}
            </p>
          )}

          <button onClick={() => setEditing(c)}>Editar</button>
          <button onClick={() => handleDelete(c.idCliente)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}