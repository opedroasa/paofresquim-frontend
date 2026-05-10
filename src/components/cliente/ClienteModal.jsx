// ATENÇÃO: Nome da função atualizado para ClienteModal
export default function ClienteModal({
  show,
  onClose,
  onSave,
  onChange,
  formData,
  editing,
loading
}) {

  const estadosBrasil = [
    "AC","AL","AP","AM","BA","CE","DF","ES",
    "GO","MA","MT","MS","MG","PA","PB","PR",
    "PE","PI","RJ","RN","RS","RO","RR","SC",
    "SP","SE","TO"
  ];

  function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function mascaraTelefone(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

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
      name="nome"
      value={formData.nome}
      onChange={onChange}
      required
    />
  </label>

  <label>
    <span>Telefone</span>

<input
  name="telefone"
  value={mascaraTelefone(formData.telefone)}
  onChange={onChange}
/>
  </label>

  <label>
    <span>CPF</span>

<input
  name="cpf"
  value={mascaraCPF(formData.cpf)}
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
    />
  </label>

  <label>
    <span>Data Nascimento</span>

    <input
      type="date"
      name="dataNascimento"
      value={formData.dataNascimento}
      onChange={onChange}
      required
    />
  </label>

  <label>
    <span>Status Crédito</span>

<select
  name="statusCredito"
  value={formData.statusCredito}
  onChange={onChange}
>
  <option value="">
    Selecione...
  </option>

  <option value="ATIVO">
    ATIVO
  </option>

  <option value="INATIVO">
    INATIVO
  </option>
</select>
  </label>

  <label className="field-full">
    <span>Logradouro</span>

    <input
      name="endereco.logradouro"
      value={formData.endereco.logradouro}
      onChange={onChange}
      required
    />
  </label>

  <label>
    <span>Número</span>

    <input
      name="endereco.numero"
      value={formData.endereco.numero}
      onChange={onChange}
      required
    />
  </label>

  <label>
    <span>Cidade</span>

    <input
      name="endereco.cidade"
      value={formData.endereco.cidade}
      onChange={onChange}
      required
    />
  </label>

  <label>
    <span>UF</span>

<select
  name="endereco.uf"
  value={formData.endereco.uf}
  onChange={onChange}
  required
>
  <option value="">
    UF
  </option>

  {estadosBrasil.map((uf) => (
    <option key={uf} value={uf}>
      {uf}
    </option>
  ))}
</select>
  </label>

  <label>
    <span>País</span>

    <input
      name="endereco.pais"
      value={formData.endereco.pais}
      onChange={onChange}
      required
    />
  </label>

  <div className="modal-actions">
<button
  type="submit"
  className="save-client-button"
  disabled={loading}
>
  {loading ? "Salvando..." : "Salvar"}
</button>
  </div>
</form>
      </div>
    </div>
  );
}