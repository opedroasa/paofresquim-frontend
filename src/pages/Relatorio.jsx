import React, {
  useState
} from "react";

import "./Relatorio.css";

import { toast }
from "react-toastify";


import RelatorioFiltros from "../components/relatorio/RelatorioFiltros";
import RelatorioCards from "../components/relatorio/RelatorioCards";
import RelatorioGrafico from "../components/relatorio/RelatorioGrafico";
import RelatorioTabela from "../components/relatorio/RelatorioTabela";
import RelatorioFiadoTable from "../components/relatorio/RelatorioFiadoTable";
import RelatorioProdutosTable
from "../components/relatorio/RelatorioProdutosTable";

import {
  gerarRelatorio,
  listarFiados
} from "../services/relatorioService";

function Relatorio() {

  const [vendasFiado,
  setVendasFiado] =
    useState([]);

  const [relatorio,
    setRelatorio] =
      useState(null);

  const [tipoRelatorio,
    setTipoRelatorio] =
      useState("vendas");

  const [dataInicial,
    setDataInicial] =
      useState("");

  const [dataFinal,
    setDataFinal] =
      useState("");

  const [relatorioGerado,
    setRelatorioGerado] =
      useState(false);

  const formatarMoeda =
    (valor) =>
      Number(valor || 0)
        .toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL"
          }
        );

const buscarRelatorio =
  async () => {

    const precisaData =
      tipoRelatorio === "vendas"
      ||
      tipoRelatorio === "produto";

    if (
      precisaData
      &&
      (
        !dataInicial
        ||
        !dataFinal
      )
    ) {

      toast.warning(
        "Preencha a data inicial e final."
      );

      return;
    }

    try {

      if (
        tipoRelatorio ===
        "fiado"
      ) {

        const response =
          await listarFiados();

        setVendasFiado(response);

      } else {

        const response =
          await gerarRelatorio({
            dataInicial,
            dataFinal
          });

        setRelatorio(response);
      }

      setRelatorioGerado(true);

    } catch (error) {

      console.error(error);

      toast.error(
        "Erro ao gerar relatório."
      );
    }
  };

  const limparFiltros =
    () => {

      setTipoRelatorio("vendas");

      setDataInicial("");

      setDataFinal("");

      setRelatorio(null);

      setRelatorioGerado(false);
    };

  const mostrarVendas =
    tipoRelatorio === "vendas";

  const mostrarProdutos =
    tipoRelatorio === "produto";

  const mostrarFiado =
    tipoRelatorio === "fiado";

  const vendas =
    relatorio?.vendas || [];



  const totalVendas =
    relatorio?.totalVendas || 0;

  const totalQuantidade =
    relatorio?.totalQuantidade || 0;

const totalFiado =
  vendasFiado.reduce(
    (total, venda) =>
      total + (
        venda.subTotal || 0
      ),
    0
  );

const maiorQuantidade =
  relatorio
    ?.produtosMaisVendidos?.[0]
    ?.quantidade || 0;

  return (

    <div className="
relatorio-container
    ">

      <div className="
relatorio-header
      ">

        <div>

          <h1>
            Relatórios
          </h1>

          <p>
            Gere e visualize
            relatórios da
            padaria
            Pão Fresquim.
          </p>

        </div>

        <div className="
relatorio-acoes
        ">

          <button
            className="
btn-limpar
            "
            onClick={
              limparFiltros
            }
          >
            Limpar
          </button>

        </div>

      </div>

      <RelatorioFiltros
        tipoRelatorio={
          tipoRelatorio
        }
        setTipoRelatorio={
          setTipoRelatorio
        }
        dataInicial={
          dataInicial
        }
        setDataInicial={
          setDataInicial
        }
        dataFinal={
          dataFinal
        }
        setDataFinal={
          setDataFinal
        }
        gerarRelatorio={
          buscarRelatorio
        }
      />

      {
        !relatorioGerado ? (

          <div className="
mensagem-relatorio
          ">

            Selecione os
            filtros e clique em
            {" "}
            <strong>
              Gerar Relatório
            </strong>

          </div>

        ) : (

          <>

            <RelatorioCards
              mostrarVendas={
                mostrarVendas
              }
              mostrarProdutos={
                mostrarProdutos
              }
              mostrarFiado={
                mostrarFiado
              }
              totalVendas={
                totalVendas
              }
              totalQuantidade={
                totalQuantidade
              }
              totalFiado={
                totalFiado
              }
              vendasFiado={
                vendasFiado
              }
              produtoMaisVendido={
                relatorio
                  ?.produtoMaisVendido
              }
              formatarMoeda={
                formatarMoeda
              }
            />

            {
              mostrarProdutos && (

            <RelatorioGrafico
              produtosMaisVendidos={
                relatorio?.produtosMaisVendidos || []
              }
            />
              )
            }

            <div className="
historico-relatorios
            ">

              <h2>

                {
                  mostrarFiado
                    ? "Clientes Fiado"

                    : mostrarProdutos
                    ? "Produtos Vendidos"

                    : "Vendas por Período"
                }

              </h2>

              <table>

<thead>

  <tr>

{
  mostrarVendas && (
    <>
      <th>Data</th>
      <th>Cliente</th>
      <th>Quantidade Itens</th>
      <th>Valor Total</th>
    </>
  )
}

{
  mostrarProdutos && (
    <>
      <th>Produto</th>
      <th>Quantidade Vendida</th>
    </>
  )
}

{
  mostrarFiado && (
    <>
      <th>
        Cliente
      </th>

      <th>
        Valor da Dívida
      </th>

      <th>
        Ações
      </th>
    </>
  )
}

  </tr>

</thead>

                <tbody>
{
  mostrarVendas && (

    <RelatorioTabela
      mostrarVendas={
        mostrarVendas
      }
      vendasFiltradas={
        vendas
      }
      formatarMoeda={
        formatarMoeda
      }
    />
  )
}

{
  mostrarProdutos && (

    <RelatorioProdutosTable
      mostrarProdutos={
        mostrarProdutos
      }
      produtosMaisVendidos={
        relatorio
          ?.produtosMaisVendidos || []
      }
    />
  )
}
                  {
                    mostrarFiado && (

                      <RelatorioFiadoTable
                        mostrarFiado={
                          mostrarFiado
                        }
                          vendasFiado={
                            vendasFiado
                          }
                        formatarMoeda={
                          formatarMoeda
                        }
                        atualizarRelatorio={
                          buscarRelatorio
                        }
                      />
                    )
                  }

                </tbody>

              </table>

            </div>

          </>
        )
      }

    </div>
  );
}

export default Relatorio;