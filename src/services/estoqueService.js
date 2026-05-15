import api from "./api";

export const criarEstoque = async (data) => {

  const response = await api.post(
    "/estoque/criar",
    data
  );

  return response.data;
};

export const atualizarEstoque = async (
  id,
  data
) => {

  const response = await api.put(
    `/estoque/${id}`,
    data
  );

  return response.data;
};

export const buscarEstoqueProduto =
  async (produtoId) => {

    const response = await api.get(
      `/estoque/produto/${produtoId}`
    );

    return response.data;
};