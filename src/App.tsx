import AdminLayout from "./layouts/AdminLayout";

import { Card, Typography } from "antd";
const { Title, Text } = Typography;
function App() {
  return (
    <AdminLayout>
      <Card>
        <Title level={2}>控制台</Title>

        <Text>这是我的第一个 React Admin 项目</Text>
      </Card>
    </AdminLayout>
  );
}

export default App;
