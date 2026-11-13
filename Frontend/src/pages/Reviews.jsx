function Reviews() {
  return (
    <div>
      <h1>Đánh giá học phần</h1>
      <p>Tham khảo trải nghiệm học tập từ cộng đồng sinh viên.</p>

      <section className="content-card">
        <input placeholder="Tìm kiếm học phần..." />
        <h3>IT3010 – Cấu trúc dữ liệu và giải thuật</h3>
        <p>Đánh giá trung bình: 4.5 / 5</p>
        <p>★★★★★</p>
      </section>

      <section className="content-card">
        <h3>Đánh giá ẩn danh</h3>
        <p>Nội dung môn học khá thú vị, cần luyện tập bài tập thường xuyên.</p>
        <small>Đã đăng · Người đánh giá được ẩn danh</small>
      </section>
    </div>
  );
}

export default Reviews;