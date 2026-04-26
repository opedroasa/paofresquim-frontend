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

// ATENÇÃO: Mudei aqui de 'customers' para 'clientes'
export default function ClienteTable({ clientes, onEdit, onDelete }) {
  return (
    <section>
      <div className="cliente-table-wrap">
        <table className="cliente-table">
          <thead>
            <tr>
              <th>NOME</th>
              <th>TELEFONE</th>
              <th>E-MAIL</th>
              <th>CPF</th>
              <th aria-label="Ações" />
            </tr>
          </thead>

          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.name}</td>
                  <td>{cliente.phone}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.cpf}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Editar ${cliente.name}`}
                      onClick={() => onEdit(cliente)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Excluir ${cliente.name}`}
                      onClick={() => onDelete(cliente.id)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state" style={{ textAlign: "center", padding: "30px" }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}