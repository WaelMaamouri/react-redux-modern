import { Link } from "react-router-dom";
import { FaShoppingCart, FaProductHunt } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "./cartContext";
import styles from "./Menu.module.css";

function Menu() {
  const { cart } = useContext(CartContext);

  return (
    <nav className={styles.menu}>
      <Link to="/products" className={styles.link}>
        <FaProductHunt />
        Produits
      </Link>

      <Link to="/cart" className={styles.link}>
        <FaShoppingCart />
        Panier ({cart.length})
      </Link>
    </nav>
  );
}

export default Menu;
