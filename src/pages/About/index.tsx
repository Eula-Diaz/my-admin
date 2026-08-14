import { Card, Typography } from "antd";

const { Text, Title } = Typography;

function About() {
  return (
    <Card>
      <Title level={2}>关于我们</Title>
      <Text>这是 About 页面</Text>
    </Card>
  );
}

export default About;
