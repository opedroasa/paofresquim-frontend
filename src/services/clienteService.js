import api from "./api";

export const listarClientes = async () => {
  const response = await api.get("/clientes");
  return response.data;
};

export const criarCliente = async (cliente) => {
  const response = await api.post("/clientes", cliente);
  return response.data;
};

export const atualizarCliente = async (cliente) => {
  const response = await api.put("/clientes", cliente);
  return response.data;
};

export const deletarCliente = async (id) => {
  await api.delete(`/clientes/${id}`);
};