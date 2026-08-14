import { Card, Typography } from "antd";

const { Text, Title } = Typography;

function User() {
  return (
    <Card>
      <Title level={2}>用户管理</Title>
      <Text>这里以后会实现用户列表。</Text>
    </Card>
  );
}

export default User;
