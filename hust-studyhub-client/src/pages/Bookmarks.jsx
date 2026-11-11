import "../styles/pages/Bookmarks.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  FileText,
  BookOpen,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext";

function Bookmarks() {
  const [activeTab, setActiveTab] = useState("POST");

  const { bookmarks, removeBookmark } = useBookmarks();

  const savedPosts = bookmarks.filter(
    (item) => item.targetType === "POST"
  );

  const savedMaterials = bookmarks.filter(
    (item) => item.targetType === "MATERIAL"
  );

  const savedCourses = bookmarks.filter(
    (item) => item.targetType === "COURSE"
  );

  const currentItems = bookmarks.filter(
    (item) => item.targetType === activeTab
  );

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("vi-VN");
  };

  const getTitle = (data) =>
    data?.title ??
    data?.name ??
    data?.courseName ??
    data?.productName ??
    data?.fileName ??
    "Chưa có tiêu đề";

  const getDescription = (data) =>
    data?.content ??
    data?.description ??
    data?.department ??
    data?.course ??
    "";

  const getTypeLabel = () => {
    if (activeTab === "POST") return "bài viết";
    if (activeTab === "MATERIAL") return "tài liệu";
    return "học phần";
  };

  return (
    <div className="bookmarks-page">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">THƯ VIỆN CỦA BẠN</span>
          <h1>Đã lưu</h1>
          <p>Quản lý bài viết, tài liệu và học phần yêu thích.</p>
        </div>
      </div>

      <div className="bookmark-summary">
        <Bookmark size={22} />
        <div>
          <strong>{bookmarks.length}</strong>
          <span> mục đã lưu</span>
        </div>
      </div>

      <div className="bookmark-tabs">
        <button
          className={activeTab === "POST" ? "active" : ""}
          onClick={() => setActiveTab("POST")}
        >
          <MessageSquare size={17} />
          Bài viết ({savedPosts.length})
        </button>

        <button
          className={activeTab === "MATERIAL" ? "active" : ""}
          onClick={() => setActiveTab("MATERIAL")}
        >
          <FileText size={17} />
          Tài liệu ({savedMaterials.length})
        </button>

        <button
          className={activeTab === "COURSE" ? "active" : ""}
          onClick={() => setActiveTab("COURSE")}
        >
          <BookOpen size={17} />
          Học phần ({savedCourses.length})
        </button>
      </div>

      <section className="bookmark-content">
        {currentItems.length === 0 ? (
          <div className="empty-bookmarks">
            <Bookmark size={42} />
            <h3>Chưa có {getTypeLabel()} nào được lưu</h3>
            <p>
              Hãy khám phá nội dung và nhấn biểu tượng bookmark
              để lưu lại.
            </p>

            <Link
              to={
                activeTab === "POST"
                  ? "/discussion"
                  : activeTab === "MATERIAL"
                    ? "/materials"
                    : "/courses"
              }
              className="primary-button"
            >
              Khám phá ngay
            </Link>
          </div>
        ) : (
          <div className="saved-items-list">
            {currentItems.map((item) => {
              const data = item.data ?? {};

              return (
                <article
                  className="saved-item-card"
                  key={`${item.targetType}-${item.targetId}`}
                >
                  <div className="saved-item-icon">
                    {activeTab === "POST" && (
                      <MessageSquare size={22} />
                    )}
                    {activeTab === "MATERIAL" && (
                      <FileText size={22} />
                    )}
                    {activeTab === "COURSE" && (
                      <BookOpen size={22} />
                    )}
                  </div>

                  <div className="saved-item-info">
                    <span className="saved-item-type">
                      {activeTab === "POST"
                        ? "BÀI VIẾT"
                        : activeTab === "MATERIAL"
                          ? "TÀI LIỆU"
                          : "HỌC PHẦN"}
                    </span>

                    <h3>{getTitle(data)}</h3>

                    {getDescription(data) && (
                      <p>{getDescription(data)}</p>
                    )}

                    <span className="saved-item-date">
                      Đã lưu: {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <button
                    className="remove-bookmark-button"
                    onClick={() =>
                      removeBookmark(item.targetType, item.targetId)
                    }
                    title="Bỏ lưu"
                    aria-label="Bỏ lưu"
                  >
                    <Trash2 size={18} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Bookmarks;
