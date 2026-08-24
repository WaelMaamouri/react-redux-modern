import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../components/cartContext";
import styles from "./Checkout.module.css";

const formatPrice = (value) => `${value.toLocaleString("fr-FR")} €`;

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis.";
    }

    // Nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Veuillez saisir un email valide.";
    }

    // Téléphone
    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    } else {
      const phone = formData.phone.replace(/[\s.-]/g, "");

      if (!/^(0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(phone)) {
        newErrors.phone = "Veuillez saisir un numéro de téléphone valide.";
      }
    }

    // Adresse
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise.";
    }

    // Ville
    if (!formData.city.trim()) {
      newErrors.city = "La ville est requise.";
    }

    // Code postal
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Le code postal est requis.";
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Veuillez saisir un code postal valide.";
    }

    setErrors(newErrors);

    // S'il y a des erreurs, on arrête ici
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Création du numéro de commande
    const orderNumber = `SS-${Date.now()}`;

    // Création de la commande
    const order = {
      orderNumber,

      customer: {
        ...formData,
      },

      products: cart.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),

      total,
    };

    const saveOrder = JSON.parse(localStorage.getItem("orders")) || [];
    saveOrder.push(order);
    localStorage.setItem("orders", JSON.stringify(saveOrder));

    clearCart();

    // Redirection vers la confirmation
    navigate("/order-confirmation", {
      state: {
        order,
      },
    });
  };

  // Panier vide
  if (cart.length === 0) {
    return (
      <main className={styles.checkout}>
        <h1>Votre panier est vide</h1>

        <p>
          Ajoutez au moins un produit à votre panier pour finaliser votre
          commande.
        </p>

        <Link to="/products" className={styles.link}>
          Retour à la boutique
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.checkout}>
      <h1>Finaliser votre commande</h1>

      <section className={styles.order}>
        <h2>Informations du client</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Prénom + Nom */}

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName">Prénom</label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Votre prénom"
              />

              {errors.firstName && (
                <span className={styles.error}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">Nom</label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Votre nom"
              />

              {errors.lastName && (
                <span className={styles.error}>{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email + Téléphone */}

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
              />

              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Téléphone</label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
              />

              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Adresse */}

          <div className={styles.field}>
            <label htmlFor="address">Adresse</label>

            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="10 rue Exemple"
            />

            {errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </div>

          {/* Code postal + Ville */}

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="postalCode">Code postal</label>

              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="84000"
                maxLength="5"
                inputMode="numeric"
              />

              {errors.postalCode && (
                <span className={styles.error}>{errors.postalCode}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="city">Ville</label>

              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Avignon"
              />

              {errors.city && (
                <span className={styles.error}>{errors.city}</span>
              )}
            </div>
          </div>

          {/* Résumé de la commande */}

          <h2>Votre commande</h2>

          {cart.map((product) => (
            <div key={product.id} className={styles.orderItem}>
              <span>
                {product.name} × {product.quantity}
              </span>

              <strong>{formatPrice(product.price * product.quantity)}</strong>
            </div>
          ))}

          <hr />

          <div className={styles.orderTotal}>
            <span>Total</span>

            <strong>{formatPrice(total)}</strong>
          </div>

          <button type="submit" className={styles.confirm}>
            Confirmer la commande
          </button>

          <Link to="/cart" className={styles.backLink}>
            ← Retour au panier
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Checkout;
