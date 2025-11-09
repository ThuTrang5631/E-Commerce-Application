import { Input, Badge, Button, Form, Space, Typography, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, CARTS, ROUTES } from "../../utils/constants";
import { searchList } from "../../pages/ProductList/service";
import { useProducts } from "../../store/useProducts";
import { getCurrentUser } from "../../pages/Login/service";
import { useEffect } from "react";
import { useAuth } from "../../store/useAuth";
import {
  clearToken,
  getValueFromLocalStorage,
  saveInLocalStorage,
} from "../../utils/handler";
import { getCartByUser } from "../../pages/Cart/service";
import { useCarts } from "../../store/useCart";

const Header = () => {
  const navigate = useNavigate();
  const saveProduct = useProducts((state: any) => state.setProducts);
  const saveIsSearch = useProducts((state: any) => state.setIsSearch);
  const saveUser = useAuth((state: any) => state.setUser);
  const user = useAuth((state: any) => state.user);
  const accessToken = getValueFromLocalStorage(ACCESS_TOKEN);
  const saveCarts = useCarts((state: any) => state.setCarts);
  const carts = useCarts((state: any) => state.carts);

  const clearUser = useAuth((state: any) => state.clearUser);

  const handleLogout = () => {
    clearToken();
    clearUser();
    navigate(ROUTES.LOGIN);
  };

  const handleSearch = async (values: any) => {
    saveIsSearch(true);

    try {
      const res = await searchList(values);

      if (res?.data) {
        saveProduct(res.data.products);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  const handleLogoClick = () => {
    navigate(ROUTES.PRODUCTS);
  };

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data) {
        saveUser(res?.data);
      }
    } catch (error) {}
  };

  const handleGetCartByUser = async () => {
    try {
      const res = await getCartByUser(user?.id);
      if (res?.data?.carts) {
        saveCarts(res?.data?.carts?.[0]?.products);
        saveInLocalStorage(
          CARTS,
          JSON.stringify(res?.data?.carts?.[0]?.products)
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (accessToken && !Object.keys(user).length) {
      handleGetCurrentUser();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length && accessToken && !carts.length) {
      console.log("hhii");

      handleGetCartByUser();
    }
  }, [user]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={handleLogoClick}>
          <h1>E-Shop</h1>
        </div>

        <Form onFinish={handleSearch}>
          <div className="header-search">
            <Form.Item name="q" noStyle>
              <Input
                size="large"
                placeholder="Tìm kiếm sản phẩm..."
                allowClear
              />
            </Form.Item>
            <Button
              className="header-search-btn"
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              htmlType="submit"
            />
          </div>
        </Form>

        <div className="header-actions">
          <Badge showZero={false} count={carts?.length} color={" #ff4d4f"}>
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
              size="large"
              onClick={handleCartClick}
            />
          </Badge>
          {Object.keys(user)?.length ? (
            <Space>
              <Space size={"small"}>
                <UserOutlined />
                <Typography.Text>{user?.username}</Typography.Text>
              </Space>
              <Tooltip title="Log out">
                <Button
                  type="text"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                />
              </Tooltip>
            </Space>
          ) : (
            <Button
              type="text"
              icon={<UserOutlined />}
              size="large"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
