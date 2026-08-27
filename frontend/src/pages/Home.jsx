import Hero from "../components/Hero";
import styles from "./Home.module.css";
import { getProducts } from "../services/productService";
import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const productsPromotion = products.filter((product) => product.promotion > 0);

  return (
    <main>
      <Hero />

      <section className={styles.about}>
        <h2>À propos de ShopSphere</h2>

        <p>
          ShopSphere est une entreprise spécialisée dans la vente de produits
          technologiques innovants et accessibles. Nous sélectionnons des
          produits de qualité pour accompagner nos clients au quotidien.
        </p>
      </section>

      <section className={styles.products}>
        <h2>Produits en promotion</h2>

        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <ProductGrid products={productsPromotion} />
        )}

        <Link to="/products" className={styles.button}>
          Voir tous les produits
        </Link>
      </section>

      <section className={styles.values}>
        <div className={styles.card}>
          <span>🚀</span>
          <h3>Innovation</h3>
          <p>des produits modernes adaptés aux besoins actuels.</p>
        </div>

        <div className={styles.card}>
          <span>⭐</span>
          <h3>Qualité</h3>
          <p>Une sélection rigoureuse de nos produits.</p>
        </div>

        <div className={styles.card}>
          <span>🚚</span>
          <h3>Livraison</h3>
          <p>Une expedition efficace pour satisfaire nos clients.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
