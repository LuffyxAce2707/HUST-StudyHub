import { Link } from "react-router-dom";
import {
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext";

function PostCard({ post }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const postId = post.id ?? post._id;
  const saved = isBookmarked("POST", postId);

  const authorName = post.author?.fullName ?? post.authorName ?? "Sinh viên HUST";
  const courseName = post.course?.courseName ?? post.courseName ?? "Thảo luận chung";
  const content = post.content ?? "";

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("vi-VN")
    : "Vừa đăng";

  return (
    <article className="post-card">
      <div className="post-card-header">
        <div className="post-author-avatar">
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt={authorName} />
          ) : (
            <UserRound size={21} />
          )}
        </div>

        <div className="post-author-info">
          <strong>{authorName}</strong>
          <span>
            {courseName} · {formattedDate}
          </span>
        </div>

        <button
          className={`bookmark-button ${saved ? "saved" : ""}`}
          onClick={() => toggleBookmark("POST", post)}
          aria-label={saved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
          title={saved ? "Bỏ lưu" : "Lưu bài viết"}
        >
          <Bookmark
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <button
          className="post-more-button"
          aria-label="Tùy chọn bài viết"
          title="Tùy chọn"
          onClick={() => console.log("Post options:", postId)}
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="post-card-body">
        <h3>{post.title ?? "Bài viết chưa có tiêu đề"}</h3>
        <p>{content}</p>

        {post.tags?.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-card-footer">
        <div className="post-card-stat">
          <MessageCircle size={17} />
          <span>{post.commentCount ?? 0} bình luận</span>
        </div>

        <Link to="/discussion" className="post-detail-link">
          Xem thảo luận
        </Link>
      </div>
    </article>
  );
}

export default PostCard;