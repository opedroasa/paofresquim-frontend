import PaymentPanel
from "./PaymentPanel";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation">
      <path d="M3 5h2l2.1 9.2a1 1 0 0 0 .98.8H18a1 1 0 0 0 .96-.73L21 7H7" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export default function CartPanel({
  cart,
  itemCount,
  clienteSelecionado,
  setModalClienteAberto,
  removeFromCart,
  paymentMethod,
  selecionarPagamento,
  setConfirmarCancelamento,
  total,
  finalizarVenda,
  loadingVenda
}) {

  return (
    <aside className="cart-panel">

      <header className="cart-header">

        <div className="cart-header-top">

          <div className="cart-title">

            <span
              className="cart-title-icon"
              aria-hidden="true"
            >
              <CartIcon />
            </span>

            <h2>
              Carrinho
            </h2>

          </div>

          <span className="cart-items-count">
            {itemCount} itens
          </span>

        </div>

        <button
          type="button"
          className="
select-client-button
          "
          onClick={() =>
            setModalClienteAberto(true)
          }
        >

          {
            clienteSelecionado
              ? clienteSelecionado.nome
              : "F7 • Selecionar Cliente"
          }

        </button>

      </header>

      <div className={`cart-body${cart.length ? " has-items" : ""}`}>

        {cart.length === 0 ? (

          <p>
            Adicione produtos ao carrinho
          </p>

        ) : (

          cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <div>

                <strong>
                  {item.nome}
                </strong>

                <span>
                  {item.quantity}
                  {" "}x{" "}
                  {
                    formatCurrency(
                      item.preco
                    )
                  }
                </span>

              </div>

              <div className="cart-item-actions">

                <b>
                  {
                    formatCurrency(
                      item.preco *
                      item.quantity
                    )
                  }
                </b>

                <button
                  type="button"
                  className="
remove-cart-item
                  "
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Excluir
                </button>

              </div>

            </div>
          ))
        )}
      </div>

      <PaymentPanel
  paymentMethod={
    paymentMethod
  }
  selecionarPagamento={
    selecionarPagamento
  }
  setConfirmarCancelamento={
    setConfirmarCancelamento
  }
  total={total}
  formatCurrency={
    formatCurrency
  }
  finalizarVenda={
    finalizarVenda
  }
    loadingVenda={
    loadingVenda
  }
/>

    </aside>
  );
}