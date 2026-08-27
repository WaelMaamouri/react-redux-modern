import { Link } from "react-router-dom";
import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <Menu />

      <Link to="/orders" className={styles.orderButton}>
        <Button
          text="Mes commandes"
          backgroundColor="black"
          textColor="white"
        />
      </Link>
      <div className={styles.actions}>
        <Link to="/login">
          <Button text="Connexion" backgroundColor="white" textColor="black" />
        </Link>

        <Link to="/register">
          <Button
            text="Créer un compte"
            backgroundColor="black"
            textColor="white"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
