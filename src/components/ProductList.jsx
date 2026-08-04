import { useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";
import styles from "./ProductList.module.css";

function ProductList() {

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");

    let filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
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
        filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    return (
        <section>
            <h2>Nos Produits</h2>

            <input
                type="text"
                placeholder="Rechercher un produit"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value=""></option>
                <option value="price-asc">Prix: Croissant</option>
                <option value="price-desc">Prix: Décroissant</option>
                <option value="name-asc">Nom: A-Z</option>
                <option value="name-desc">Nom: Z-A</option>
            </select>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Toutes les catégories</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Ordinateur">Ordinateur</option>
                <option value="Audio">Audio</option>
            </select>
            <div className={styles.productList}>
            
            {filteredProducts.map((product) => (
                <ProductCard 
                    key={product.id}
                    product={product}
                />
            ))}
            
            </div>
        </section>
    )
}

export default ProductList;
