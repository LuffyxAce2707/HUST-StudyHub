# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

# HUST StudyHub – Mạng xã hội học tập dành riêng cho sinh viên HUST

**Phiên bản:** 1.0  
**Dự án:** Project 3 – IT3943  
**Nền tảng:** Web Application  
**Thời gian thực hiện:** 12 tuần  
**Công nghệ:** React, Node.js, Express.js, MongoDB

---

## 1. Giới thiệu (Introduction)

### 1.1. Mục đích

HUST StudyHub là một nền tảng mạng xã hội học tập được xây dựng dành riêng cho cộng đồng sinh viên Đại học Bách khoa Hà Nội.

Hệ thống cho phép sinh viên chia sẻ tài liệu, trao đổi kiến thức, thảo luận về các học phần và đánh giá môn học. Qua đó, tạo ra một môi trường học tập trực tuyến có tính cộng đồng, giúp sinh viên tiếp cận nguồn tài nguyên học tập và kinh nghiệm từ những sinh viên khác.

### 1.2. Mục tiêu dự án

- Xây dựng cộng đồng học tập trực tuyến dành cho sinh viên HUST.
- Hỗ trợ chia sẻ và tìm kiếm tài liệu học tập.
- Tạo không gian thảo luận theo từng học phần.
- Cho phép sinh viên đánh giá môn học ẩn danh.
- Cung cấp công cụ quản lý và kiểm duyệt nội dung.
- Thiết kế hệ thống có khả năng mở rộng trong tương lai.

### 1.3. Đối tượng sử dụng

| Đối tượng | Mô tả |
|---|---|
| Guest | Người truy cập chưa đăng nhập |
| Student | Sinh viên có tài khoản |
| Admin | Quản trị viên hệ thống |

## 2. Phạm vi hệ thống (System Scope)

Hệ thống bao gồm các module:

1. Authentication Management
2. User Profile Management
3. Course Management
4. Post Management
5. Comment Management
6. Study Material Management
7. Anonymous Course Review
8. Administration and Moderation

Các chức năng nằm ngoài phạm vi MVP:

- Chat trực tuyến thời gian thực.
- AI chatbot hỗ trợ học tập.
- Hệ thống gợi ý tài liệu bằng AI.
- Ứng dụng di động.
- Thông báo đẩy (Push Notification).

## 3. Yêu cầu chức năng (Functional Requirements)

### 3.1. Authentication Management

| ID | Yêu cầu |
|---|---|
| FR-01 | Người dùng có thể đăng ký tài khoản |
| FR-02 | Người dùng có thể đăng nhập |
| FR-03 | Người dùng có thể đăng xuất |
| FR-04 | Hệ thống xác thực thông tin đăng nhập |
| FR-05 | Hệ thống phân quyền Student và Admin |
| FR-06 | Người dùng có thể truy xuất thông tin tài khoản của mình |

### 3.2. User Profile Management

| ID | Yêu cầu |
|---|---|
| FR-07 | Sinh viên có thể xem hồ sơ cá nhân |
| FR-08 | Sinh viên có thể cập nhật thông tin cá nhân |
| FR-09 | Sinh viên có thể xem lịch sử bài viết của mình |

### 3.3. Course Management

| ID | Yêu cầu |
|---|---|
| FR-10 | Người dùng có thể xem danh sách học phần |
| FR-11 | Người dùng có thể tìm kiếm học phần |
| FR-12 | Người dùng có thể xem chi tiết học phần |
| FR-13 | Admin có thể thêm học phần |
| FR-14 | Admin có thể cập nhật hoặc xóa học phần |

### 3.4. Post Management

| ID | Yêu cầu |
|---|---|
| FR-15 | Student có thể tạo bài viết |
| FR-16 | Student có thể chỉnh sửa bài viết của mình |
| FR-17 | Student có thể xóa bài viết của mình |
| FR-18 | Người dùng có thể xem danh sách bài viết |
| FR-19 | Người dùng có thể tìm kiếm bài viết |
| FR-20 | Admin có thể kiểm duyệt bài viết |

### 3.5. Comment Management

| ID | Yêu cầu |
|---|---|
| FR-21 | Student có thể bình luận bài viết |
| FR-22 | Student có thể chỉnh sửa bình luận của mình |
| FR-23 | Student có thể xóa bình luận của mình |
| FR-24 | Người dùng có thể xem danh sách bình luận |
| FR-25 | Admin có thể xóa bình luận vi phạm |

### 3.6. Study Material Management

| ID | Yêu cầu |
|---|---|
| FR-26 | Student có thể tải tài liệu lên |
| FR-27 | Student có thể xem tài liệu |
| FR-28 | Student có thể tải tài liệu về |
| FR-29 | Student có thể tìm kiếm tài liệu theo học phần |
| FR-30 | Student có thể xóa tài liệu của mình |
| FR-31 | Admin có thể kiểm duyệt tài liệu |

