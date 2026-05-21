import { useState } from "react";
import "./Produto.css";

import ProdutoModal from "../components/produto/ProdutoModal";
import ProdutoTable from "../components/produto/ProdutoTable";
import ConfirmModal from "../components/ConfirmModal";

import { useEffect } from "react";

import toast from "react-hot-toast";

import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../services/produtoService";

import {
  criarEstoque,
  atualizarEstoque,
  buscarEstoqueProduto
} from "../services/estoqueService";

const formularioVazio = {
  nome: "",
  preco: "",
  unidadeMedida: "",
  codigoBarras: "",
  favorito: false,

  quantidadeAtual: "",
  estoqueMinimo: ""
};

export default function Produto() {
  const [produtos, setProdutos] =
    useState([])

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

    const [loading, setLoading] =
  useState(false);

  useEffect(() => {
  carregarProdutos();
}, []);

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      produto.codigoBarras
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

const carregarProdutos = async () => {

  try {

    const produtosData =
      await listarProdutos();

    const produtosComEstoque =
      await Promise.all(

        produtosData.map(
          async (produto) => {

            try {

              const estoque =
                await buscarEstoqueProduto(
                  produto.id
                );

              return {
                ...produto,

                quantidadeAtual:
                  estoque.quantidadeAtual,

                estoqueMinimo:
                  estoque.estoqueMinimo
              };

            } catch {

              return {
                ...produto,
                quantidadeAtual: 0,
                estoqueMinimo: 0
              };
            }
          }
        )
      );

    setProdutos(
      produtosComEstoque.sort(
        (a, b) =>
          a.nome.localeCompare(
            b.nome
          )
      )
    );

  } catch (error) {

    console.error(
      "Erro ao carregar produtos",
      error
    );

    toast.error(
      "Erro ao carregar produtos"
    );
  }
};

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

    preco:
      produto.preco
        ? String(
            Math.round(
              Number(produto.preco) * 100
            )
          )
        : ""

  });

  setShowModal(true);
};

  const fecharModal = () => {
    setShowModal(false);
    setProdutoEditando(null);
    setFormData(formularioVazio);
  };

const alterarCampo = (event) => {

  const { name, value } =
    event.target;

  let valorTratado = value;

  if (name === "preco") {

    valorTratado = value
      .replace(/\D/g, "");
  }

  if (name === "favorito") {

    valorTratado =
      value === "true";
  }

  setFormData((atual) => ({
    ...atual,
    [name]: valorTratado,
  }));
};

const salvarProduto = async (event) => {

  event.preventDefault();

  setLoading(true);

  try {

    const produtoPayload = {
      nome: formData.nome,
preco:
  Number(formData.preco) / 100,
      unidadeMedida:
        formData.unidadeMedida,
      codigoBarras:
        formData.codigoBarras,
      favorito: formData.favorito
    };

    if (produtoEditando) {

      await atualizarProduto(
        produtoEditando.id,
        produtoPayload
      );

      const estoqueAtual =
        await buscarEstoqueProduto(
          produtoEditando.id
        );

      await atualizarEstoque(
        estoqueAtual.id,
        {
          quantidadeAtual:
            Number(
              formData.quantidadeAtual
            ),

          estoqueMinimo:
            Number(
              formData.estoqueMinimo
            )
        }
      );

      toast.success(
        "Produto atualizado com sucesso"
      );

    } else {

      const novoProduto =
        await criarProduto(
          produtoPayload
        );

      await criarEstoque({
        idProduto: novoProduto.id,

        quantidadeAtual:
          Number(
            formData.quantidadeAtual
          ),

        estoqueMinimo:
          Number(
            formData.estoqueMinimo
          )
      });

      toast.success(
        "Produto cadastrado com sucesso"
      );
    }

    await carregarProdutos();

    fecharModal();

  } catch (error) {

    console.error(
      "Erro ao salvar produto",
      error
    );

    toast.error(
      error.response?.data ||
      "Erro ao salvar produto"
    );

  } finally {

    setLoading(false);
  }
};

  const abrirModalExcluir = (produto) => {
    setProdutoSelecionado(produto);
    setShowDeleteModal(true);
  };

const confirmarExclusao = async () => {

  try {

    await deletarProduto(
      produtoSelecionado.id
    );

    await carregarProdutos();

    toast.success(
      "Produto excluído com sucesso"
    );

    setShowDeleteModal(false);

    setProdutoSelecionado(null);

  } catch (error) {

    console.error(
      "Erro ao excluir produto",
      error
    );

    toast.error(
      error.response?.data ||
      "Erro ao excluir produto"
    );
  }
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