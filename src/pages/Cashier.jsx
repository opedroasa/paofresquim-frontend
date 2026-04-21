import { useState } from "react";

const categories = ["Todos", "Paes", "Bolos", "Doces", "Salgados", "Bebidas", "Frios"];

const products = [
  { id: 1, name: "Pão de Queijo", category: "Paes", price: 0.5 },
  { id: 2, name: "Pão Francês", category: "Paes", price: 0.25 },
  { id: 3, name: "Bolo de Chocolate", category: "Bolos", price: 4.5 },
  { id: 4, name: "Brigadeiro", category: "Doces", price: 1 },
  { id: 5, name: "Coxinha", category: "Salgados", price: 3.5 },
  { id: 6, name: "Mussarela", category: "Frios", price: 30 }
];

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" role="presentation">
      <path d="M3 5h2l2.1 9.2a1 1 0 0 0 .98.8H18a1 1 0 0 0 .96-.73L21 7H7" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export default function Cashier() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="cashier-page">
      <section className="cashier-products">
        <header className="cashier-header">
          <h1>Caixa (PDV)</h1>
        </header>

        <label className="pdv-search" aria-label="Buscar produto">
          <span className="pdv-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
            </svg>
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar produto..."
            type="search"
          />
        </label>

        <div className="pdv-filter-list" aria-label="Categorias">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`pdv-filter${selectedCategory === category ? " is-selected" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              className="product-card"
              onClick={() => addToCart(product)}
            >
              <strong>{product.name}</strong>
              <span>{product.category}</span>
              <em>{formatCurrency(product.price)}</em>
            </button>
          ))}
        </div>
      </section>

      <aside className="cart-panel">
        <header className="cart-header">
          <div className="cart-title">
            <span className="cart-title-icon" aria-hidden="true">
              <CartIcon />
            </span>
            <h2>Carrinho</h2>
          </div>
          <span>{itemCount} Itens</span>
        </header>

        <div className={`cart-body${cart.length ? " has-items" : ""}`}>
          {cart.length === 0 ? (
            <p>Adicione produtos ao carrinho</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    {item.quantity} x {formatCurrency(item.price)}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <b>{formatCurrency(item.price * item.quantity)}</b>
                  <button
                    type="button"
                    className="remove-cart-item"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="payment-panel">
          {cart.length > 0 && (
            <button type="button" className="cancel-sale-button" onClick={clearCart}>
              Cancelar Venda
            </button>
          )}

          <div className="payment-grid">
            <button type="button">Dinheiro</button>
            <button type="button">Pix</button>
            <button type="button">Débito</button>
            <button type="button">Crédito</button>
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <button type="button" className="finish-sale-button">
            Finalizar Venda
          </button>
        </div>
      </aside>
    </main>
  );
}
