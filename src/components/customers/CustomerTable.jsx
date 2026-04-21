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

export default function CustomerTable({ customers, onEdit, onDelete }) {
  return (
    <section className="customer-card">
      <div className="customer-table-wrap">
        <table className="customer-table">
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
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.cpf}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Editar ${customer.name}`}
                      onClick={() => onEdit(customer)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Excluir ${customer.name}`}
                      onClick={() => onDelete(customer.id)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
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
