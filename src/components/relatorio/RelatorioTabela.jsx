export default function RelatorioTabela({
  mostrarVendas,
  vendasFiltradas,
  formatarMoeda
}) {

  if (!mostrarVendas) {
    return null;
  }

  return (
    <>
      {
        vendasFiltradas.map((item) => (

          <tr key={item.idVenda}>

            <td>
              {
                new Date(
                  item.dataVenda
                ).toLocaleDateString(
                  "pt-BR"
                )
              }
            </td>

            <td>
              {
                item.nomeCliente
              }
            </td>

            <td>
              {
                item.quantidadeItens
              }
            </td>

            <td>
              {
                formatarMoeda(
                  item.valorTotal
                )
              }
            </td>

          </tr>
        ))
      }
    </>
  );
}