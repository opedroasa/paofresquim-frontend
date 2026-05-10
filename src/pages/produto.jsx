import { useState } from "react";
import "./Produto.css";

import ProdutoModal from "../components/produto/ProdutoModal";
import ProdutoTable from "../components/produto/ProdutoTable";
import ConfirmModal from "../components/ConfirmModal";

const produtosIniciais = [
  {
    id: 1,
    nome: "Pão de Queijo",
    codigoBarras: "00000",
    categoria: "Pães",
    preco: "R$0,50",
    estoque: 200,
  },
  {
    id: 2,
    nome: "Brigadeiro",
    codigoBarras: "11111",
    categoria: "Doce",
    preco: "R$1,00",
    estoque: 20,
  },
];

const formularioVazio = {
  nome: "",
  codigoBarras: "",
  categoria: "",
  preco: "",
  estoque: "",
};

export default function Produto() {
  const [produtos, setProdutos] =
    useState(produtosIniciais);

  const [busca, setBusca] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [produtoEditando, setProdutoEditando] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [produtoSelecionado, setProdutoSelecionado] =
    useState(null);

  const [formData, setFormData] =
    useState(formularioVazio);

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      produto.codigoBarras
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

  const abrirNovoProduto = () => {
    setProdutoEditando(null);
    setFormData(formularioVazio);
    setShowModal(true);
  };

  const abrirEditarProduto = (produto) => {
    setProdutoEditando(produto);

    setFormData({
      ...formularioVazio,
      ...produto,
    });

    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
    setFormData(formularioVazio);
  };

  const alterarCampo = (event) => {
    const { name, value } = event.target;

    setFormData((atual) => ({
      ...atual,
      [name]: value,
    }));
  };

  const salvarProduto = (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      estoque: Number(formData.estoque),
      id:
        produtoEditando?.id ??
        Date.now(),
    };

    if (produtoEditando) {
      setProdutos((atual) =>
        atual.map((produto) =>
          produto.id === produtoEditando.id
            ? payload
            : produto
        )
      );
    } else {
      setProdutos((atual) => [
        ...atual,
        payload,
      ]);
    }

    fecharModal();
  };

  const abrirModalExcluir = (produto) => {
    setProdutoSelecionado(produto);
    setShowDeleteModal(true);
  };

  const confirmarExclusao = () => {
    setProdutos((atual) =>
      atual.filter(
        (produto) =>
          produto.id !==
          produtoSelecionado.id
      )
    );

    setShowDeleteModal(false);
    setProdutoSelecionado(null);
  };

  return (
    <main className="content-panel">
      <header className="content-header">
        <div>
          <h1>Produtos</h1>

          <p>
            {produtosFiltrados.length} produtos
            cadastrados
          </p>
        </div>

        <button
          type="button"
          className="primary-action"
          onClick={abrirNovoProduto}
        >
          <span aria-hidden="true">+</span>
          Novo Produto
        </button>
      </header>

      <section className="toolbar">
        <label
          className="searchbox"
          aria-label="Buscar produto"
        >
          <span
            className="searchbox__icon"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
            </svg>
          </span>

          <input
            type="search"
            placeholder="Buscar por nome ou cód. barras..."
            value={busca}
            onChange={(event) =>
              setBusca(event.target.value)
            }
          />
        </label>
      </section>

      <ProdutoTable
        produtos={produtosFiltrados}
        onEdit={abrirEditarProduto}
        onDelete={abrirModalExcluir}
      />

      <ProdutoModal
        show={showModal}
        editing={produtoEditando}
        formData={formData}
        onChange={alterarCampo}
        onClose={fecharModal}
        onSave={salvarProduto}
      />

      <ConfirmModal
        show={showDeleteModal}
        title="Excluir produto"
        message={`Deseja realmente excluir ${
          produtoSelecionado?.nome ||
          "este produto"
        }?`}
        onClose={() => {
          setShowDeleteModal(false);
          setProdutoSelecionado(null);
        }}
        onConfirm={confirmarExclusao}
      />
    </main>
  );
}