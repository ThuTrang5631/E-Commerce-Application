import { Button, Form, Input, Typography, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { login } from "./service";
import {
  getValueFromLocalStorage,
  saveInLocalStorage,
} from "../../utils/handler";
import {
  ACCESS_TOKEN,
  CARTS,
  REFRESH_TOKEN,
  ROUTES,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCarts } from "../../store/useCart";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const token = getValueFromLocalStorage(ACCESS_TOKEN);
  const carts = useCarts((state: any) => state.carts);
  const [loading, setLoading] = useState(false);

  const handleSubmitLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await login(values);

      if (res?.data) {
        saveInLocalStorage(ACCESS_TOKEN, res?.data?.accessToken);
        saveInLocalStorage(REFRESH_TOKEN, res?.data?.refreshToken);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(ROUTES.PRODUCTS);
        }, 500);
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate(ROUTES.PRODUCTS);
    }

    if (carts?.length) {
      saveInLocalStorage(CARTS, JSON.stringify([]));
    }
  }, []);

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-content">
            <div className="logo-section">
              <ShoppingOutlined className="logo-icon" />
              <Typography.Title level={1} className="brand-name">
                E-Shop
              </Typography.Title>
            </div>
            <Typography.Title level={2} className="welcome-title">
              Welcome Back!
            </Typography.Title>
            <Typography.Paragraph className="welcome-text">
              Discover thousands of quality products at the best prices. Login
              for an amazing shopping experience!
            </Typography.Paragraph>
            <div className="features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Free Shipping</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Secure Payment</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-form">
            <div className="form-header">
              <Typography.Title level={2} className="form-title">
                Log in
              </Typography.Title>
              <Typography.Text className="form-subtitle">
                Welcome back! Please login to your account.
              </Typography.Text>
            </div>

            <Form
              onFinish={handleSubmitLogin}
              autoComplete="off"
              layout="vertical"
              className="login-form-content"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="input-icon" />}
                  placeholder="Username"
                  size="large"
                  className="custom-input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="input-icon" />}
                  placeholder="Password"
                  size="large"
                  className="custom-input"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="login-button"
                block
              >
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
