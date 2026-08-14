import { Typography, Avatar } from "antd";

const { Text } = Typography;
function Header() {
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

        <Text>Admin</Text>
      </div>
    </header>
  );
}

export default Header;
