import { Card, Typography } from "antd";

const { Text, Title } = Typography;

function Dashboard() {
  return (
    <Card>
      <Title level={2}>控制台</Title>
      <Text>这是我的第一个 React Admin 项目</Text>
    </Card>
  );
}

export default Dashboard;
