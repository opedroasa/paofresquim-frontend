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
                  
                   <button
                      type="button"
                      className="icon-button"
                      aria-label={`Editar ${p.nome}`}
                      onClick={() => onEdit(p.id)}
                    >
                      <PencilIcon />
                      </button>
                    
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Excluir ${p.nome}`}
                      onClick={() => onDelete(p.id)}
                    >
                      <TrashIcon />
                    </button>
                    
                
                    
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}