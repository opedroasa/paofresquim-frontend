export default function
RelatorioProdutosTable({

  mostrarProdutos,

  produtosMaisVendidos

}) {

  if (!mostrarProdutos) {
    return null;
  }

  return (
    <>
      {
        produtosMaisVendidos.map(
          (produto, index) => (

            <tr key={index}>

              <td>
                {produto.nome}
              </td>

              <td>
                {
                  produto.quantidade
                }
              </td>

            </tr>
          )
        )
      }
    </>
  );
}