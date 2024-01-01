import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";

const Home = () => {

  const addToCartHandler = () =>{}
  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
         productId="asds"
         name="Mca"
         price={45454}
         stock={231}
         handler={addToCartHandler}
         photo="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71vFKBpKakL._SX679_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;