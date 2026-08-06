import { useParams } from "react-router-dom";
import { useContext } from "react";
import products from "../data/products";
import CartContext from "../components/cartContext";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <h2>Produit introuvable</h2>;
  }

  return (
    <main className={styles.details}>
      <div className={styles.image}>
        <img src={product.image} alt={product.name} />
      </div>

      <div className={styles.info}>
        <small>{product.category}</small>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong>{product.price.toLocaleString("fr-FR")} €</strong>
        <button onClick={() => addToCart(product)}>Ajouter au panier</button>
      </div>
    </main>
  );
}

export default ProductDetails;
