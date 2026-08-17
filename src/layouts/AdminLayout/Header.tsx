import { Typography, Avatar, Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    message.success("退出成功");
  };
  
  const items: MenuProps["items"] = [
    {
      label: <span onClick={handleLogout}>退出</span>,
      key: "0",
    },
  ];
  return (
    <header
      style={{
        height: 64,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Text strong>My Admin</Text>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Avatar>A</Avatar>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Admin
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