### 3.7. Anonymous Course Review

| ID | Yêu cầu |
|---|---|
| FR-32 | Student có thể đánh giá học phần |
| FR-33 | Student có thể gửi đánh giá ẩn danh |
| FR-34 | Student có thể chỉnh sửa đánh giá của mình |
| FR-35 | Người dùng có thể xem đánh giá học phần |
| FR-36 | Hệ thống hiển thị điểm đánh giá trung bình |
| FR-37 | Admin có thể kiểm duyệt đánh giá vi phạm |

### 3.8. Administration and Moderation

| ID | Yêu cầu |
|---|---|
| FR-38 | Admin có thể xem danh sách người dùng |
| FR-39 | Admin có thể quản lý tài khoản |
| FR-40 | Admin có thể xem danh sách báo cáo vi phạm |
| FR-41 | Admin có thể xử lý báo cáo |
| FR-42 | Admin có thể quản lý nội dung trên hệ thống |
| FR-43 | Admin có thể xem thống kê hoạt động |

## 4. Yêu cầu phi chức năng (Non-functional Requirements)

### 4.1. Performance

- Trang web cần có thời gian phản hồi hợp lý.
- API cần xử lý các truy vấn dữ liệu hiệu quả.
- Các danh sách bài viết, tài liệu và học phần cần hỗ trợ phân trang.

### 4.2. Security

- Mật khẩu phải được mã hóa bằng thuật toán băm an toàn (bcrypt).
- Sử dụng JWT để xác thực người dùng.
- Phân quyền truy cập theo vai trò.
- Kiểm tra dữ liệu đầu vào từ người dùng.
- Không để lộ thông tin cá nhân của người đánh giá ẩn danh.
- Không lưu thông tin bí mật trong GitHub.

### 4.3. Usability

- Giao diện thân thiện và dễ sử dụng.
- Hỗ trợ giao diện tiếng Việt.
- Responsive trên máy tính và điện thoại.
- Các chức năng chính dễ tiếp cận.

### 4.4. Maintainability

- Phân chia frontend và backend độc lập.
- Backend áp dụng kiến trúc Routes – Controllers – Services – Models.
- Source code được quản lý bằng Git.
- API có cấu trúc nhất quán.

### 4.5. Reliability

- Xử lý lỗi API rõ ràng.
- Kiểm tra dữ liệu trước khi lưu vào MongoDB.
- Có cơ chế xử lý trường hợp kết nối database thất bại.

## 5. Business Rules

| ID | Quy tắc |
|---|---|
| BR-01 | Chỉ người dùng đã đăng nhập mới được tạo bài viết |
| BR-02 | Chỉ chủ sở hữu hoặc Admin mới được xóa bài viết |
| BR-03 | Chỉ Student mới được gửi đánh giá học phần |
| BR-04 | Mỗi Student chỉ có một đánh giá cho mỗi Course trong MVP |
| BR-05 | Thông tin người đánh giá ẩn danh không được công khai |
| BR-06 | Chỉ Admin được quản lý danh sách học phần |
| BR-07 | Chỉ Admin được xử lý báo cáo vi phạm |
| BR-08 | Người dùng không được truy cập chức năng quản trị nếu không có quyền Admin |

## 6. Công nghệ sử dụng (Technology Stack)

| Thành phần | Công nghệ |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcryptjs |
| Version Control | Git, GitHub |
| API Testing | Postman |
| UI Design | Figma |
| Diagram | draw.io |

## 7. Giới hạn và giả định (Constraints and Assumptions)

- Dự án được phát triển bởi một sinh viên.
- Thời gian phát triển là 12 tuần.
- Hệ thống ưu tiên nền tảng web.
- Dữ liệu học phần ban đầu được nhập bởi Admin.
- Người dùng cần có tài khoản để sử dụng chức năng tương tác.
- Hệ thống sử dụng MongoDB để lưu trữ dữ liệu.
- Chức năng xác minh danh tính sinh viên qua email HUST có thể được phát triển ở giai đoạn tiếp theo.

## 8. Tiêu chí nghiệm thu (Acceptance Criteria)

Dự án được xem là đạt yêu cầu MVP khi:

1. Người dùng có thể đăng ký và đăng nhập.
2. Hệ thống phân quyền đúng giữa Student và Admin.
3. Sinh viên có thể xem và tìm kiếm học phần.
4. Sinh viên có thể đăng bài và bình luận.
5. Sinh viên có thể chia sẻ và tải tài liệu.
6. Sinh viên có thể gửi đánh giá học phần ẩn danh.
7. Hệ thống hiển thị thống kê đánh giá.
8. Admin có thể quản lý và kiểm duyệt nội dung.
9. Các chức năng chính được kiểm thử.
10. Hệ thống có thể triển khai và sử dụng trên trình duyệt web.

---