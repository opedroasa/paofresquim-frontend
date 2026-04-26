import { useState, useEffect } from "react";

export default function ClienteForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);

    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} />

      <button type="submit">
        {editing ? "Salvar" : "Cadastrar"}
      </button>

      {editing && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}