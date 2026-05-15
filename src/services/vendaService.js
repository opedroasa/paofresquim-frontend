import api from "./api";

export const registrarVenda = async (
  data
) => {

  const response = await api.post(
    "/venda/registrar",
    data
  );

  return response.data;
};

export const processarPagamento =
  async (data) => {

    const response = await api.post(
      "/venda/processar_pagamento",
      data
    );

    return response.data;
};