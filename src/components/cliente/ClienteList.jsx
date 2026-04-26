import { useState } from "react";
import ClienteForm from "./ClienteForm";

export default function ClienteList() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "João", email: "joao@email.com", phone: "9999-9999" },
    { id: 2, name: "Maria", email: "maria@email.com", phone: "8888-8888" }
  ]);

  const [editing, setEditing] = useState(null);

  const handleSave = (data) => {
    if (editing) {
      setCustomers(prev =>
        prev.map(c => c.id === editing.id ? { ...data, id: editing.id } : c)
      );
      setEditing(null);
    } else {
      setCustomers(prev => [
        ...prev,
        { ...data, id: Date.now() }
      ]);
    }
  };

  const handleDelete = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Clientes</h1>

      <CustomerForm
        onSave={handleSave}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {customers.map((c) => (
        <div key={c.id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
          <strong>{c.name}</strong>
          <p>{c.email}</p>
          <p>{c.phone}</p>

          <button onClick={() => setEditing(c)}>Editar</button>
          <button onClick={() => handleDelete(c.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}