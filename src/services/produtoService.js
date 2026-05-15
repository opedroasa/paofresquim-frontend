import api from "./api";

export const listarProdutos = async () => {
  const response = await api.get(
    "/produto/listar"
  );

  return response.data;
};

export const criarProduto = async (data) => {
  const response = await api.post(
    "/produto/criar",
    data
  );

  return response.data;
};

export const atualizarProduto = async (
  id,
  data
) => {

  const response = await api.put(
    `/produto/${id}`,
    data
  );

  return response.data;
};

export const deletarProduto = async (id) => {

  await api.delete(`/produto/${id}`);
};