import {
  useState
} from "react";

import ConfirmModal
from "../ConfirmModal";

import {
  quitarFiado
} from "../../services/relatorioService";

import {
  toast
} from "react-toastify";

export default function
RelatorioFiadoTable({

  mostrarFiado,

  vendasFiado,

  formatarMoeda,

  atualizarRelatorio

}) {

  const [
    vendaSelecionada,

    setVendaSelecionada

  ] = useState(null);

  if (!mostrarFiado) {
    return null;
  }

  const confirmarQuitacao =
    async () => {

      try {

        await quitarFiado(
          vendaSelecionada?.id
        );

        toast.success(
          "Venda quitada com sucesso."
        );

        setVendaSelecionada(
          null
        );

        atualizarRelatorio();

      } catch (error) {

        console.error(error);

        toast.error(
          "Erro ao quitar venda."
        );
      }
    };

  return (
    <>

      {
        vendasFiado.map(
          (venda) => (

            <tr key={venda.id}>

              <td>
                {
                  venda.nomeCliente
                  ||
                  "Consumidor Final"
                }
              </td>

              <td>
                {
                  formatarMoeda(
                    venda.subTotal
                  )
                }
              </td>

              <td>

                <button
                  type="button"
                  className="
btn-visualizar
                  "
                  onClick={() =>
                    setVendaSelecionada(
                      venda
                    )
                  }
                >
                  Quitar
                </button>

              </td>

            </tr>
          )
        )
      }

      <ConfirmModal
        show={
          !!vendaSelecionada
        }
        title="
Confirmar quitação
        "
        message="
Deseja quitar esta venda fiado?
        "
        confirmText="
Quitar
        "
        cancelText="
Cancelar
        "
        onClose={() =>
          setVendaSelecionada(
            null
          )
        }
        onConfirm={
          confirmarQuitacao
        }
      />

    </>
  );
}