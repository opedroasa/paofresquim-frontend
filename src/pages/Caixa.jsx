import { useState } from "react";
import "./Caixa.css";

const categories = ["Todos", "Paes", "Bolos", "Doces", "Salgados", "Bebidas", "Frios"];

const products = [
  { id: 1, barcode: "78910", name: "Pão de Queijo", category: "Paes", price: 0.5, favorite: true },
  { id: 2, barcode: "78911", name: "Pão Francês", category: "Paes", price: 0.25, favorite: true },
  { id: 3, barcode: "78912", name: "Bolo de Chocolate", category: "Bolos", price: 4.5, favorite: false },
  { id: 4, barcode: "78913", name: "Brigadeiro", category: "Doces", price: 1, favorite: true },
  { id: 5, barcode: "78914", name: "Coxinha", category: "Salgados", price: 3.5, favorite: true },
  { id: 6, barcode: "78915", name: "Mussarela", category: "Frios", price: 30, favorite: false }
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

export default function Caixa() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter((product) => {
    if (query.trim() === "" && selectedCategory === "Todos") {
      return product.favorite;
    }

    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    
    const matchesSearch = 
      product.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      product.barcode === query.trim();

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product, qty = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }

      return [...current, { ...product, quantity: qty }];
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      
      const searchStr = query.trim().toLowerCase();
      if (!searchStr) return;

      let qty = 1;
      let code = searchStr;

      if (searchStr.includes("x")) {
        const parts = searchStr.split("x");
        const parsedQty = parseInt(parts[0], 10);
        if (!isNaN(parsedQty) && parsedQty > 0) {
          qty = parsedQty;
          code = parts[1];
        }
      }

      const product = products.find(p => p.barcode === code || p.name.toLowerCase() === code);

      if (product) {
        addToCart(product, qty);
        setQuery("");
      } else {
        alert("Produto não encontrado!");
      }
    }
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
    <main className="caixa-page">
      <section className="caixa-products">
        <header className="caixa-header">
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
            onKeyDown={handleKeyDown}
            placeholder="Buscar produto ou bipar código de barras..."
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