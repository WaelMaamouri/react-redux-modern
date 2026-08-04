import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}


export { CartProvider};
export default CartContext;

