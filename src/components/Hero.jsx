import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>L'avenir du shopping</h1>

        <p>Des produits pensés pour améliorer votre quotidien.</p>

        <button>Découvrir la collection</button>
      </div>

      <div className={styles.image}>
        <img src="./images/Produit ShopSphere.png" alt="Produit ShopSphere" />
      </div>
    </section>
  );
}

export default Hero;
