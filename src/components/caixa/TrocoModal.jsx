import { useMemo, useState } from "react";

export default function TrocoModal({
  show,
  total,
  onClose,
  onConfirm
}) {

  const [valorRecebido,
    setValorRecebido] =
      useState("");

  const troco = useMemo(() => {

    const recebido =
      Number(
        valorRecebido
          .replace(",", ".")
      );

    if (
      isNaN(recebido)
    ) {
      return 0;
    }

    return recebido - total;

  }, [
    valorRecebido,
    total
  ]);

  if (!show) {
    return null;
  }

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="confirm-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="confirm-header">

          <h2>
            Pagamento em Dinheiro
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            x
          </button>

        </div>

        <div className="confirm-body">

          <p>

            Total da venda:

            <strong>
              {" "}
              {
                total.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL"
                  }
                )
              }
            </strong>

          </p>

          <input
            type="text"
            placeholder="
Valor recebido
            "
            value={valorRecebido}
            onChange={(event) =>
              setValorRecebido(
                event.target.value
              )
            }
            className="
troco-input
            "
            autoFocus
          />

          <div className="
troco-resultado
          ">

            Troco:

            <strong>

              {
                troco.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL"
                  }
                )
              }

            </strong>

          </div>

        </div>

        <div className="
confirm-actions
        ">

          <button
            type="button"
            className="
cancel-button
            "
            onClick={onClose}
          >
            ESC • Cancelar
          </button>

<button
  type="button"
  className="
confirm-button
  "
  disabled={troco < 0}
  onClick={() =>
    onConfirm()
  }
>
  ENTER • Confirmar
</button>

        </div>

      </div>

    </div>
  );
}