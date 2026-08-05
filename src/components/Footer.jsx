import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>ShopSphere</h3>

          <p>
            Votre plateforme spécialisée dans les produits technologiques
            innovants.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Navigation</h4>

          <a href="/products">Produits</a>
          <a href="/cart">Panier</a>
        </div>

        <div className={styles.column}>
          <h4>Entreprise</h4>

          <a href="/About">À propos</a>

          <a href="/contact">Contact</a>
        </div>

        <div className={styles.column}>
          <h4>Suivez-nous</h4>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>

        <div className={styles.bottom}>
          © 2026 ShopSphere - Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

export default Footer;
