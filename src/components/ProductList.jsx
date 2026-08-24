import { useState } from "react";
import products from "../data/products";
import styles from "./ProductList.module.css";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";

function ProductList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    );
  }

  return (
    <section className={styles.productListContainer}>
      <h2>Nos Produits</h2>

      <input
        type="text"
        placeholder="Rechercher un produit"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProductFilters
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
      />

      <ProductGrid products={filteredProducts} />
    </section>
  );
}

export default ProductList;
