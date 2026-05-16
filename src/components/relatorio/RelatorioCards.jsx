export default function RelatorioCards({

  mostrarVendas,

  mostrarProdutos,

  mostrarFiado,

  totalVendas,

  totalQuantidade,

  totalFiado,

  produtoMaisVendido,

  vendasFiado,

  formatarMoeda

}) {

  return (

    <div className="
cards-relatorio
    ">

      {
        mostrarVendas && (

          <div className="
card-relatorio
          ">

            <span className="
icone-card
            ">
              🛒
            </span>

            <h3>
              Total de Vendas
            </h3>

            <p>
              Vendas realizadas no período.
            </p>

            <strong>
              {
                formatarMoeda(
                  totalVendas
                )
              }
            </strong>

            <small>
              {
                totalQuantidade
              }
              {" "}
              itens vendidos
            </small>

          </div>
        )
      }

      {
        mostrarFiado && (

          <div className="
card-relatorio
          ">

            <span className="
icone-card
            ">
              📒
            </span>

            <h3>
              Vendas Fiado
            </h3>

            <p>
              Valores pendentes de pagamento.
            </p>

            <strong>
              {
                formatarMoeda(
                  totalFiado
                )
              }
            </strong>

            <small>
              {
                vendasFiado.length
              }
              {" "}
              vendas pendentes
            </small>

          </div>
        )
      }

    </div>
  );
}