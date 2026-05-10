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

function mascaraTelefone(valor) {
  if (!valor) return "";

  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

function mascaraCPF(valor) {
  if (!valor) return "";

  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}


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
              <th>STATUS</th>
              <th aria-label="Ações" />
            </tr>
          </thead>

          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.idCliente}>
                  <td>{cliente.nome}</td>
                  <td>{mascaraTelefone(cliente.telefone)}</td>
                  <td>{cliente.email}</td>
                  <td>{mascaraCPF(cliente.cpf)}</td>
                  <td>
                  <span
                    className={`status-badge ${
                      cliente.statusCredito === "ATIVO"
                        ? "ativo"
                        : "inativo"
                    }`}
                  >
                    {cliente.statusCredito || "INATIVO"}
                  </span>
                </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Editar ${cliente.nome}`}
                      onClick={() => onEdit(cliente)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Excluir ${cliente.nome}`}
                      onClick={() => onDelete(cliente)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state" style={{ textAlign: "center", padding: "30px" }}>
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