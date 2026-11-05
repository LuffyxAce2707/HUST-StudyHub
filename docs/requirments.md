# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

# HUST StudyHub – Mạng xã hội học tập dành riêng cho sinh viên HUST

**Phiên bản:** 1.1  
**Dự án:** Project 3 – IT3943  
**Nền tảng:** Web Application  
**Thời gian:** 12 tuần  
**Công nghệ:** React, Node.js, Express.js, MongoDB

---

## 1. Giới thiệu

### 1.1. Mục đích

HUST StudyHub là nền tảng mạng xã hội học tập dành cho sinh viên Đại học Bách khoa Hà Nội, hỗ trợ chia sẻ tài liệu, trao đổi kiến thức, thảo luận học phần và đánh giá môn học.

### 1.2. Mục tiêu

- Xây dựng cộng đồng học tập trực tuyến dành riêng cho sinh viên HUST.
- Hỗ trợ chia sẻ và tìm kiếm tài liệu.
- Tạo không gian thảo luận theo học phần.
- Cho phép đánh giá môn học ẩn danh.
- Cung cấp công cụ quản lý và kiểm duyệt nội dung.

### 1.3. Đối tượng sử dụng

| Actor | Mô tả |
|---|---|
| Guest | Người chưa đăng nhập |
| Student | Sinh viên có tài khoản đã xác minh email HUST |
| Admin | Quản trị viên |

## 2. Phạm vi hệ thống

Hệ thống gồm 8 module:

1. Authentication Management
2. User Profile Management
3. Course Management
4. Post Management
5. Comment Management
6. Study Material Management
7. Anonymous Course Review
8. Administration and Moderation

Các chức năng ngoài MVP: Chat realtime, AI chatbot, gợi ý bằng AI, ứng dụng mobile và push notification.

## 3. Yêu cầu chức năng

### 3.1. Authentication Management

| ID | Yêu cầu |
|---|---|
| FR-01 | Người dùng có thể đăng ký tài khoản bằng email HUST |
| FR-02 | Hệ thống chỉ chấp nhận email có tên miền @hust.edu.vn |
| FR-03 | Hệ thống hỗ trợ xác minh quyền sở hữu email trước khi kích hoạt tài khoản |
| FR-04 | Người dùng có thể đăng nhập |
| FR-05 | Người dùng có thể đăng xuất |
| FR-06 | Hệ thống xác thực thông tin đăng nhập |
| FR-07 | Hệ thống phân quyền Student và Admin |
| FR-08 | Người dùng có thể truy xuất thông tin tài khoản |

### 3.2. User Profile Management

| ID | Yêu cầu |
|---|---|
| FR-09 | Sinh viên có thể xem hồ sơ cá nhân |
| FR-10 | Sinh viên có thể cập nhật thông tin cá nhân |
| FR-11 | Sinh viên có thể xem lịch sử bài viết của mình |

### 3.3. Course Management

| ID | Yêu cầu |
|---|---|
| FR-12 | Người dùng có thể xem danh sách học phần |
| FR-13 | Người dùng có thể tìm kiếm học phần |
| FR-14 | Người dùng có thể xem chi tiết học phần |
| FR-15 | Admin có thể thêm học phần |
| FR-16 | Admin có thể cập nhật hoặc xóa học phần |

### 3.4. Post Management

| ID | Yêu cầu |
|---|---|
| FR-17 | Student có thể tạo bài viết |
| FR-18 | Student có thể chỉnh sửa bài viết của mình |
| FR-19 | Student có thể xóa bài viết của mình |
| FR-20 | Người dùng có thể xem danh sách bài viết |
| FR-21 | Người dùng có thể tìm kiếm bài viết |
| FR-22 | Admin có thể kiểm duyệt bài viết |

### 3.5. Comment Management

| ID | Yêu cầu |
|---|---|
| FR-23 | Student có thể bình luận bài viết |
| FR-24 | Student có thể chỉnh sửa bình luận của mình |
| FR-25 | Student có thể xóa bình luận của mình |
| FR-26 | Người dùng có thể xem bình luận |
| FR-27 | Admin có thể xóa bình luận vi phạm |

### 3.6. Study Material Management

| ID | Yêu cầu |
|---|---|
| FR-28 | Student có thể tải tài liệu lên |
| FR-29 | Tài liệu được lưu trữ trên dịch vụ cloud |
| FR-30 | MongoDB lưu metadata và đường dẫn tài liệu |
| FR-31 | Student có thể xem và tải tài liệu |
| FR-32 | Student có thể tìm kiếm tài liệu theo học phần |
| FR-33 | Student có thể xóa tài liệu của mình |
| FR-34 | Admin có thể kiểm duyệt tài liệu |

### 3.7. Anonymous Course Review

