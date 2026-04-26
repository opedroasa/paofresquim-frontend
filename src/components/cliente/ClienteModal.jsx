// ATENÇÃO: Nome da função atualizado para ClienteModal
export default function ClienteModal({
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
        aria-labelledby="cliente-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="cliente-modal-title">
            {editing ? "Editar Cliente" : "Novo Cliente"}
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

        <form className="cliente-form" onSubmit={onSave}>
          <label className="field-full">
            <span>Nome</span>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>Telefone</span>
            <input
              name="phone"
              value={formData.phone}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>CPF</span>
            <input
              name="cpf"
              value={formData.cpf}
              onChange={onChange}
              required
            />
          </label>

          <label className="field-full">
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
            <span>Endereço</span>
            <input
              name="address"
              value={formData.address}
              onChange={onChange}
            />
          </label>

          <label className="field-full">
            <span>Observações</span>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onChange}
              rows="3"
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