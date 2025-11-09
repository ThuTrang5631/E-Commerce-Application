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
  console.log("carts", carts);

  // Tính subtotal
  const calculateSubtotal = () => {
    return carts.reduce((total: number, cart: any) => {
      return (
        total +
        cart.products.reduce((cartTotal: number, product: any) => {
          return cartTotal + product.price * (product.quantity || 1);
        }, 0)
      );
    }, 0);
  };

  // Tính shipping
  const calculateShipping = () => {
    return 20.0; // Fixed shipping cost
  };

  // Tính total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (
    cartId: string,
    productId: string,
    currentQuantity: number,
    type: string
  ) => {
    // Tính số lượng mới dựa trên type
    const newQuantity =
      type === "plus" ? currentQuantity + 1 : currentQuantity - 1;

    // Không cho phép quantity < 1
    if (newQuantity < 1) return;

    const updatedCarts = carts.map((cart: any) => {
      if (cart.id === cartId) {
        return {
          ...cart,
          products: cart.products.map((product: any) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: newQuantity,
              };
            }
            return product;
          }),
        };
      }
      return cart;
    });
    console.log("updateCarts", updatedCarts);

    saveCarts(updatedCarts);
    saveInLocalStorage(CARTS, JSON.stringify(updatedCarts));
  };

  const removeProduct = (cartId: string, productId: string) => {
    console.log("cardId", cartId, "productId", productId);
    const updateCarts = carts
      ?.map((cart: any) => {
        if (cart?.id === cartId) {
          const updatedProducts = cart.products.filter(
            (product: any) => product.id !== productId
          );

          if (!updatedProducts.length) {
            return null;
          }

          return { ...cart, products: updatedProducts };
        }
        return cart;
      })
      .filter((cart: any) => cart !== null);

    saveCarts(updateCarts);
    saveInLocalStorage(CARTS, JSON.stringify(updateCarts));
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
              {carts?.map((cart: any) =>
                cart.products.map((product: any) => (
                  <CartItem
                    cartId={cart.id}
                    product={product}
                    onRemoveProduct={() => removeProduct(cart.id, product.id)}
                    onUpdateQuantity={updateQuantity}
                  />
                ))
              )}
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
                <span>USD ${calculateTotal().toFixed(2)}</span>
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
