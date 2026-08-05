import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logoContainer}>
      <svg
        className={styles.logoIcon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" />

        <path
          d="
          M65 30
          C55 20, 35 25, 35 40
          C35 55, 65 45, 65 60
          C65 75, 45 80, 32 68
          "
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <span className={styles.text}>ShopSphere</span>
    </Link>
  );
}

export default Logo;
