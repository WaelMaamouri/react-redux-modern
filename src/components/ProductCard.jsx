import styles from "./ProductCard.module.css";
import { useContext } from "react";
import CartContext from "./cartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <article className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />

      <small className={styles.category}>{product.category}</small>

      <h3 className={styles.name}>{product.name}</h3>

      <p className={styles.description}>{product.description}</p>

      <strong className={styles.price}>
        {product.price.toLocaleString("fr-FR")}€
      </strong>

      <button onClick={() => addToCart(product)} className={styles.button}>
        Ajouter au panier
      </button>
    </article>
  );
}

export default ProductCard;
