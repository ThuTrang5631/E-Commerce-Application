import { useNavigate } from "react-router-dom";
import { Button, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAuth } from "../../store/useAuth";
import { CARTS, ROUTES } from "../../utils/constants";
import { useCarts } from "../../store/useCart";
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

  const handleAddToCart = () => {
    if (!Object.keys(user).length) {
      return navigate(ROUTES.LOGIN);
    }

    const productIndex = carts.findIndex((p: any) => p.id === product.id);

    let updatedCarts;

    if (productIndex !== -1) {
      updatedCarts = carts.map((p: any, idx: number) =>
        idx === productIndex ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCarts = [...carts, { ...product, quantity: 1 }];
    }

    saveInLocalStorage(CARTS, JSON.stringify(updatedCarts));
    saveCarts(updatedCarts);
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
