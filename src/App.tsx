import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import CartPage from "./pages/Cart";
import ProtectRoute from "./components/ProtectRoute";
import Layout from "./components/Layout";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route element={<Layout />}>
            <Route path={ROUTES.PRODUCTS} element={<ProductList />} />
            <Route
              path={ROUTES.CART}
              element={
                <ProtectRoute>
                  <CartPage />
                </ProtectRoute>
              }
            />
            <Route
              path={ROUTES.CHECKOUT}
              element={
                <ProtectRoute>
                  <Checkout />
                </ProtectRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
