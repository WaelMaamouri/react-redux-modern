import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";
import CartContext from "./cartContext";
import { useContext } from "react";

function Header() {

    const { cart } = useContext(CartContext);
    return (
        <header>
            Panier ({cart.length})
            <Logo />

            <Menu />

            <Button text="Connexion" color="blue" />

            <Button text="Créer un compte" color="green" />
            
        </header>
    );
}

export default Header;