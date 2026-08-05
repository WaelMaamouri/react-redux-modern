import Hero from "../components/Hero";
import styles from "./Home.module.css";

function Home() {
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

      <section className={styles.values}>
        <div>
          🚀
          <h3>Innovation</h3>
          <p>des produits modernes adaptés aux besoins actuels.</p>
        </div>

        <div>
          ⭐<h3>Qualité</h3>
          <p>Une sélection rigoureuse de nos produits.</p>
        </div>

        <div>
          🕒
          <h3>Service</h3>
          <p>Un support client réactif et professionnel.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
