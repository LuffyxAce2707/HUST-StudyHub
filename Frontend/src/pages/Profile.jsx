function Profile() {
  return (
    <div>
      <h1>Hồ sơ cá nhân</h1>

      <section className="content-card">
        <div className="avatar large">H</div>
        <h2>Nguyễn Văn A</h2>
        <p>student@hust.edu.vn</p>
        <p>Sinh viên HUST</p>
        <button>Chỉnh sửa hồ sơ</button>
      </section>

      <h2>Hoạt động của tôi</h2>
      <section className="content-card">
        <p>Bài viết đã đăng</p>
        <p>Tài liệu đã chia sẻ</p>
        <p>Nội dung đã lưu</p>
      </section>
    </div>
  );
}

export default Profile;