import "../../styles/components/_cart-item.scss";

interface ICartItemProps {
  product: any;
  cartId: string;
  onRemoveProduct: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number, type: string) => void;
}

const CartItem = ({
  product,
  onRemoveProduct,
  onUpdateQuantity,
}: ICartItemProps) => {
  return (
    <div className="cart-item">
      <button
        className="remove-btn"
        onClick={() => onRemoveProduct(product.id)}
      >
        ×
      </button>
      <div className="item-image">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="item-name">{product.title}</div>

      <div className="item-quantity">
        <button
          className="qty-btn"
          onClick={() =>
            onUpdateQuantity(product.id, product.quantity, "subtraction")
          }
        >
          −
        </button>
        <span className="qty-value">{product.quantity || 1}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(product.id, product.quantity, "plus")}
        >
          +
        </button>
      </div>
      <div className="item-price">
        {product.quantity || 1} × ${product.price?.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
