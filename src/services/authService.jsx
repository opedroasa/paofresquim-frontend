import api from "./api";

export const registrarUsuario = async (data) => {
  const response = await api.post("/usuarios/registrar", data);
  return response;
};

export const login = async (email, senha) => {
  return await api.post("/usuarios/login", {
    email,
    senha
  });
};