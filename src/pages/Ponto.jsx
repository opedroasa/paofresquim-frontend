import { useEffect, useState } from "react";
import { registrarPonto, listarRegistros } from "../services/pontoService";

function Ponto() {

    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [registros, setRegistros] = useState([]);

    const carregar = async () => {
        const data = await listarRegistros();
        setRegistros(data);
    };

    const handleRegistrar = async () => {
        try {
            await registrarPonto(cpf, senha);
            alert("Ponto registrado!");
            carregar();
        } catch (e) {
            alert("Erro ao registrar ponto");
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Registro de Ponto</h2>

            <input
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <button onClick={handleRegistrar}>
                Registrar
            </button>

            <h3>Registros</h3>
            <ul>
                {registros.map((r) => (
                    <li key={r.id}>
                        {r.nome} - {r.cpf} -{" "}
                        {new Date(r.dataHora).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Ponto;