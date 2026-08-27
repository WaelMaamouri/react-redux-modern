import styles from "./About.module.css";

function About() {
  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <h1>À propos de ShopSphere</h1>

        <p>
          ShopSphere est une entreprise spécialisée dans la vente de produits
          technologiques innovants et accessibles. Nous sélectionnons des
          produits de qualité pour accompagner nos clients au quotidien.
        </p>
      </section>

      <section className={styles.content}>
        <div>
          <h2>Notre mission</h2>

          <p>
            Notre objectif est de proposer une expérience d'achat unique, en
            mettant l'accent sur la qualité, l'innovation et le service client.
            Nous nous engageons à offrir des produits qui répondent aux besoins
            de nos clients et à les accompagner dans leur quotidien.
          </p>
        </div>

        <div>
          <h2>Nos valeurs</h2>

          <p>
            Nous croyons en l'importance de l'innovation, de la qualité et du
            service. Nous sélectionnons rigoureusement nos produits pour
            garantir leur fiabilité et leur performance. Notre équipe est dédiée
            à fournir un support client réactif et professionnel, afin d'assurer
            la satisfaction de nos clients.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
