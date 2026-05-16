export default function RelatorioGrafico({
  produtosMaisVendidos
}) {

  if (
    !produtosMaisVendidos ||
    produtosMaisVendidos.length === 0
  ) {

    return (
      <div className="sem-dados">
        Nenhum produto vendido no período.
      </div>
    );
  }

  const maiorQuantidade = Math.max(
    ...produtosMaisVendidos.map(
      (produto) => produto.quantidade
    )
  );

  return (

    <div className="grafico-area">

      <div className="grafico-header">

        <h2>
          Produtos vendidos
        </h2>

        <p>
          Quantidade vendida por produto.
        </p>

      </div>

      <div className="grafico-horizontal">

        {
          produtosMaisVendidos.map(
            (produto, index) => {

              const largura = (
                produto.quantidade /
                maiorQuantidade
              ) * 100;

              return (

                <div
                  className="grafico-linha"
                  key={index}
                >

                  <div className="grafico-info">

                    <strong>
                      {produto.nome}
                    </strong>

                    <span>
                      {produto.quantidade} un.
                    </span>

                  </div>

                  <div className="
grafico-barra-fundo
                  ">

                    <div
                      className="
grafico-barra-preenchida
                      "
                      style={{
                        width: `${largura}%`
                      }}
                    />

                  </div>

                </div>
              );
            }
          )
        }

      </div>

    </div>
  );
}