import { useEffect, useState } from "react";
import { registrarPonto, listarRegistros } from "../services/pontoService";
import "./Ponto.css";

function Ponto() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [registros, setRegistros] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const carregar = async () => {
    try {
      const response = await listarRegistros();
      setRegistros(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
      setRegistros([]);
    }
  };

  const handleRegistrar = async () => {
    try {
      await registrarPonto(cpf, senha);
      setMensagem("Ponto registrado com sucesso.");
      setCpf("");
      setSenha("");
      await carregar();
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      setMensagem("Erro ao registrar ponto.");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <section className="ponto-page">
      <header className="ponto-header">
        <h1>Registro de Ponto</h1>
        <p>Registre o acesso do funcionário e acompanhe os lançamentos realizados.</p>
      </header>

      <div className="ponto-grid">
        <div className="ponto-card">
          <h2>Registrar ponto</h2>

          <div className="ponto-form">
            <div className="ponto-field">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                placeholder="Digite o CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>

            <div className="ponto-field">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite a senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button className="ponto-button" onClick={handleRegistrar}>
              Registrar
            </button>
          </div>

          {mensagem && <p className="ponto-message">{mensagem}</p>}
        </div>

        <div className="ponto-card ponto-card-info">
          <h2>Resumo</h2>
          <div className="ponto-summary">
            <div className="ponto-summary-box">
              <span>Total de registros</span>
              <strong>{registros.length}</strong>
            </div>

            <div className="ponto-summary-box">
              <span>Última atualização</span>
              <strong>
                {registros.length > 0
                  ? new Date(registros[0].dataHora).toLocaleString("pt-BR")
                  : "Sem registros"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="ponto-card">
        <div className="ponto-table-header">
          <h2>Histórico de registros</h2>
        </div>

        {registros.length === 0 ? (
          <div className="ponto-empty">
            <p>Nenhum registro encontrado.</p>
          </div>
        ) : (
          <div className="ponto-table-wrapper">
            <table className="ponto-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Data e Hora</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.nome}</td>
                    <td>{registro.cpf}</td>
                    <td>{new Date(registro.dataHora).toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Ponto;