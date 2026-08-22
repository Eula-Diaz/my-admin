import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import type { CurrentUser } from "../../types/auth";
import { hasPermission } from "../../types/auth";
import { menuItems } from "../../config/menu";

function Sidebar() {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  const userString = localStorage.getItem("user");
  const currentUser: CurrentUser | null = userString
    ? JSON.parse(userString)
    : null;

  const visibleItems = currentUser
    ? menuItems.filter((item) => {
        return hasPermission(currentUser.role, item.permission);
      })
    : [];

  console.log("当前用户:", currentUser, "可见菜单项:", visibleItems);

  const items: MenuProps["items"] = visibleItems.map((item) => ({
    key: item.key,
    label: item.label,
  }));

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
