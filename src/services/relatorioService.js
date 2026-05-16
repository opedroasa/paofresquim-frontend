import api from "./api";

export const gerarRelatorio =
  async ({
    dataInicial,
    dataFinal
  }) => {

    const response =
      await api.get(
        "/relatorios",
        {
          params: {
            dataInicial,
            dataFinal
          }
        }
      );

    return response.data;
  };

export const listarFiados =
  async () => {

    const response =
      await api.get(
        "/venda/fiado"
      );

    return response.data;
  };

export const quitarFiado =
  async (idVenda) => {

    const response =
      await api.put(
        `/venda/${idVenda}/quitar`
      );

    return response.data;
  };