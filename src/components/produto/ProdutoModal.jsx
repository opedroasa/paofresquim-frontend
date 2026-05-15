export default function ProdutoModal({
  show,
  editing,
  formData,
  onChange,
  onClose,
  onSave,
}) {

  function mascaraMoeda(valor) {

  if (
    valor === null ||
    valor === undefined
  ) {
    return "";
  }

  valor = valor.toString();

  valor = valor.replace(/\D/g, "");

  valor = (
    Number(valor) / 100
  ).toFixed(2);

  valor = valor.replace(".", ",");

  valor = valor.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1."
  );

  return valor;
}

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
            <span>Preço</span>

<input
  name="preco"
  value={mascaraMoeda(
    formData.preco
  )}
  onChange={onChange}
  required
/>
          </label>

<label>
  <span>Unidade</span>

  <select
    name="unidadeMedida"
    value={formData.unidadeMedida}
    onChange={onChange}
    required
  >
    <option value="">
      Selecione...
    </option>

    <option value="UN">
      Unidade
    </option>

    <option value="KG">
      KG
    </option>

    <option value="G">
      Grama
    </option>

    <option value="L">
      Litro
    </option>

    <option value="ML">
      ML
    </option>
  </select>
</label>

<label>
  <span>Quantidade Atual</span>

  <input
    type="number"
    step="0.001"
    name="quantidadeAtual"
    value={formData.quantidadeAtual}
    onChange={onChange}
    required
  />
</label>

<label>
  <span>Estoque Mínimo</span>

  <input
    type="number"
    step="0.001"
    name="estoqueMinimo"
    value={formData.estoqueMinimo}
    onChange={onChange}
    required
  />
</label>

<label className="field-full">
  <span>Favorito</span>

<select
  name="favorito"
  value={String(formData.favorito)}
  onChange={onChange}
>
<option value="false">
  Não
</option>

<option value="true">
  Sim
</option>
  </select>
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