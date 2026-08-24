import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../components/cartContext";
import styles from "./Cart.module.css";

const formatPrice = (value) => `${value.toLocaleString("fr-FR")} €`;
function ProductItem({
  product,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  return (
    <article className={styles.item} key={product.id}>
      <img src={product.image} alt={product.name} className={styles.image} />

      <div className={styles.info}>
        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <strong>{formatPrice(product.price)}</strong>

        <div className={styles.quantity}>
          <button type="button" onClick={() => decreaseQuantity(product.id)}>
            -
          </button>

          <span>{product.quantity}</span>

          <button type="button" onClick={() => increaseQuantity(product.id)}>
            +
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <strong>{formatPrice(product.price * product.quantity)}</strong>

        <button
          type="button"
          onClick={() => removeFromCart(product.id)}
          className={styles.delete}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}

function OrderSummary({ total }) {
  return (
    <section className={styles.summary}>
      <h2>Résumé de la commande</h2>

      <div>
        <span>Sous-total</span>

        <strong>{formatPrice(total)}</strong>
      </div>

      <div>
        <span>Livraison</span>

        <strong>Gratuite</strong>
      </div>

      <hr />

      <div>
        <span>Total</span>

        <strong>{formatPrice(total)}</strong>
      </div>

      <Link to="/checkout" className={styles.checkout}>
        Commander
      </Link>
    </section>
  );
}

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  return (
    <section className={styles.cartContainer}>
      <h1>Mon panier</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {cart.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}

          <OrderSummary total={total} />
        </>
      )}
    </section>
  );
}

export default Cart;
