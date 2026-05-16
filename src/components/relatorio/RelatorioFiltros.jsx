export default function RelatorioFiltros({
  tipoRelatorio,
  setTipoRelatorio,
  dataInicial,
  setDataInicial,
  dataFinal,
  setDataFinal,
  gerarRelatorio
}) {

  const mostrarDatas =
    tipoRelatorio === "vendas"
    ||
    tipoRelatorio === "produto";

  return (

    <div className="
filtros-relatorio
    ">

      <div className="campo">

        <label>
          Tipo de relatório
        </label>

        <select
          value={tipoRelatorio}
          onChange={(e) =>
            setTipoRelatorio(
              e.target.value
            )
          }
        >

          <option value="vendas">
            Vendas por período
          </option>

          <option value="produto">
            Vendas por produto
          </option>

          <option value="fiado">
            Clientes fiado
          </option>

        </select>

      </div>

      {
        mostrarDatas && (
          <>
            <div className="campo">

              <label>
                Data inicial
              </label>

              <input
                type="date"
                value={dataInicial}
                onChange={(e) =>
                  setDataInicial(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="campo">

              <label>
                Data final
              </label>

              <input
                type="date"
                value={dataFinal}
                onChange={(e) =>
                  setDataFinal(
                    e.target.value
                  )
                }
              />

            </div>
          </>
        )
      }

      <div className="campo">

        <button
          type="button"
          className="
btn-filtrar
          "
          onClick={
            gerarRelatorio
          }
        >
          Gerar Relatório
        </button>

      </div>

    </div>
  );
}