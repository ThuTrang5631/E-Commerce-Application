import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { ROUTES } from "./utils/constants";
import ProductList from "./pages/ProductList";

import Login from "./pages/Login";
import CartPage from "./pages/Cart";
import ProtectRoute from "./components/ProtectRoute";
import Layout from "./components/Layout";

function App() {
  return (
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
