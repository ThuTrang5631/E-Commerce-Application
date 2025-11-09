import { Button, Form, Input, Typography } from "antd";
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
import { useEffect } from "react";
import { useCarts } from "../../store/useCart";

const Login = () => {
  const navigate = useNavigate();
  const token = getValueFromLocalStorage(ACCESS_TOKEN);
  const carts = useCarts((state: any) => state.carts);

  const handleSubmitLogin = async (values: any) => {
    try {
      const res = await login(values);

      if (res?.data) {
        saveInLocalStorage(ACCESS_TOKEN, res?.data?.accessToken);
        saveInLocalStorage(REFRESH_TOKEN, res?.data?.refreshToken);
        navigate(ROUTES.PRODUCTS);
      }
    } catch (error) {}
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
      <div className="login-form">
        <Typography.Title>Log in</Typography.Title>
        <Form onFinish={handleSubmitLogin} autoComplete="off" layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
