import { Typography } from "antd";

interface CardCheckoutProps {
  item: any;
}

const CardCheckout = ({ item }: CardCheckoutProps) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image-wrapper">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cart-item-image"
        />
        <div className="cart-item-badge">{item.quantity}</div>
      </div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.title}</div>
        <Typography.Text type="secondary" className="cart-item-category">
          {item.category}
        </Typography.Text>
      </div>
      <div className="cart-item-price">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CardCheckout;
