import {
  Form,
  Input,
  Radio,
  Button,
  Space,
  Card,
  Typography,
  Divider,
  Row,
  Col,
  Spin,
} from "antd";
import { BankOutlined, WalletOutlined } from "@ant-design/icons";
import { useCarts } from "../../store/useCart";
import { useState } from "react";
import CardCheckout from "../../components/CardCheckout";
import { checkOut } from "./service";
import { useNavigate } from "react-router-dom";
import { CARTS, regPhoneNumber, ROUTES } from "../../utils/constants";
import { saveInLocalStorage } from "../../utils/handler";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  code: string;
  streetAddress: string;
  detailAddress: string;
  description?: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const Checkout = () => {
  const [form] = Form.useForm<CheckoutFormValues>();
  const { carts, setCarts } = useCarts() as any;
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const subtotal = carts.reduce((sum: number, item: any) => {
    return sum + item.price * item.quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  const onFinish = (values: CheckoutFormValues) => {
    setLoading(true);
    const res = checkOut(values);

    if (res?.isSuccess) {
      toast.success("Payment is successful");
      setCarts([]);
      saveInLocalStorage(CARTS, JSON.stringify([]));

      setTimeout(() => {
        setLoading(false);
        navigate(ROUTES.PRODUCTS);
      }, 2000);
    } else {
      toast.error("Payment is failed");
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} size="large" tip="Processing payment...">
      <div className="checkout">
        <Row gutter={40}>
          <Col xs={24} lg={14}>
            <Card className="checkout-card">
              <Title level={3} className="section-title">
                Shipping Address
              </Title>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  paymentMethod: "cod",
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your first name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your last name" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your email" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Phone number"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                        {
                          validator(_, value, callback) {
                            if (value && !regPhoneNumber.test(value)) {
                              return callback(
                                "Phone number is not in correct format"
                              );
                            }

                            return callback();
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Enter your phone" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Postal code"
                      name="code"
                      rules={[
                        {
                          required: true,
                          message: "Please input your city!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter postal code" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Street address"
                      name="streetAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please input your state!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter street address" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Detailed address"
                      name="detailAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please input your zip code!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter detail address" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Delivery notes" name="description">
                  <Input.TextArea
                    placeholder="Enter a delivery notes..."
                    rows={4}
                    size="large"
                  />
                </Form.Item>

                <Divider className="divider-large" />

                <Title level={3} className="section-title">
                  Payment Method
                </Title>

                <Form.Item name="paymentMethod">
                  <Radio.Group
                    className="payment-radio-group"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Space
                      direction="vertical"
                      className="payment-space"
                      size="middle"
                    >
                      <Card
                        hoverable
                        className={`payment-card ${
                          paymentMethod === "cod" ? "selected" : "unselected"
                        }`}
                      >
                        <Radio value="cod" className="payment-radio">
                          <Row justify="space-between" align="middle">
                            <Col span={24}>
                              <Space size="large">
                                <WalletOutlined className="payment-icon" />
                                <div className="payment-method-content">
                                  <div className="payment-title">
                                    Cash on Delivery
                                  </div>
                                  <Text
                                    type="secondary"
                                    className="payment-description"
                                  >
                                    Pay with cash when receiving
                                  </Text>
                                </div>
                              </Space>
                            </Col>
                          </Row>
                        </Radio>
                      </Card>

                      <Card
                        hoverable
                        className={`payment-card ${
                          paymentMethod === "atm" ? "selected" : "unselected"
                        }`}
                      >
                        <Radio value="atm" className="payment-radio">
                          <Row justify="space-between" align="middle">
                            <Col span={24}>
                              <Space size="large">
                                <BankOutlined className="payment-icon" />
                                <div className="payment-method-content">
                                  <div className="payment-title">
                                    ATM Payment
                                  </div>
                                  <Text
                                    type="secondary"
                                    className="payment-description"
                                  >
                                    Pay by ATM/Credit Card
                                  </Text>
                                </div>
                              </Space>
                            </Col>
                          </Row>
                        </Radio>
                      </Card>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                {paymentMethod === "atm" && (
                  <div className="card-details-form">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          label="Card Number"
                          name="cardNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please input your card number!",
                            },
                            {
                              pattern: /^[0-9]{16}$/,
                              message: "Card number must be 16 digits!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter card number"
                            size="large"
                            maxLength={16}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Expiry Date"
                          name="expiryDate"
                          getValueFromEvent={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            const formatted =
                              value.length >= 2
                                ? value.slice(0, 2) + "/" + value.slice(2, 4)
                                : value;
                            e.target.value = formatted;
                            return formatted;
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please input expiry date!",
                            },
                            {
                              pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                              message: "Format must be MM/YY!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="MM/YY"
                            size="large"
                            maxLength={5}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="CVV"
                          name="cvv"
                          rules={[
                            {
                              required: true,
                              message: "Please input CVV!",
                            },
                            {
                              pattern: /^[0-9]{3,4}$/,
                              message: "CVV must be 3 or 4 digits!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="123"
                            size="large"
                            maxLength={4}
                            type="password"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={10}>
            <Card className="sticky-card">
              <Title level={3} className="section-title">
                Your Cart
              </Title>

              <div className="cart-items-container">
                {carts.map((item: any, index: number) => (
                  <CardCheckout key={item.id || index} item={item} />
                ))}
              </div>

              <Divider className="divider-small" />

              {/* Price Summary */}
              <div className="summary-container">
                <Row justify="space-between" className="summary-row">
                  <Text>Subtotal</Text>
                  <Text strong className="summary-text">
                    ${subtotal.toFixed(2)}
                  </Text>
                </Row>
                <Row justify="space-between" className="summary-row">
                  <Text>Shipping</Text>
                  <Text strong className="summary-text">
                    ${shipping.toFixed(2)}
                  </Text>
                </Row>
              </div>

              <Divider className="divider-small" />

              <Row justify="space-between" className="total-row">
                <Title level={4} className="total-title">
                  Total
                </Title>
                <Title level={4} className="total-title">
                  ${total.toFixed(2)}
                </Title>
              </Row>

              <Button
                type="primary"
                size="large"
                block
                className="checkout-button"
                onClick={() => {
                  form.submit();
                }}
              >
                Confirm Payment
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Checkout;
