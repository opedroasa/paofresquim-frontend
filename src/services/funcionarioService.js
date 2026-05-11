import api from "./api";

export const listarFuncionarios = async () => {
  const response = await api.get("/funcionarios");
  return response.data;
};

export const criarFuncionario = async (data) => {
  const response = await api.post(
    "/funcionarios",
    data
  );

  return response.data;
};

export const atualizarFuncionario = async (data) => {
  const response = await api.put(
    "/funcionarios",
    data
  );

  return response.data;
};

export const deletarFuncionario = async (id) => {
  await api.delete(`/funcionarios/${id}`);
};