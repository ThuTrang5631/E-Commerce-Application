import { Button, Form, Input } from "antd";
import { login } from "./service";
import { saveInLocalStorage } from "../../utils/handler";
import { ACCESS_TOKEN, REFRESH_TOKEN, ROUTES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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

  return (
    <div className="login">
      <div className="login-form">
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
      {/* <div className="signup-image">
          <img alt="sign up image" src={loginImage} />
        </div> */}
    </div>
  );
};

export default Login;
