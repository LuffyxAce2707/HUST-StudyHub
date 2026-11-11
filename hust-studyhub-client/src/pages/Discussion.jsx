
import "../styles/pages/Discussion.css";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import PostCard from "../components/PostCard";

const initialPosts = [
  {
    id: "post-1",
    title: "Chia sẻ tài liệu ôn thi cuối kỳ",
    content:
      "Mọi người có tài liệu ôn tập môn này không? Mình đang cần tài liệu và đề thi các năm trước để chuẩn bị cho kỳ thi sắp tới.",
    authorName: "Nguyễn Văn A",
    courseName: "IT1110 - Tin học đại cương",
    createdAt: "2026-11-08T10:30:00",
    commentCount: 12,
    tags: ["Ôn thi", "Tài liệu"],
  },
  {
    id: "post-2",
    title: "Kinh nghiệm học cấu trúc dữ liệu và giải thuật",
    content:
      "Mình muốn chia sẻ một số tài liệu và kinh nghiệm học môn CTDL&GT. Theo mình nên luyện tập thường xuyên các bài tập về cây, đồ thị và quy hoạch động.",
    authorName: "Trần Thị B",
    courseName: "IT3080 - Cấu trúc dữ liệu và giải thuật",
    createdAt: "2026-11-07T15:20:00",
    commentCount: 8,
    tags: ["Kinh nghiệm", "Lập trình"],
  },
  {
    id: "post-3",
    title: "Hỏi về cách đăng ký học phần",
    content:
      "Có ai biết thời gian đăng ký học phần kỳ tới chưa? Mình muốn hỏi thêm về cách đăng ký và điều kiện tiên quyết của một số môn.",
    authorName: "Lê Văn C",
    courseName: "Thảo luận chung",
    createdAt: "2026-11-06T09:15:00",
    commentCount: 5,
    tags: ["Hỏi đáp"],
  },
];

function Discussion() {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      authorName: "Bạn",
      courseName: "Thảo luận chung",
      createdAt: new Date().toISOString(),
      commentCount: 0,
      tags: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="discussion-page">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">HUST STUDYHUB</span>
          <h1>Thảo luận</h1>
          <p>
            Trao đổi kiến thức và kinh nghiệm học tập cùng sinh viên HUST.
          </p>
        </div>
      </div>

      <form className="content-card discussion-create" onSubmit={handleCreatePost}>
        <h3>Chia sẻ bài viết mới</h3>

        <input
          type="text"
          placeholder="Tiêu đề bài viết..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Bạn muốn chia sẻ điều gì?"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="discussion-create-footer">
          <span>Chia sẻ kiến thức cùng cộng đồng HUST</span>
          <button type="submit">
            <PlusCircle size={17} />
            Đăng bài
          </button>
        </div>
      </form>

      <div className="discussion-list">
        <div className="discussion-list-heading">
          <h2>Bài viết mới nhất</h2>
          <span>{posts.length} bài viết</span>
        </div>

        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="empty-state">
            <p>Chưa có bài viết nào.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Discussion;