import { useState } from "react";
import "./Funcionario.css";
import FuncionarioModal from "../components/funcionario/FuncionarioModal";
import FuncionarioTable from "../components/funcionario/FuncionarioTable";

const funcionariosIniciais = [
  {
    id: 1,
    nome: "Pedro",
    cargo: "Gerente",
    telefone: "(34)9999-0000",
    salario: 7500.00,
    status: "Ativo",
    email: "pedro@padaria.com",
    dataAdmissao: "2020-01-15"
  },
  {
    id: 2,
    nome: "Lucas",
    cargo: "Padeiro",
    telefone: "(34)8888-2222",
    salario: 2000.00,
    status: "Ativo",
    email: "lucas@padaria.com",
    dataAdmissao: "2023-05-10"
  }
];

const formularioVazio = {
  nome: "",
  cargo: "",
  telefone: "",
  salario: "",
  email: "",
  dataAdmissao: "",
  status: "Ativo"
};

function normalizarTexto(valor) {
  return valor ? valor.toString().toLowerCase().replace(/\s+/g, "") : "";
}

export default function Funcionario() {
  const [funcionarios, setFuncionarios] = useState(funcionariosIniciais);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [formData, setFormData] = useState(formularioVazio);

  const funcionariosFiltrados = funcionarios.filter((func) => {
    const termoBusca = normalizarTexto(busca);
    if (!termoBusca) return true;

    return [func.nome, func.telefone, func.cargo]
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
    setFormData({ ...formularioVazio, ...funcionario });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFuncionarioEditando(null);
    setFormData(formularioVazio);
  };

  const lidarComMudanca = (event) => {
    const { name, value } = event.target;
    setFormData((atual) => ({ ...atual, [name]: value }));
  };

  const salvarFuncionario = (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      salario: Number(formData.salario), // Garante que o salário seja número
      id: funcionarioEditando?.id ?? Date.now()
    };

    if (funcionarioEditando) {
      setFuncionarios((atual) =>
        atual.map((func) => (func.id === funcionarioEditando.id ? payload : func))
      );
    } else {
      setFuncionarios((atual) => [...atual, payload]);
    }
    fecharModal();
  };

  const excluirFuncionario = (id) => {
    setFuncionarios((atual) => atual.filter((func) => func.id !== id));
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
        onDelete={excluirFuncionario}
      />

      <FuncionarioModal
        show={modalAberto}
        onClose={fecharModal}
        onSave={salvarFuncionario}
        onChange={lidarComMudanca}
        formData={formData}
        editing={funcionarioEditando}
      />
    </main>
  );
}