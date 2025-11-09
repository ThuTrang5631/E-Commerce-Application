import { useNavigate } from "react-router-dom";
import { useCarts } from "../../store/useCart";
import { saveInLocalStorage } from "../../utils/handler";
import { CARTS, ROUTES } from "../../utils/constants";
import "../../styles/pages/_cart.scss";
import CartItem from "../../components/CartItem";
import { Button, Empty } from "antd";

const CartPage = () => {
  const navigate = useNavigate();
  const carts = useCarts((state: any) => state.carts);
  const saveCarts = useCarts((state: any) => state.setCarts);

  const calculateSubtotal = () => {
    return carts.reduce((total: number, product: any) => {
      return total + product.price * (product.quantity || 1);
    }, 0);
  };

  const calculateShipping = () => {
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const updateQuantity = (
    productId: string,
    currentQuantity: number,
    type: string
  ) => {
    const newQuantity =
      type === "plus" ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity < 1) return;

    const updatedCarts = carts.map((product: any) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });

    saveCarts(updatedCarts);
    saveInLocalStorage(CARTS, JSON.stringify(updatedCarts));
  };

  const removeProduct = (productId: string) => {
    const updatedCarts = carts.filter(
      (product: any) => product.id !== productId
    );

    saveCarts(updatedCarts);
    saveInLocalStorage(CARTS, JSON.stringify(updatedCarts));
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="cart-page">
      {carts?.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          styles={{ image: { height: 60 } }}
          description="Empty cart"
        >
          <Button type="primary">Return to shop</Button>
        </Empty>
      ) : (
        <div className="cart-container">
          <div className="cart-left">
            <div className="cart-items">
              {carts?.map((product: any) => (
                <CartItem
                  key={product.id}
                  cartId=""
                  product={product}
                  onRemoveProduct={() => removeProduct(product.id)}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          </div>

          <div className="cart-right">
            <div className="cart-summary">
              <h2 className="summary-title">Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${calculateShipping().toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
