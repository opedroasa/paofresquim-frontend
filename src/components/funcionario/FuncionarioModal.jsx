export default function FuncionarioModal({
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

  if (!valor) return "";

  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function mascaraTelefone(valor) {

  if (!valor) return "";

  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

  if (!show) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={() => {
  if (!loading) {
    onClose();
  }
}}>
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
              disabled={loading}

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
            <span>Telefone</span>
            <input
              name="telefone"
              value={mascaraTelefone(formData.telefone)}
              onChange={onChange}
              required
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
            <span>Telefone Emergência</span>

            <input
              name="telefoneEmergencia"
              value={mascaraTelefone(
                formData.telefoneEmergencia
              )}
              onChange={onChange}
            />
          </label>

          <label>
            <span>Senha</span>

            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={onChange}
              required
            />
          </label>

<label>
  <span>Data Admissão</span>

  <input
    type="date"
    name="dataAdmissao"
    value={formData.dataAdmissao}
    onChange={onChange}
    required
  />
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
            <button type="submit" className="save-client-button" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}