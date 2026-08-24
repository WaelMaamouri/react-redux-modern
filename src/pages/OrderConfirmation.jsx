import { Link, useLocation } from "react-router-dom";
import styles from "./OrderConfirmation.module.css";

const formatPrice = (value) => `${value.toLocaleString("fr-FR")} €`;

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <main className={styles.confirmation}>
        <div className={styles.card}>
          <h1>Commande introuvable</h1>

          <p>Nous ne pouvons pas afficher cette commande.</p>

          <Link to="/products" className={styles.link}>
            Retour à la boutique
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.confirmation}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1>Commande Confirmée !</h1>

        <p>Merci pour votre commande, {order.customer.firstName}.</p>

        <div className={styles.orderNumber}>
          <span>Numéro de commande</span>
          <strong>{order.orderNumber}</strong>
        </div>

        <div className={styles.section}>
          <h2>Informations de livraison</h2>

          <p>
            {order.customer.firstName} {order.customer.lastName}
          </p>

          <p>{order.customer.address}</p>

          <p>
            {order.customer.postalCode} {order.customer.city}
          </p>

          <p>{order.customer.email}</p>
        </div>

        <div className={styles.section}>
          <h2>Votre commande</h2>
          {order.products.map((product) => (
            <div key={product.id} className={styles.product}>
              <span>
                {product.name} x {product.quantity}
              </span>
              <strong>{formatPrice(product.price * product.quantity)}</strong>
            </div>
          ))}

          <hr />

          <div className={styles.total}>
            <span>Total</span>

            <strong>{formatPrice(order.total)}</strong>
          </div>
        </div>

        <Link to="/products" className={styles.link}>
          Retour à la boutique
        </Link>
      </div>
    </main>
  );
}

export default OrderConfirmation;
