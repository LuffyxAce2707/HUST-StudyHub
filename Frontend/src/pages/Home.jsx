function Home() {
  return (
    <div>
      <h1>Cộng đồng học tập HUST</h1>
      <p>Chia sẻ kiến thức, kết nối và cùng nhau tiến bộ.</p>

      <section className="content-card">
        <h3>Bạn đang nghĩ gì về việc học?</h3>
        <input placeholder="Chia sẻ điều gì đó với cộng đồng..." />
        <button>Tạo bài viết</button>
      </section>

      <h2>Bài viết mới nhất</h2>

      <section className="content-card">
        <span className="tag">IT3010</span>
        <h3>Kinh nghiệm học Cấu trúc dữ liệu và giải thuật</h3>
        <p>
          Mình muốn chia sẻ một số tài liệu và kinh nghiệm ôn tập
          môn học này...
        </p>
        <small>Nguyễn Văn A · 2 giờ trước · 5 bình luận</small>
      </section>
    </div>
  );
}

export default Home;
