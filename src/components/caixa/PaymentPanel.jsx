export default function PaymentPanel({
  paymentMethod,
  selecionarPagamento,
  setConfirmarCancelamento,
  total,
  formatCurrency,
  finalizarVenda,
    loadingVenda

}) {

  return (

    <div className="payment-panel">

      <div className="payment-grid">

        <button
          type="button"
          className={
            paymentMethod === "DINHEIRO"
              ? "payment-active"
              : ""
          }
          onClick={() =>
            selecionarPagamento(
              "DINHEIRO"
            )
          }
        >
          F8 • Dinheiro
        </button>

        <button
          type="button"
          className={
            paymentMethod === "PIX"
              ? "payment-active"
              : ""
          }
          onClick={() =>
            selecionarPagamento(
              "PIX"
            )
          }
        >
          F9 • Pix
        </button>

        <button
          type="button"
          className={
            paymentMethod === "DEBITO"
              ? "payment-active"
              : ""
          }
          onClick={() =>
            selecionarPagamento(
              "DEBITO"
            )
          }
        >
          F10 • Débito
        </button>

        <button
          type="button"
          className={
            paymentMethod === "CREDITO"
              ? "payment-active"
              : ""
          }
          onClick={() =>
            selecionarPagamento(
              "CREDITO"
            )
          }
        >
          F11 • Crédito
        </button>

        <button
          type="button"
          className={
            paymentMethod === "FIADO"
              ? "payment-active"
              : ""
          }
          onClick={() =>
            selecionarPagamento(
              "FIADO"
            )
          }
        >
          F12 • Fiado
        </button>

        <button
          type="button"
          className="
cancel-payment-button
          "
          onClick={() =>
            setConfirmarCancelamento(
              true
            )
          }
        >
          ESC • Cancelar
        </button>

      </div>

      <div className="cart-total">

        <span>
          Total
        </span>

        <strong>
          {
            formatCurrency(total)
          }
        </strong>

      </div>

      <button
        type="button"
        className="
finish-sale-button
        "
        onClick={finalizarVenda}
      >
        {
  loadingVenda
    ? "Processando venda..."
    : "F5 • Finalizar Venda"
}
      </button>

    </div>
  );
}