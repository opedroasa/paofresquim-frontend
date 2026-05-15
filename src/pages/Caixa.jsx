import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Caixa.css";
import { listarProdutos } from "../services/produtoService";

import ClientePDVModal
from "../components/caixa/ClientePDVModal";
import {
  listarClientes
} from "../services/clienteService";

import ProductGrid
from "../components/caixa/ProductGrid";

import CartPanel
from "../components/caixa/CartPanel";

import ConfirmSaleModal
from "../components/caixa/ConfirmSaleModal";

import CancelSaleModal
from "../components/caixa/CancelSaleModal";

import {
  registrarVenda
} from "../services/vendaService";

import TrocoModal
from "../components/caixa/TrocoModal";

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export default function Caixa() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [confirmarCancelamento,
  setConfirmarCancelamento] =
    useState(false);
  const [paymentMethod,
  setPaymentMethod] =
    useState("");
  const [quantidadeDigitada,
  setQuantidadeDigitada] =
    useState(1);

const [modalClienteAberto,
  setModalClienteAberto] =
    useState(false);
  
  useEffect(() => {
  carregarProdutos();
    carregarClientes();

}, []);

const [confirmarVenda,
  setConfirmarVenda] =
    useState(false);

    const [clientes,
  setClientes] =
    useState([]);

const [clienteSelecionado,
  setClienteSelecionado] =
    useState(null);

  const [modalTrocoAberto,
  setModalTrocoAberto] =
    useState(false);

    const [loadingVenda,
  setLoadingVenda] =
    useState(false);

    const carregarClientes =
  async () => {

    try {

      const response =
        await listarClientes();

      setClientes(response);

    } catch (error) {

      toast.error(
        "Erro ao carregar clientes"
      );
    }
  };

async function carregarProdutos() {

  try {

    const response =
      await listarProdutos();

    setProducts(response);

  } catch (error) {

    console.error(
      "Erro ao carregar produtos",
      error
    );
  }
}

function interpretarBusca(valor) {

  const texto =
    valor.trim().toLowerCase();

  let quantidade = 1;

  let busca = texto;

  if (texto.includes("*")) {

    const partes =
      texto.split("*");

    const qtd =
      parseInt(partes[0], 10);

    if (
      !isNaN(qtd) &&
      qtd > 0
    ) {

      quantidade = qtd;

      busca =
        partes[1] ?? "";
    }
  }

  return {
    quantidade,
    busca
  };
}

const filteredProducts =
  products.filter((product) => {

const {
  busca
} = interpretarBusca(query);

    if (!busca) {
      return product.favorito === true;
    }

    return (
      product.nome
        ?.toLowerCase()
        .includes(busca)
      ||
      product.codigoBarras
        ?.includes(busca)
    );
  });

const addToCart = (
  product,
  quantity = 1
) => {

  const itemExistente =
    cart.find(
      (item) =>
        item.id === product.id
    );

  const quantidadeAtual =
    itemExistente?.quantity ?? 0;

  const novaQuantidade =
    quantidadeAtual + quantity;

  const estoqueDisponivel =
    Number(
      product.quantidadeAtual ?? 0
    );

  if (
    novaQuantidade >
    estoqueDisponivel
  ) {

    alert(
      `Estoque insuficiente.
Disponível: ${estoqueDisponivel}`
    );

    return;
  }

  if (itemExistente) {

    setCart((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                novaQuantidade
            }
          : item
      )
    );

    return;
  }

  setCart((current) => [
    ...current,
    {
      ...product,
      quantity
    }
  ]);
};

const handleKeyDown = (
  event
) => {

  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  const {
    quantidade,
    busca
  } = interpretarBusca(query);

  if (!busca) {
    return;
  }

  const produto =
    products.find(
      (p) =>
        p.codigoBarras === busca
        ||
        p.nome
          ?.toLowerCase()
          === busca
    );

  if (produto) {

    addToCart(
      produto,
      quantidade
    );

    setQuery("");

    setQuantidadeDigitada(1);

  } else {

    alert(
      "Produto não encontrado!"
    );
  }
};

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.preco * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {

  function atalhosPDV(event) {

    if (event.key === "F5"   && !loadingVenda) {

  event.preventDefault();

  setConfirmarVenda(true);
}

    if (event.key === "F7") {

  event.preventDefault();

  setModalClienteAberto(true);

  return;
}

    if (event.key === "F8") {

      event.preventDefault();

      selecionarPagamento(
        "DINHEIRO"
      );
    }

if (event.key === "F9") {

  event.preventDefault();

  selecionarPagamento(
    "PIX"
  );
}

if (event.key === "F10") {

  event.preventDefault();

  selecionarPagamento(
    "DEBITO"
  );
}

if (event.key === "F11") {

  event.preventDefault();

  selecionarPagamento(
    "CREDITO"
  );
}

if (event.key === "F12") {

  event.preventDefault();

  selecionarPagamento(
    "FIADO"
  );
}

if (event.key === "Escape") {

  event.preventDefault();

  if (confirmarVenda   &&  !loadingVenda) {

    setConfirmarVenda(false);

    return;
  }

  if (confirmarCancelamento) {

    setConfirmarCancelamento(false);

    return;
  }

  if (cart.length > 0) {

    setConfirmarCancelamento(true);
  }
}

if (event.key === "Enter") {

  if (confirmarVenda) {

    event.preventDefault();

    confirmarVendaPDV();

    return;
  }

  if (confirmarCancelamento) {

    event.preventDefault();

    clearCart();

    setPaymentMethod("");

    setClienteSelecionado(null);

    setConfirmarCancelamento(false);

    toast.success(
      "Venda cancelada."
    );

    return;
  }
}
  }

  window.addEventListener(
    "keydown",
    atalhosPDV
  );

  return () => {

    window.removeEventListener(
      "keydown",
      atalhosPDV
    );
  };

}, [
  confirmarVenda,
  confirmarCancelamento,
  cart,
  paymentMethod,
  clienteSelecionado,
  loadingVenda
]);


