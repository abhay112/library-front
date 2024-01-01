import { FaPlus } from "react-icons/fa";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => string | undefined;
};

const server = "afasda";

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={`${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>
      <span>{stock}</span>
      <span>{productId}</span>
      <div>
        <button
          onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;