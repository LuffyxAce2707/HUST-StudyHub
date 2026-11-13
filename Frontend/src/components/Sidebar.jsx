import { NavLink } from "react-router-dom";

import {
  Home,
  BookOpen,
  MessageSquare,
  FileText,
  Star,
  Bookmark,
  User,
} from "lucide-react";

const menuItems = [
  {
    label: "Trang chủ",
    path: "/",
    icon: Home,
  },
  {
    label: "Học phần",
    path: "/courses",
    icon: BookOpen,
  },
  {
    label: "Thảo luận",
    path: "/discussion",
    icon: MessageSquare,
  },
  {
    label: "Tài liệu học tập",
    path: "/materials",
    icon: FileText,
  },
  {
    label: "Đánh giá học phần",
    path: "/reviews",
    icon: Star,
  },
  {
    label: "Đã lưu",
    path: "/bookmarks",
    icon: Bookmark,
  },
  {
    label: "Trang cá nhân",
    path: "/profile",
    icon: User,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-heading">
        KHÔNG GIAN HỌC TẬP
      </p>

      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}

export default Sidebar;