async function confirmarVendaPDV() {

  setConfirmarVenda(false);

  if (
    paymentMethod === "DINHEIRO"
  ) {

    setModalTrocoAberto(true);

    return;
  }

  await finalizarVenda();
}

function selecionarPagamento(tipo) {

  if (
    tipo === "FIADO" &&
    !clienteSelecionado
  ) {

    alert(
      "Selecione um cliente para vendas fiado."
    );

    return;
  }

  setPaymentMethod(tipo);
}

const finalizarVenda = async () => {

  if (loadingVenda) {
  return;
}

  if (cart.length === 0) {

    alert(
      "Adicione itens no carrinho"
    );

    return;
  }

  if (!paymentMethod) {

    alert(
      "Selecione uma forma de pagamento"
    );

    return;
  }

  if (
    paymentMethod === "FIADO"
    &&
    !clienteSelecionado
  ) {

    alert(
      "Selecione um cliente para venda fiado"
    );

    return;
  }

  setLoadingVenda(true);

  try {

const payload = {

  idCliente:
    clienteSelecionado?.idCliente
    || null,

  idFuncionario: null,

  tipoPagamento:
    paymentMethod,

  products: cart.map(
    (item) => ({
      id: item.id,
      quantidade: item.quantity
    })
  )
};

    const venda =
      await registrarVenda(
        payload
      );

    alert(
      "Venda realizada com sucesso!"
    );

    setCart([]);

    setPaymentMethod("");

    setClienteSelecionado(
      null
    );

    carregarProdutos();

  } catch (error) {

    console.error(error);

    const mensagem =
      error.response?.data
      ||
      "Erro ao finalizar venda";

    alert(mensagem);
  } finally {

  setLoadingVenda(false);
}
};

return (
  <main className="caixa-page">

    <section className="caixa-products">

      <header className="caixa-header">
        <h1>Caixa (PDV)</h1>
      </header>

<label
  className="pdv-search"
  aria-label="Buscar produto"
>

  <span
    className="pdv-search-icon"
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24">
      <path d="m21 21-4.3-4.3" />
      <circle
        cx="11"
        cy="11"
        r="7"
      />
    </svg>
  </span>

  <input
    type="text"
    placeholder="
Buscar produto ou bipar código de barras...
    "
    value={query}
    onChange={(event) =>
      setQuery(
        event.target.value
      )
    }
    onKeyDown={handleKeyDown}
    autoFocus
  />

</label>

      <ProductGrid
        products={filteredProducts}
        onAdd={(product) => {

          const {
            quantidade
          } = interpretarBusca(query);

          addToCart(
            product,
            quantidade
          );

          setQuery("");
        }}
        formatCurrency={
          formatCurrency
        }
      />

    </section>

    <CartPanel
      cart={cart}
      itemCount={itemCount}
      clienteSelecionado={
        clienteSelecionado
      }
      setModalClienteAberto={
        setModalClienteAberto
      }
      removeFromCart={
        removeFromCart
      }
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
      finalizarVenda={() =>
        setConfirmarVenda(true)
      }
      formatCurrency={
        formatCurrency
      }
      loadingVenda={
  loadingVenda
}
    />

<ClientePDVModal
  show={modalClienteAberto}
  clientes={clientes}
  onClose={() =>
    setModalClienteAberto(false)
  }
  onSelect={(cliente) => {

    setClienteSelecionado(
      cliente
    );

    setModalClienteAberto(false);
  }}
/>

<ConfirmSaleModal
  show={confirmarVenda}
  onClose={() =>
    setConfirmarVenda(false)
  }
  onConfirm={
    confirmarVendaPDV
  }
/>

<CancelSaleModal
  show={
    confirmarCancelamento
  }
  onClose={() =>
    setConfirmarCancelamento(false)
  }
  onConfirm={() => {

    clearCart();

    setPaymentMethod("");

    setClienteSelecionado(null);

    setConfirmarCancelamento(false);

    toast.success(
      "Venda cancelada."
    );
  }}
/>

<TrocoModal
  show={modalTrocoAberto}
  total={total}
  onClose={() =>
    setModalTrocoAberto(false)
  }
  onConfirm={async () => {

    setModalTrocoAberto(false);

    await finalizarVenda();
  }}
/>

  </main>
);
}