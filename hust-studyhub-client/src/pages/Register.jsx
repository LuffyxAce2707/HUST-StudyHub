import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-page">
      <form className="auth-card">
        <h1>HUST StudyHub</h1>
        <h2>Tạo tài khoản</h2>
        <input placeholder="Họ và tên" required />
        <input type="email" placeholder="Email @hust.edu.vn" required />
        <input type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng ký</button>
        <p>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
        <small> Bạn cần xác minh email HUST để kích hoạt tài khoản.</small>
      </form>
    </div>
  );
}

export default Register;