import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/cartContext";
import { getProducts } from "../services/productService";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await getProducts();
        const selectedProduct = products.find((item) => item.id === Number(id));
        setProduct(selectedProduct);

        if (!selectedProduct) {
          setError("Produit introuvable");
          return;
        }

        setProduct(selectedProduct);
      } catch {
        setError("Impossible de charger le produit.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <h2>Chargement du produit...</h2>;
  }

  if (error || !product) {
    return <h2>{error || "Produit introuvable"}</h2>;
  }

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.min(currentQuantity + 1, product.stock),
    );
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
