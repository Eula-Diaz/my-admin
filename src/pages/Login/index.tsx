import { Button, Card, Input, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem("token", "abc123456");
    navigate("/dashboard");
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
          <Input placeholder="用户名" />
          <Input.Password placeholder="密码" />
          <Button type="primary" block onClick={handleLogin}>
            登录
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default Login;
