import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  onAdd,
  formatCurrency
}) {

  return (

    <div className="product-grid">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          formatCurrency={formatCurrency}
        />

      ))}

    </div>
  );
}