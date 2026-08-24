import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import products from "../data/products";
import CartContext from "../components/cartContext";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <h2>Produit introuvable</h2>;
  }

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  return (
    <main className={styles.details}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>

      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <strong className={styles.price}>
          {product.price.toLocaleString("fr-FR")} €
        </strong>
      </div>
      <div className={styles.actions}>
        <button onClick={decreaseQuantity} className={styles.quantityButton}>
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button onClick={increaseQuantity} className={styles.quantityButton}>
          +
        </button>
        <button
          onClick={() => addToCart(product, quantity)}
          className={styles.addButton}
        >
          Ajouter au panier
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;
