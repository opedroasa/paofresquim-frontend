export default function ProductCard({
  product,
  onAdd,
  formatCurrency
}) {

  const semEstoque =
    Number(product.quantidadeAtual) <= 0;

  return (

<button
  type="button"
  className={`
    product-card
    ${semEstoque ? "sem-estoque" : ""}
  `}
  disabled={semEstoque}
  onClick={() => onAdd(product)}
>

<strong>
  {product.nome}
</strong>

<div>
  Cód: {product.codigoBarras}
</div>

<div>
  Estoque:
  {product.quantidadeAtual}
</div>

{
  semEstoque && (
    <span className="badge-sem-estoque">
      Sem estoque
    </span>
  )
}

<div className="product-price">
  {
    formatCurrency(product.preco)
  }
</div>

</button>
  );
}