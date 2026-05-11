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

export default function FuncionarioTable({ funcionarios, onEdit, onDelete }) {
  return (
    <section>
      <div className="funcionario-table-wrap">
        <table className="funcionario-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>TELEFONE</th>
            <th>CPF</th>
            <th>ADMISSÃO</th>
            <th aria-label="Ações" />
          </tr>
        </thead>

        <tbody>
          {funcionarios.length > 0 ? (
            funcionarios.map((funcionario) => (
              <tr key={funcionario.idFuncionario}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.dataAdmissao}</td>

                <td className="actions-cell">

                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => onEdit(funcionario)}
                  >
                    <PencilIcon />
                  </button>

                  <button
                    type="button"
                    className="icon-button"
                    onClick={() =>
                      onDelete(funcionario)
                    }
                  >
                    <TrashIcon />
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="empty-state"
                style={{
                  textAlign: "center",
                  padding: "30px"
                }}
              >
                Nenhum funcionário encontrado.
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </section>
  );
}