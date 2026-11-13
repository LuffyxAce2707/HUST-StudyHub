
import { Search, Bell, GraduationCap } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">
        <GraduationCap size={28} />
        <span>HUST StudyHub</span>
      </div>

      <div className="search-box">
        <Search size={18} />
        <input placeholder="Tìm kiếm học phần, bài viết, tài liệu..." />
      </div>

      <div className="nav-actions">
        <Bell size={21} />
        <div className="avatar">H</div>
      </div>
    </header>
  );
}

export default Navbar;