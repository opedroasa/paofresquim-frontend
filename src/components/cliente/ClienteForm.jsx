import { useState, useEffect } from "react";

export default function ClienteForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    logradouro: "",
    numero: "",
    cidade: "",
    uf: "",
    pais: "Brasil"
  });

  useEffect(() => {
    if (editing) {
      setForm({
        nome: editing.nome || "",
        email: editing.email || "",
        telefone: editing.telefone || "",
        cpf: editing.cpf || "",
        dataNascimento: editing.dataNascimento || "",
        logradouro: editing.endereco?.logradouro || "",
        numero: editing.endereco?.numero || "",
        cidade: editing.endereco?.cidade || "",
        uf: editing.endereco?.uf || "",
        pais: editing.endereco?.pais || "Brasil"
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cliente = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cpf: form.cpf,
      dataNascimento: form.dataNascimento,
      statusCredito: "ATIVO",
      endereco: {
        logradouro: form.logradouro,
        numero: form.numero,
        cidade: form.cidade,
        uf: form.uf,
        pais: form.pais
      }
    };

    onSave(cliente);

    setForm({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      dataNascimento: "",
      logradouro: "",
      numero: "",
      cidade: "",
      uf: "",
      pais: "Brasil"
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
      <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
      <input name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} />

      <input name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
      <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
      <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
      <input name="uf" placeholder="UF" value={form.uf} onChange={handleChange} maxLength={2} />
      <input name="pais" placeholder="País" value={form.pais} onChange={handleChange} />

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