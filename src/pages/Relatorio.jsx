import React, { useState } from "react";
import "./Relatorio.css";

function Relatorio() {
  const [tipoRelatorio, setTipoRelatorio] = useState("todos");
  const [produtoBusca, setProdutoBusca] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [relatorioGerado, setRelatorioGerado] = useState(false);

  const vendas = [
    { id: 1, data: "2026-06-10", produto: "Pão Francês", quantidade: 320, valor: 80 },
    { id: 2, data: "2026-06-11", produto: "Pão de Queijo", quantidade: 200, valor: 100 },
    { id: 3, data: "2026-06-12", produto: "Coxinha", quantidade: 25, valor: 87.5 },
    { id: 4, data: "2026-06-13", produto: "Bolo de Chocolate", quantidade: 10, valor: 45 },
    { id: 5, data: "2026-06-14", produto: "Brigadeiro", quantidade: 90, valor: 90 },
  ];

  const clientesFiado = [
    { nome: "João Silva", valor: 350 },
    { nome: "Maria Souza", valor: 420 },
    { nome: "Carlos Lima", valor: 180 },
    { nome: "Ana Paula", valor: 300 },
  ];

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const vendasFiltradas = vendas.filter((item) => {
    const filtroProduto = item.produto
      .toLowerCase()
      .includes(produtoBusca.toLowerCase());

    const filtroDataInicial = dataInicial ? item.data >= dataInicial : true;
    const filtroDataFinal = dataFinal ? item.data <= dataFinal : true;

    return filtroProduto && filtroDataInicial && filtroDataFinal;
  });

  const totalVendas = vendasFiltradas.reduce(
    (total, item) => total + item.valor,
    0
  );

  const totalQuantidade = vendasFiltradas.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const totalFiado = clientesFiado.reduce(
    (total, cliente) => total + cliente.valor,
    0
  );

  const produtoMaisVendido =
    vendasFiltradas.length > 0
      ? vendasFiltradas.reduce((maior, atual) =>
          atual.quantidade > maior.quantidade ? atual : maior
        )
      : null;

  const maiorQuantidade =
    vendasFiltradas.length > 0
      ? Math.max(...vendasFiltradas.map((item) => item.quantidade))
      : 0;

  const gerarRelatorio = () => {
    setRelatorioGerado(true);
  };

  const limparFiltros = () => {
    setTipoRelatorio("todos");
    setProdutoBusca("");
    setDataInicial("");
    setDataFinal("");
    setRelatorioGerado(false);
  };

  const imprimirRelatorio = () => {
    window.print();
  };

  const mostrarVendas =
    tipoRelatorio === "todos" ||
    tipoRelatorio === "vendas" ||
    tipoRelatorio === "produto";

  const mostrarFinanceiro =
    tipoRelatorio === "todos" || tipoRelatorio === "financeiro";

  const mostrarFiado = tipoRelatorio === "todos" || tipoRelatorio === "fiado";

  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <div>
          <h1>Relatórios</h1>
          <p>Gere e visualize relatórios da padaria Pão Fresquim.</p>
        </div>

        <div className="relatorio-acoes">
          <button className="btn-gerar" onClick={gerarRelatorio}>
            Gerar Relatório
          </button>

          <button className="btn-limpar" onClick={limparFiltros}>
            Limpar
          </button>

          <button
            className="btn-imprimir"
            onClick={imprimirRelatorio}
            disabled={!relatorioGerado}
          >
            Imprimir
          </button>
        </div>
      </div>

      <div className="filtros-relatorio">
        <div className="campo">
          <label>Tipo de relatório</label>
          <select
            value={tipoRelatorio}
            onChange={(e) => setTipoRelatorio(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="vendas">Vendas por período</option>
            <option value="financeiro">Financeiro</option>
            <option value="produto">Vendas por produto</option>
            <option value="fiado">Clientes fiado</option>
          </select>
        </div>

        <div className="campo">
          <label>Data inicial</label>
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Data final</label>
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Produto</label>
          <input
            type="text"
            placeholder="Ex: Pão Francês"
            value={produtoBusca}
            onChange={(e) => setProdutoBusca(e.target.value)}
          />
        </div>
      </div>

      {!relatorioGerado ? (
        <div className="mensagem-relatorio">
          Selecione os filtros e clique em <strong>Gerar Relatório</strong>.
        </div>
      ) : (
        <>
          <div className="cards-relatorio">
            {mostrarVendas && (
              <div className="card-relatorio">
                <span className="icone-card">🛒</span>
                <h3>Total de Vendas</h3>
                <p>Vendas realizadas no período selecionado.</p>
                <strong>{formatarMoeda(totalVendas)}</strong>
                <small>{totalQuantidade} unidades vendidas</small>
              </div>
            )}

            {mostrarFinanceiro && (
              <div className="card-relatorio">
                <span className="icone-card">💰</span>
                <h3>Relatório Financeiro</h3>
                <p>Resumo financeiro da padaria.</p>
                <strong>{formatarMoeda(totalVendas - totalFiado)}</strong>
                <small>Saldo estimado atual</small>
              </div>
            )}

            {mostrarVendas && (
              <div className="card-relatorio">
                <span className="icone-card">🥖</span>
                <h3>Produto Mais Vendido</h3>
                <p>Produto com maior saída.</p>
                <strong>
                  {produtoMaisVendido ? produtoMaisVendido.produto : "-"}
                </strong>
                <small>
                  {produtoMaisVendido
                    ? `${produtoMaisVendido.quantidade} unidades`
                    : "Nenhum produto encontrado"}
                </small>
              </div>
            )}

            {mostrarFiado && (
              <div className="card-relatorio">
                <span className="icone-card">📒</span>
                <h3>Clientes Fiado</h3>
                <p>Total de valores pendentes.</p>
                <strong>{formatarMoeda(totalFiado)}</strong>
                <small>{clientesFiado.length} clientes com débitos</small>
              </div>
            )}
          </div>

          {mostrarVendas && (
            <div className="grafico-area">
              <div className="grafico-header">
                <h2>Gráfico por quantidade</h2>
                <p>Comparação de unidades vendidas por produto.</p>
              </div>

              <div className="grafico-horizontal">
                {vendasFiltradas.length === 0 ? (
                  <p className="sem-dados">Nenhuma venda encontrada.</p>
                ) : (
                  vendasFiltradas.map((item) => (
                    <div className="grafico-linha" key={item.id}>
                      <div className="grafico-info">
                        <span>{item.produto}</span>
                        <strong>{item.quantidade} un.</strong>
                      </div>

                      <div className="grafico-barra-fundo">
                        <div
                          className="grafico-barra-preenchida"
                          style={{
                            width: `${(item.quantidade / maiorQuantidade) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="historico-relatorios">
            <h2>Histórico do relatório</h2>

            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Produto/Cliente</th>
                  <th>Quantidade</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {mostrarVendas &&
                  vendasFiltradas.map((item) => (
                    <tr key={item.id}>
                      <td>{item.data}</td>
                      <td>Venda</td>
                      <td>{item.produto}</td>
                      <td>{item.quantidade}</td>
                      <td>{formatarMoeda(item.valor)}</td>
                      <td>
                        <span className="status">Gerado</span>
                      </td>
                    </tr>
                  ))}

                {mostrarFiado &&
                  clientesFiado.map((cliente, index) => (
                    <tr key={index}>
                      <td>2026-06-14</td>
                      <td>Fiado</td>
                      <td>{cliente.nome}</td>
                      <td>-</td>
                      <td>{formatarMoeda(cliente.valor)}</td>
                      <td>
                        <span className="status pendente">Pendente</span>
                      </td>
                    </tr>
                  ))}

                {vendasFiltradas.length === 0 && !mostrarFiado && (
                  <tr>
                    <td colSpan="6" className="sem-dados">
                      Nenhum dado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Relatorio;