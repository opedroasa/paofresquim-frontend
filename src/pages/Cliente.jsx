import { useState } from "react";
import "./Cliente.css"
import ClienteModal from "../components/cliente/ClienteModal";
import ClienteTable from "../components/cliente/ClienteTable";

const clientesIniciais = [
  {
    id: 1,
    name: "Pedro",
    phone: "(34)9999-0000",
    email: "pedro@gmail.com",
    cpf: "000.000.000-33"
  },
  {
    id: 2,
    name: "Lucas",
    phone: "(34)8888-2222",
    email: "lucas@gmail.com",
    cpf: "000.000.000-13"
  },
  {
    id: 3,
    name: "Ana",
    phone: "(11)2222-2222",
    email: "ana@gmail.com",
    cpf: "000.000.000-23"
  }
];

const formularioVazio = {
  name: "",
  phone: "",
  email: "",
  cpf: "",
  address: "",
  notes: ""
};

function normalizarTexto(valor) {
  return valor.toLowerCase().replace(/\s+/g, "");
}

export default function Cliente() {
  const [clientes, setClientes] = useState(clientesIniciais);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [formData, setFormData] = useState(formularioVazio);

  const clientesFiltrados = clientes.filter((cliente) => {
    const termoBusca = normalizarTexto(busca);

    if (!termoBusca) return true;

    return [cliente.name, cliente.phone, cliente.cpf]
      .map((campo) => normalizarTexto(campo))
      .some((campo) => campo.includes(termoBusca));
  });

  const abrirModalNovoCliente = () => {
    setClienteEditando(null);
    setFormData(formularioVazio);
    setModalAberto(true);
  };

  const abrirModalEdicao = (cliente) => {
    setClienteEditando(cliente);
    setFormData({ ...formularioVazio, ...cliente });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setClienteEditando(null);
    setFormData(formularioVazio);
  };

  const lidarComMudancaFormulario = (event) => {
    const { name, value } = event.target;
    setFormData((atual) => ({ ...atual, [name]: value }));
  };

  const salvarCliente = (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      address: formData.address ?? "",
      notes: formData.notes ?? "",
      id: clienteEditando?.id ?? Date.now()
    };

    if (clienteEditando) {
      setClientes((atual) =>
        atual.map((cliente) =>
          cliente.id === clienteEditando.id ? payload : cliente
        )
      );
    } else {
      setClientes((atual) => [...atual, payload]);
    }

    fecharModal();
  };

  const excluirCliente = (id) => {
    setClientes((atual) => atual.filter((cliente) => cliente.id !== id));
  };

  return (
    <main className="content-panel">
      <header className="content-header">
        <div>
          <h1>Clientes</h1>
          <p>{clientesFiltrados.length} clientes cadastrados</p>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={abrirModalNovoCliente}
        >
          <span aria-hidden="true">+</span>
          Novo Cliente
        </button>
      </header>

      <section className="toolbar">
        <label className="searchbox" aria-label="Buscar cliente">
          <span className="searchbox__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
            </svg>
          </span>

          <input
            type="search"
            placeholder="Buscar por nome, telefone ou CPF..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </label>
      </section>

      <ClienteTable
        clientes={clientesFiltrados}
        onEdit={abrirModalEdicao}
        onDelete={excluirCliente}
      />

      <ClienteModal
        show={modalAberto}
        onClose={fecharModal}
        onSave={salvarCliente}
        onChange={lidarComMudancaFormulario}
        formData={formData}
        editing={clienteEditando}
      />
    </main>
  );
}