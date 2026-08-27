import { Routes, Route } from "react-router-dom";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductList />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/orders" element={<Orders />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
