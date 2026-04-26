export default function FuncionarioModal({
  show,
  onClose,
  onSave,
  onChange,
  formData,
  editing
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="funcionario-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="funcionario-modal-title">
            {editing ? "Editar Funcionário" : "Novo Funcionário"}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            x
          </button>
        </div>

        <form className="funcionario-form" onSubmit={onSave}>
          <label className="field-full">
            <span>Nome</span>
            <input
              name="nome"
              value={formData.nome}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>Cargo</span>
            <select
              name="cargo"
              value={formData.cargo}
              onChange={onChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Gerente">Gerente</option>
              <option value="Padeiro">Padeiro</option>
              <option value="Caixa">Caixa</option>
              <option value="Atendente">Atendente</option>
            </select>
          </label>

          <label>
            <span>Salário</span>
            <input
              type="number"
              step="0.01"
              name="salario"
              value={formData.salario}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>Telefone</span>
            <input
              name="telefone"
              value={formData.telefone}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </label>

          <label className="field-full">
            <span>Data de Admissão</span>
            <input
              type="date"
              name="dataAdmissao"
              value={formData.dataAdmissao}
              onChange={onChange}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="submit" className="save-client-button">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}