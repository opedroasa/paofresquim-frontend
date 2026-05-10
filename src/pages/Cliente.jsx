import { useState } from "react";
import toast from "react-hot-toast";
import "./Cliente.css"
import ClienteModal from "../components/cliente/ClienteModal";
import ClienteTable from "../components/cliente/ClienteTable";
import ConfirmModal from "../components/ConfirmModal";
import { useEffect } from "react";
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente
} from "../services/clienteService";

const formularioVazio = {
  idCliente: null,
  nome: "",
  telefone: "",
  email: "",
  cpf: "",
  statusCredito: "",

  dataNascimento: "",

  endereco: {
    logradouro: "",
    numero: "",
    cidade: "",
    uf: "",
    pais: "Brasil"
  }
};

function normalizarTexto(valor) {
  return valor.toLowerCase().replace(/\s+/g, "");
}

export default function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [formData, setFormData] = useState(formularioVazio);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  carregarClientes();
}, []);

const carregarClientes = async () => {
  try {
    const data = await listarClientes();

    setClientes(data);
  } catch (error) {
    console.error(
      "Erro ao carregar clientes",
      error
    );
  }
};

  const clientesFiltrados = clientes.filter((cliente) => {
    const termoBusca = normalizarTexto(busca);

    if (!termoBusca) return true;

  return [cliente.nome, cliente.telefone, cliente.cpf]
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

const limparNumero = (valor) => {
  return valor.replace(/\D/g, "");
};

const lidarComMudancaFormulario = (event) => {
  const { name, value } = event.target;

  let valorTratado = value;

  if (name === "cpf" || name === "telefone") {
    valorTratado = limparNumero(value);
  }

  if (name.includes(".")) {
    const [objeto, campo] = name.split(".");

    setFormData((atual) => ({
      ...atual,
      [objeto]: {
        ...atual[objeto],
        [campo]: valorTratado
      }
    }));

    return;
  }

  setFormData((atual) => ({
    ...atual,
    [name]: valorTratado
  }));
};

const salvarCliente = async (event) => {
  event.preventDefault();

  setLoading(true);

  try {

    if (clienteEditando) {
      await atualizarCliente(formData);
    } else {
      await criarCliente(formData);
    }

    await carregarClientes();

    toast.success(
      clienteEditando
        ? "Cliente atualizado com sucesso"
        : "Cliente cadastrado com sucesso"
    );

    fecharModal();

  } catch (error) {

    console.error(
      "Erro ao salvar cliente",
      error
    );

    toast.error(
      error.response?.data ||
      "Erro ao salvar cliente"
    );

  } finally {

    setLoading(false);

  }
};


const abrirModalExcluir = (cliente) => {
  setClienteSelecionado(cliente);
  setShowDeleteModal(true);
};

const confirmarExclusao = async () => {
  try {
    await deletarCliente(
      clienteSelecionado.idCliente
    );

    await carregarClientes();

    setShowDeleteModal(false);
    setClienteSelecionado(null);
              toast.success("Cliente excluído com sucesso");


  } catch (error) {
    console.error(
      "Erro ao excluir cliente",
      error
    );
    toast.error("Erro ao excluir cliente");
  }
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
        onDelete={abrirModalExcluir}
      />

      <ClienteModal
        show={modalAberto}
        onClose={fecharModal}
        onSave={salvarCliente}
        onChange={lidarComMudancaFormulario}
        formData={formData}
        editing={clienteEditando}
        loading={loading}
      />
      
      <ConfirmModal
        show={showDeleteModal}
        title="Excluir cliente"
        message={`Deseja realmente excluir ${
          clienteSelecionado?.nome || "este cliente"
        }?`}
        onClose={() => {
          setShowDeleteModal(false);
          setClienteSelecionado(null);
        }}
        onConfirm={confirmarExclusao}
      />
    </main>
  );
}