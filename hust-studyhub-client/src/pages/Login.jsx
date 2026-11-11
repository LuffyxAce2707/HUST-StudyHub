import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-page">
      <form className="auth-card">
        <h1>HUST StudyHub</h1>
        <h2>Đăng nhập</h2>
        <input type="email" placeholder="Email @hust.edu.vn" required />
        <input type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
        <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
        <Link to="/">Quay lại trang chủ</Link>
      </form>
    </div>
  );
}

export default Login;