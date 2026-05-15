import { useMemo, useState } from "react";

export default function ClientePDVModal({
  show,
  clientes,
  onClose,
  onSelect
}) {

  const [busca, setBusca] =
    useState("");

  const clientesFiltrados =
    useMemo(() => {

      const termo =
        busca.toLowerCase();

      return clientes.filter(
        (cliente) => {

          return (
            cliente.nome
              ?.toLowerCase()
              .includes(termo) ||

            cliente.cpf
              ?.includes(termo) ||

            cliente.telefone
              ?.includes(termo)
          );
        }
      );
    }, [clientes, busca]);

  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="confirm-modal cliente-pdv-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="confirm-header">
          <h2>
            Selecionar Cliente
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <input
          type="text"
          placeholder="
Buscar por nome, CPF ou telefone...
          "
          className="cliente-pdv-search"
          value={busca}
          onChange={(event) =>
            setBusca(event.target.value)
          }
          autoFocus
        />

        <div className="cliente-pdv-list">
          {clientesFiltrados.map(
            (cliente) => (

              <button
                key={cliente.idCliente}
                type="button"
                className="
cliente-pdv-item
                "
                onClick={() =>
                  onSelect(cliente)
                }
              >

<strong>
  {cliente.nome}
</strong>

<div className="cliente-pdv-info">

  <span>
    CPF: {cliente.cpf}
  </span>

  <span>
    Telefone:
    {" "}
    {cliente.telefone}
  </span>

</div>

              </button>
            )
          )}

          {clientesFiltrados.length === 0 && (
            <div
              className="
cliente-pdv-empty
              "
            >
              Nenhum cliente encontrado.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}