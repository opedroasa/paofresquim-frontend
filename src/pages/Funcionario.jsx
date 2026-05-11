import { useState } from "react";
import "./Funcionario.css";
import FuncionarioModal from "../components/funcionario/FuncionarioModal";
import FuncionarioTable from "../components/funcionario/FuncionarioTable";

import { useEffect } from "react";
import toast from "react-hot-toast";

import ConfirmModal from "../components/ConfirmModal";

import {
  listarFuncionarios,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario
} from "../services/funcionarioService";

const formularioVazio = {
  nome: "",
  telefone: "",
  cpf: "",
  dataNascimento: "",
  telefoneEmergencia: "",
  senha: "",
  dataAdmissao: "",

  endereco: {
    logradouro: "",
    numero: "",
    cidade: "",
    uf: "",
    pais: "Brasil"
  }
};

function normalizarTexto(valor) {
  return valor ? valor.toString().toLowerCase().replace(/\s+/g, "") : "";
}

export default function Funcionario() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [formData, setFormData] = useState(formularioVazio);

  const [loading, setLoading] = useState(false);

const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [funcionarioSelecionado,
  setFuncionarioSelecionado] =
  useState(null);

  const funcionariosFiltrados = funcionarios.filter((func) => {
    const termoBusca = normalizarTexto(busca);
    if (!termoBusca) return true;

    return [
  func.nome,
  func.telefone,
  func.cpf
]
      .map(normalizarTexto)
      .some((campo) => campo.includes(termoBusca));
  });

  const abrirModalNovo = () => {
    setFuncionarioEditando(null);
    setFormData(formularioVazio);
    setModalAberto(true);
  };

const abrirModalEdicao = (funcionario) => {

  setFuncionarioEditando(funcionario);

  setFormData({
    ...formularioVazio,
    ...funcionario,

    endereco: {
      ...formularioVazio.endereco,
      ...funcionario.endereco
    }
  });

  setModalAberto(true);
};

  const fecharModal = () => {
    setModalAberto(false);
    setFuncionarioEditando(null);
    setFormData(formularioVazio);
  };

const limparNumero = (valor) => {
  return valor.replace(/\D/g, "");
};

const lidarComMudanca = (event) => {
  const { name, value } = event.target;

  let valorTratado = value;

  if (
    name === "cpf" ||
    name === "telefone" ||
    name === "telefoneEmergencia"
  ) {
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

const salvarFuncionario = async (event) => {

  event.preventDefault();

  setLoading(true);

  try {

    if (funcionarioEditando) {

      await atualizarFuncionario(formData);

    } else {

      await criarFuncionario(formData);
    }

    await carregarFuncionarios();

    toast.success(
      funcionarioEditando
        ? "Funcionário atualizado com sucesso"
        : "Funcionário cadastrado com sucesso"
    );

    fecharModal();

  } catch (error) {

    console.error(
      "Erro ao salvar funcionário",
      error
    );

    toast.error(
      error.response?.data ||
      "Erro ao salvar funcionário"
    );

  } finally {

    setLoading(false);
  }
};

const confirmarExclusao = async () => {

  try {

    await deletarFuncionario(
      funcionarioSelecionado.idFuncionario
    );

    await carregarFuncionarios();

    setShowDeleteModal(false);

    setFuncionarioSelecionado(null);

    toast.success(
      "Funcionário excluído com sucesso"
    );

  } catch (error) {

    console.error(
      "Erro ao excluir funcionário",
      error
    );

    toast.error(
      error.response?.data ||
      "Erro ao excluir funcionário"
    );
  }
};

  useEffect(() => {
  carregarFuncionarios();
}, []);

const carregarFuncionarios = async () => {

  try {

    const data =
      await listarFuncionarios();

    setFuncionarios(data);

  } catch (error) {

    console.error(
      "Erro ao carregar funcionários",
      error
    );

    toast.error(
      "Erro ao carregar funcionários"
    );
  }
};

const abrirModalExclusao = (funcionario) => {
  setFuncionarioSelecionado(funcionario);
  setShowDeleteModal(true);
};

  return (
    <main className="content-panel">
      <header className="content-header">
        <div>
          <h1>Funcionários</h1>
          <p>{funcionariosFiltrados.length} funcionários cadastrados</p>
        </div>

        <button type="button" className="primary-action" onClick={abrirModalNovo}>
          <span aria-hidden="true">+</span> Novo funcionário
        </button>
      </header>

      <section className="toolbar">
        <label className="searchbox" aria-label="Buscar funcionário">
          <span className="searchbox__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Buscar funcionário..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </label>
      </section>

      <FuncionarioTable
        funcionarios={funcionariosFiltrados}
        onEdit={abrirModalEdicao}
        onDelete={abrirModalExclusao}
      />

      <FuncionarioModal
        show={modalAberto}
        onClose={fecharModal}
        onSave={salvarFuncionario}
        onChange={lidarComMudanca}
        formData={formData}
        editing={funcionarioEditando}
        loading={loading}
      />

      <ConfirmModal
  show={showDeleteModal}
  title="Excluir funcionário"
  message={`Deseja realmente excluir ${funcionarioSelecionado?.nome}?`}
  onConfirm={confirmarExclusao}
  onClose={() => {
    setShowDeleteModal(false);
    setFuncionarioSelecionado(null);
  }}
/>
    </main>
  );
}