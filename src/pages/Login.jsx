import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Login.css";
import logo from "../assets/logo-pao-fresquim.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

      if (email === "admin@gmail.com" && senha === "admin") {
    navigate("/app");
    return;
    }

    try {
      await login(email, senha);
      navigate("/app");
    } catch (error) {
      alert("Email ou senha inválidos");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <img src={logo} alt="Logo" className="login-logo" />

        <h2>LOGIN</h2>

        <button className="google-btn">
          Continue com Google (Em breve)
        </button>

        <div className="divider">ou</div>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Esqueceu a senha</a>
          <a href="#">Criar conta</a>
        </div>

      </div>
    </div>
  );
}