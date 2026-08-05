import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <Menu />

      <div className={styles.actions}>
        <Button text="Connexion" color="black" />

        <Button text="Créer un compte" color="black" />
      </div>
    </header>
  );
}

export default Header;
