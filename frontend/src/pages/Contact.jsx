import styles from "./Contact.module.css";

function Contact() {
  return (
    <main className={styles.contact}>
      <h1>Contactez-nous</h1>

      <form>
        <input type="text" placeholder="Votre nom" />

        <input type="email" placeholder="Votre email" />

        <textarea placeholder="Votre message" />

        <button>Envoyer</button>
      </form>
    </main>
  );
}

export default Contact;
