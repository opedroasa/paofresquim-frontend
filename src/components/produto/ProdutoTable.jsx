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

export default function ProdutoTable({
  produtos,
  onEdit,
  onDelete
}) {
  return (
    <section>
      <div className="cliente-table-wrap">
        <table className="cliente-table">
<thead>
  <tr>
    <th>NOME</th>
    <th>CÓD.BARRAS</th>
    <th>UNIDADE</th>
    <th>PREÇO</th>
    <th>FAVORITO</th>
    <th aria-label="Ações" />
  </tr>
</thead>

          <tbody>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.codigoBarras}</td>
<td>{produto.unidadeMedida}</td>

<td>
  {Number(produto.preco).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  )}
</td>

<td>
  {produto.favorito ? "Sim" : "Não"}
</td>

                  <td className="actions-cell">
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => onEdit(produto)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => onDelete(produto)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="empty-state"
                  style={{
                    textAlign: "center",
                    padding: "30px"
                  }}
                >
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}