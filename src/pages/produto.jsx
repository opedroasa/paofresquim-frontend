import "./Produto.css";
import { useState } from "react";

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation">
      <path d="m4 20 4.2-.9L19 8.3 15.7 5 4.9 15.8 4 20Z" />
      <path d="m13.8 6.8 3.3 3.3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M7 7l1 12h8l1-12" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  );
}

function ProdutoModal({
  show,
  editing,
  formData,
  onChange,
  onClose,
  onSave,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-form" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{editing ? "Editar Produto" : "Novo Produto"}</h2>

          <button type="button" className="modal-close" onClick={onClose}>
            x
          </button>
        </div>

        <form className="produto-form" onSubmit={onSave}>
          <label className="field-full">
            <span>Nome do Produto</span>
            <input
              name="nome"
              value={formData.nome}
              onChange={onChange}
              required
            />
          </label>

            <label className="field-full">
            <span>Código de Barras</span>
            <input
              name="codigoBarras"
              value={formData.codigoBarras}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>Categoria</span>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={onChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Pães">Pães</option>
              <option value="Doce">Doce</option>
              <option value="Frios">Frios</option>
              <option value="Bolo">Bolo</option>
              <option value="Salgado">Salgado</option>
            </select>
          </label>

          <label>
            <span>Preço</span>
            <input
              name="preco"
              placeholder="Ex: R$5,00"
              value={formData.preco}
              onChange={onChange}
              required
            />
          </label>

          <label className="field-full">
            <span>Estoque</span>
            <input
              type="number"
              name="estoque"
              value={formData.estoque}
              onChange={onChange}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="submit" className="save-product-button">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Produtos() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Pão de Queijo", codigoBarras: "00000", categoria: "Pães", preco: "R$0,50", estoque: 200 },
    { id: 2, nome: "Brigadeiro", codigoBarras: "11111", categoria: "Doce", preco: "R$1,00", estoque: 20 },
    { id: 3, nome: "Pão Francês", codigoBarras: "22222", categoria: "Pães", preco: "R$0,25", estoque: 50 },
    { id: 4, nome: "Mussarela", codigoBarras: "33333", categoria: "Frios", preco: "R$30,00", estoque: 3 },
    { id: 5, nome: "Bolo de Chocolate", codigoBarras: "44444", categoria: "Bolo", preco: "R$4,50", estoque: 10 },
    { id: 6, nome: "Coxinha", codigoBarras: "55555", categoria: "Salgado", preco: "R$3,50", estoque: 25 },
  ]);

  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    codigoBarras: "",
    categoria: "",
    preco: "",
    estoque: "",
  });

  const abrirNovoProduto = () => {
    setEditingId(null);
    setFormData({
      nome: "",
      codigoBarras: "",
      categoria: "",
      preco: "",
      estoque: "",
    });
    setShowModal(true);
  };

  const abrirEditarProduto = (produto) => {
    setEditingId(produto.id);
    setFormData({
      nome: produto.nome,
      codigoBarras: produto.codigoBarras,
      categoria: produto.categoria,
      preco: produto.preco,
      estoque: produto.estoque,
    });
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const alterarCampo = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const salvarProduto = (e) => {
    e.preventDefault();

    if (editingId) {
      const listaAtualizada = produtos.map((produto) =>
        produto.id === editingId
          ? {
              ...produto,
              ...formData,
              estoque: Number(formData.estoque),
            }
          : produto
      );

      setProdutos(listaAtualizada);
    } else {
      const novoProduto = {
        id: Date.now(),
        nome: formData.nome,
        codigoBarras: formData.codigoBarras,
        categoria: formData.categoria,
        preco: formData.preco,
        estoque: Number(formData.estoque),
      };

      setProdutos([...produtos, novoProduto]);
    }

    fecharModal();
  };

  const excluirProduto = (id) => {
    const novaLista = produtos.filter((p) => p.id !== id);
    setProdutos(novaLista);
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container-produtos">
      <div className="topo">
        <div>
          <h1>Produtos</h1>
          <p>Gerencie o catálogo de produtos da padaria</p>
        </div>

        <button className="btn-novo" onClick={abrirNovoProduto}>
          + Novo Produto
        </button>
      </div>

        <section className="toolbar">
        <label className="searchbox" aria-label="Buscar produto">
          <span className="searchbox__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
            </svg>
          </span>
          

      <input
        type="text"
        placeholder="Buscar produto..."
        className="input-busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      </label>
       </section>

      <div className="tabela-container">
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>CÓD.BARRAS</th>
              <th>CATEGORIA</th>
              <th>PREÇO</th>
              <th>ESTOQUE</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {produtosFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.codigoBarras}</td>
                <td>{p.categoria}</td>
                <td>{p.preco}</td>
                <td>{p.estoque}</td>
                <td className="acoes">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => abrirEditarProduto(p)}
                  >
                    <PencilIcon />
                  </button>
                  

                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => excluirProduto(p.id)}
                  >

                    
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
              {produtosFiltrados.length === 0 && (
  <tr>
    <td colSpan="6" className="empty-state" style={{ textAlign: "center", padding: "30px" }}>
      Nenhum produto encontrado.
    </td>
  </tr>
)}
          </tbody>
        </table>
      </div>
             
      <ProdutoModal
        show={showModal}
        editing={editingId !== null}
        formData={formData}
        onChange={alterarCampo}
        onClose={fecharModal}
        onSave={salvarProduto}
      />
    </div>
  );
}

