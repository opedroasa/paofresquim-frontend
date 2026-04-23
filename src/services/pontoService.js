import api from "./api";

export const registrarPonto = async (cpf, senha) => {
  return await api.post("/ponto/login", { cpf, senha });
};

export const listarRegistros = async () => {
  return await api.get("/ponto");
};