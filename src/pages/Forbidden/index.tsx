import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
function Forbidden() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="你没有权限访问这个页面"
      extra={[
        <Button type="primary" onClick={() => navigate("/dashboard")}>
          返回 Dashboard
        </Button>,
      ]}
    />
  );
}

export default Forbidden;
