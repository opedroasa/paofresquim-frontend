import api from "./api";

export const registrarPonto = async (cpf, senha) => {
    const response = await api.post("/ponto/login", {
        cpf,
        senha
    });
    return response.data;
};

export const listarRegistros = async () => {
    const response = await api.get("/ponto");
    return response.data;
};