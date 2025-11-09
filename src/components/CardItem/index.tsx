import { Link, useNavigate } from "react-router-dom";
import { Button, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAuth } from "../../store/useAuth";
import { CARTS, ROUTES } from "../../utils/constants";
import { useCarts } from "../../store/useCart";
import { v4 as uuidv4 } from "uuid";
import { saveInLocalStorage } from "../../utils/handler";

interface CardItemProps {
  onAddToCart?: () => void;
  product: any;
}

const CardItem = ({ product }: CardItemProps) => {
  const user = useAuth((state: any) => state.user);
  const saveCarts = useCarts((state: any) => state.setCarts);
  const navigate = useNavigate();
  const carts = useCarts((state: any) => state.carts);
  console.log("carts", carts);

  const handleAddToCart = () => {
    if (!Object.keys(user).length) {
      return navigate(ROUTES.LOGIN);
    }

    let mergeCarts = [...carts];

    const existingCartIndex = mergeCarts.findIndex((cart: any) =>
      cart.products.some((p: any) => p.id === product.id)
    );

    if (existingCartIndex !== -1) {
      const productIndex = mergeCarts[existingCartIndex].products.findIndex(
        (p: any) => p.id === product.id
      );

      mergeCarts[existingCartIndex].products[productIndex].quantity += 1;
    } else {
      const newCart = {
        id: uuidv4(),
        products: [{ ...product, quantity: 1 }],
      };
      mergeCarts = [...mergeCarts, newCart];
    }

    saveInLocalStorage(CARTS, JSON.stringify(mergeCarts));
    saveCarts(mergeCarts);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={product?.images[0]} alt="product"></img>
      </div>
      <div className="card-content">
        <h5 className="card-nameproduct">{product?.title}</h5>
        <p className="card-desc">{product?.description}</p>
        <p className="card-price">
          <span className="card-iconmoney">₫</span>
          {`${product?.price}000`}
        </p>
        <Rate disabled allowHalf defaultValue={product?.rating} />
        <Button
          className="card-add-to-cart-btn"
          onClick={handleAddToCart}
          icon={<ShoppingCartOutlined className="cart-icon" />}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CardItem;
