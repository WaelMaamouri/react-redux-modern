import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./Orders.module.css";

const formatPrice = (value) => `${value.toLocaleString("fr-FR")} €`;

function Orders() {
  const orders = useMemo(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    return [...savedOrders].reverse();
  }, []);

  if (orders.length === 0) {
    return (
      <main className={styles.orders}>
        <div className={styles.empty}>
          <h1>Mes commandes</h1>

          <p>Vous n'avez pas encore passé de commande.</p>

          <Link to="/products" className={styles.link}>
            Continuer vos achats
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.orders}>
      <h1>Mes commandes</h1>

      <div className={styles.list}>
        {orders.map((order) => (
          <article key={order.orderNumber} className={styles.order}>
            <div className={styles.header}>
              <div>
                <span className={styles.label}>Numéro de commande</span>

                <strong className={styles.orderNumber}>
                  {order.orderNumber}
                </strong>

                <span className={styles.status}>Commande confirmée</span>
              </div>

              <div className={styles.date}>
                <span className={styles.label}>Date</span>

                <strong className={styles.orderDate}>
                  {new Date(
                    Number(order.orderNumber.replace("SS-", "")),
                  ).toLocaleDateString("fr-FR")}{" "}
                </strong>
              </div>
            </div>

            <div className={styles.products}>
              {order.products.map((product) => (
                <div key={product.id} className={styles.product}>
                  <div>
                    <strong>{product.name}</strong>

                    <span>Quantité : {product.quantity}</span>
                  </div>

                  <strong>
                    {formatPrice(product.price * product.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className={styles.total}>
              <span>Total : </span>

              <strong>{formatPrice(order.total)}</strong>
            </div>
          </article>
        ))}

        <Link to="/products" className={styles.link}>
          Continuer vos achats
        </Link>
      </div>
    </main>
  );
}

export default Orders;