| ID | Yêu cầu |
|---|---|
| FR-35 | Student có thể đánh giá học phần |
| FR-36 | Student có thể gửi đánh giá ẩn danh |
| FR-37 | Một Student có thể gửi nhiều đánh giá cho cùng một Course |
| FR-38 | Mỗi đánh giá được lưu thành một bản ghi riêng |
| FR-39 | Student có thể chỉnh sửa hoặc xóa đánh giá của mình |
| FR-40 | Người dùng có thể xem các đánh giá học phần |
| FR-41 | Hệ thống hiển thị điểm đánh giá trung bình |
| FR-42 | Admin có thể kiểm duyệt đánh giá vi phạm |

### 3.8. Administration and Moderation

| ID | Yêu cầu |
|---|---|
| FR-43 | Admin có thể xem danh sách người dùng |
| FR-44 | Admin có thể quản lý tài khoản |
| FR-45 | Admin có thể xem báo cáo vi phạm |
| FR-46 | Admin có thể xử lý báo cáo |
| FR-47 | Admin có thể quản lý nội dung |
| FR-48 | Admin có thể xem thống kê hoạt động |

## 4. Yêu cầu phi chức năng

### 4.1. Performance

- API có thời gian phản hồi hợp lý.
- Hỗ trợ phân trang cho bài viết, tài liệu và học phần.
- Tối ưu truy vấn MongoDB.

### 4.2. Security

- Mật khẩu được băm bằng bcrypt.
- Sử dụng JWT để xác thực.
- Phân quyền theo vai trò.
- Xác minh email HUST trước khi kích hoạt tài khoản.
- Kiểm tra dữ liệu đầu vào.
- Không công khai danh tính người đánh giá ẩn danh.
- Bảo vệ các thông tin bí mật trong biến môi trường.

### 4.3. Usability

- Giao diện tiếng Việt.
- Responsive trên máy tính và điện thoại.
- Các chức năng dễ sử dụng.

### 4.4. Maintainability

- Frontend và backend độc lập.
- Backend sử dụng cấu trúc Routes – Controllers – Services – Models.
- Quản lý mã nguồn bằng Git.

### 4.5. Reliability

- Xử lý lỗi API rõ ràng.
- Kiểm tra dữ liệu trước khi lưu.
- Xử lý lỗi kết nối database và cloud storage.

## 5. Business Rules

| ID | Quy tắc |
|---|---|
| BR-01 | Chỉ email @hust.edu.vn được đăng ký |
| BR-02 | Tài khoản cần xác minh email trước khi kích hoạt |
| BR-03 | Chỉ Student đã đăng nhập mới được đăng bài |
| BR-04 | Chỉ chủ sở hữu hoặc Admin mới được xóa bài viết |
| BR-05 | Student có thể gửi nhiều đánh giá cho cùng một học phần |
| BR-06 | Mỗi đánh giá là một bản ghi riêng biệt |
| BR-07 | Danh tính người đánh giá ẩn danh không được công khai |
| BR-08 | Chỉ Admin được quản lý học phần |
| BR-09 | Chỉ Admin được xử lý báo cáo vi phạm |
| BR-10 | Tài liệu được lưu trên cloud storage |
| BR-11 | MongoDB lưu thông tin metadata và URL tài liệu |
| BR-12 | Người dùng không có quyền Admin không được truy cập chức năng quản trị |

## 6. Technology Stack

| Thành phần | Công nghệ |
|---|---|
| Frontend | React + Vite |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcryptjs |
| Cloud Storage | Cloudinary hoặc dịch vụ tương đương |
| Version Control | Git + GitHub |
| API Testing | Postman |
| UI Design | Figma |
| Diagram | draw.io |

## 7. Constraints and Assumptions

- Dự án được phát triển bởi một sinh viên.
- Thời gian phát triển là 12 tuần.
- Hệ thống ưu tiên nền tảng web.
- Người dùng phải có email HUST hợp lệ.
- Dữ liệu học phần ban đầu được nhập bởi Admin.
- Tài liệu được lưu trên dịch vụ cloud.
- MongoDB lưu trữ dữ liệu hệ thống.
- Chức năng xác minh email sử dụng cơ chế gửi mã hoặc liên kết xác minh.
- Việc xác minh email chứng minh quyền truy cập email, không tự động chứng minh tình trạng sinh viên đang theo học.

## 8. Acceptance Criteria

MVP được xem là đạt yêu cầu khi:

1. Người dùng đăng ký bằng email HUST.
2. Hệ thống xác minh email trước khi kích hoạt tài khoản.
3. Student và Admin có quyền truy cập khác nhau.
4. Sinh viên xem và tìm kiếm học phần.
5. Sinh viên đăng bài và bình luận.
6. Sinh viên chia sẻ và tải tài liệu từ cloud.
7. Sinh viên gửi nhiều đánh giá ẩn danh cho một học phần.
8. Hệ thống thống kê đánh giá chính xác.
9. Admin quản lý và kiểm duyệt nội dung.
10. Các chức năng chính được kiểm thử.
11. Hệ thống hoạt động trên trình duyệt web.

---