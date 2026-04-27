import "./Produto.css";
import { useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Pão de Queijo", categoria: "Pães", preco: "R$0,50", estoque: 200 },
    { id: 2, nome: "Brigadeiro", categoria: "Doce", preco: "R$1,00", estoque: 20 },
    { id: 3, nome: "Pão Francês", categoria: "Pães", preco: "R$0,25", estoque: 50 },
    { id: 4, nome: "Mussarela", categoria: "Frios", preco: "R$30,00", estoque: 3 },
    { id: 5, nome: "Bolo de Chocolate", categoria: "Bolo", preco: "R$4,50", estoque: 10 },
    { id: 6, nome: "Coxinha", categoria: "Salgado", preco: "R$3,50", estoque: 25 },
  ]);

  const [busca, setBusca] = useState("");

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

        <button className="btn-novo">+ Novo Produto</button>
      </div>

      <input
        type="text"
        placeholder="Buscar produto..."
        className="input-busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="tabela-container">
        <table>
          <thead>
            <tr>
              <th>NOME</th>
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
                <td>{p.categoria}</td>
                <td>{p.preco}</td>
                <td>{p.estoque}</td>
                <td className="acoes">
                  <span className="editar">✏️</span>
                  <span
                    className="excluir"
                    onClick={() => excluirProduto(p.id)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}