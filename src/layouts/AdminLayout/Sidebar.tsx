import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "/dashboard",
    label: "首页",
  },
  {
    key: "/user",
    label: "用户管理",
  },
  {
    key: "/settings",
    label: "系统设置",
  },
  {
    key: "/about",
    label: "关于我们",
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };
  return (
    <aside
      style={{
        width: 220,
        minHeight: "calc(100vh - 64px)",
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["/dashboard"]}
        items={items}
        onClick={handleMenuClick}
      />
    </aside>
  );
}

export default Sidebar;
