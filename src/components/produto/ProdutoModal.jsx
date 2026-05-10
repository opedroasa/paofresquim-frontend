export default function ProdutoModal({
  show,
  editing,
  formData,
  onChange,
  onClose,
  onSave,
}) {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-form"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>
            {editing
              ? "Editar Produto"
              : "Novo Produto"}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form
          className="cliente-form"
          onSubmit={onSave}
        >
          <label className="field-full">
            <span>Nome do Produto</span>

            <input
              name="nome"
              value={formData.nome}
              onChange={onChange}
              required
            />
          </label>

          <label className="field-full">
            <span>Código de Barras</span>

            <input
              name="codigoBarras"
              value={formData.codigoBarras}
              onChange={onChange}
              required
            />
          </label>

          <label>
            <span>Categoria</span>

            <select
              name="categoria"
              value={formData.categoria}
              onChange={onChange}
              required
            >
              <option value="">
                Selecione...
              </option>

              <option value="Pães">
                Pães
              </option>

              <option value="Doce">
                Doce
              </option>

              <option value="Frios">
                Frios
              </option>

              <option value="Bolo">
                Bolo
              </option>

              <option value="Salgado">
                Salgado
              </option>
            </select>
          </label>

          <label>
            <span>Preço</span>

            <input
              name="preco"
              value={formData.preco}
              onChange={onChange}
              required
            />
          </label>

          <label className="field-full">
            <span>Estoque</span>

            <input
              type="number"
              name="estoque"
              value={formData.estoque}
              onChange={onChange}
              required
            />
          </label>

          <div className="modal-actions">
            <button
              type="submit"
              className="save-client-button"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}