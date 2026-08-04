import ProductList from "../components/ProductList";

function  Home() {

    return (
        <main>
            <h2>Bienvenue sur ShopSphere</h2>
            <p>
                Découvrez nos meilleurs produits
            </p>

            <ProductList 
            />

        </main>
    );
}

export default Home;