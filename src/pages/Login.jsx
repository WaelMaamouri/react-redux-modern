import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Mot de passe:", password);
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1>Connexion</h1>

        <p className={styles.subtitle}>
          Connectez-vous à votre compte ShopSphere
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>

        <p className={styles.register}>
          Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
