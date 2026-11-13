import { Link } from "react-router-dom";
import {
  BookOpen,
  Bookmark,
  FileText,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext";

function CourseCard({ course }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const courseId = course.id ?? course._id;
  const saved = isBookmarked("COURSE", courseId);

  return (
    <article className="course-card">
      <div className="course-card-header">
        <div className="course-icon">
          <BookOpen size={22} />
        </div>

        <div className="course-code-info">
          <span className="course-code">{course.code}</span>
          <span className="course-credits">
            {course.credits} tín chỉ
          </span>
        </div>

        <button
          className={`bookmark-button ${saved ? "saved" : ""}`}
          onClick={() => toggleBookmark("COURSE", course)}
          aria-label={saved ? "Bỏ lưu học phần" : "Lưu học phần"}
          title={saved ? "Bỏ lưu" : "Lưu học phần"}
        >
          <Bookmark
            size={20}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <h3 className="course-name">{course.name}</h3>
      <p className="course-department">{course.department}</p>

      <div className="course-rating">
        <Star size={17} fill="#E6A000" color="#E6A000" />
        <strong>
          {Number(course.rating ?? 0).toFixed(1).replace(".", ",")}
        </strong>
        <span>({course.reviewCount ?? 0} đánh giá)</span>
      </div>

      <div className="course-card-footer">
        <div className="course-stat">
          <FileText size={16} />
          <span>{course.materialCount ?? 0} tài liệu</span>
        </div>

        <div className="course-stat">
          <Users size={16} />
          <span>
            {(course.studentCount ?? 0).toLocaleString("vi-VN")} sinh viên
          </span>
        </div>

        <Link
          to="/reviews"
          className="course-detail-link"
          aria-label={`Xem đánh giá ${course.name}`}
          title="Xem đánh giá học phần"
        >
          <ArrowRight size={19} />
        </Link>
      </div>
    </article>
  );
}

export default CourseCard;