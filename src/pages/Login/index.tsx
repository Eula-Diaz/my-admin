import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleLogin = (values: { username: string; password: string }) => {

    login(values).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      message.success("登录成功");
      navigate("/dashboard");
    }).catch((err) => {
      console.log(err,'error');
      message.error("用户名或密码错误");
    });
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: 400 }}>
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <Title level={2} style={{ textAlign: "center" }}>
            登录
          </Title>
          <Form form={form} onFinish={handleLogin}>
            <Form.Item name="username" label="用户名">
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form>
        </Space>
      </Card>
    </div>
  );
}

export default Login;
