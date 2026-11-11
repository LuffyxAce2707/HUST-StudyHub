# DATABASE DESIGN
## HUST StudyHub – Mạng xã hội học tập dành riêng cho sinh viên HUST

**Phiên bản:** 1.0  
**Database:** MongoDB  
**ODM:** Mongoose  
**Backend:** Node.js + Express

---

# 1. Tổng quan

## 1.1. Mục đích

Tài liệu mô tả thiết kế cơ sở dữ liệu cho hệ thống HUST StudyHub, bao gồm các Collection, cấu trúc Document, kiểu dữ liệu, mối quan hệ giữa các Collection và các ràng buộc dữ liệu.

Cơ sở dữ liệu được thiết kế nhằm hỗ trợ các chức năng:

- Quản lý tài khoản sinh viên và quản trị viên.
- Quản lý học phần.
- Chia sẻ bài viết và thảo luận.
- Bình luận bài viết.
- Chia sẻ và tải tài liệu học tập.
- Đánh giá học phần ẩn danh.
- Báo cáo và kiểm duyệt nội dung.
- Lưu bài viết và tài liệu yêu thích.

## 1.2. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Database | MongoDB |
| ODM | Mongoose |
| Backend | Node.js + Express |
| Authentication | JWT |
| Password Hashing | bcryptjs |
| File Storage | Cloudinary hoặc dịch vụ tương đương |

## 1.3. Quy ước thiết kế

- Mỗi Collection lưu trữ một nhóm dữ liệu có cùng mục đích.
- Mỗi Document sử dụng `_id` kiểu `ObjectId` làm khóa chính.
- Các trường tham chiếu giữa Collection sử dụng `ObjectId`.
- Thông tin mật khẩu được mã hóa bằng bcrypt trước khi lưu.
- File tài liệu được lưu trên Cloud Storage; MongoDB chỉ lưu metadata và URL.
- Các trường thời gian sử dụng kiểu `Date`.
- Các Collection có trường `createdAt` và `updatedAt` khi cần theo dõi thời gian tạo và cập nhật.

---

# 2. Danh sách Collections

Hệ thống gồm 8 Collections chính:

| STT | Collection | Mô tả |
|---|---|---|
| 1 | `users` | Lưu thông tin tài khoản |
| 2 | `courses` | Lưu thông tin học phần |
| 3 | `posts` | Lưu bài viết thảo luận |
| 4 | `comments` | Lưu bình luận |
| 5 | `materials` | Lưu thông tin tài liệu học tập |
| 6 | `reviews` | Lưu đánh giá học phần |
| 7 | `reports` | Lưu báo cáo vi phạm |
| 8 | `bookmarks` | Lưu nội dung được đánh dấu |

---

# 3. Chi tiết thiết kế Collections

## 3.1. Collection: users

**Mục đích:** Lưu thông tin tài khoản của sinh viên và quản trị viên.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID người dùng |
| `fullName` | String | Yes | Họ và tên |
| `email` | String | Yes | Email HUST |
| `password` | String | Yes | Mật khẩu đã hash |
| `role` | String | Yes | STUDENT hoặc ADMIN |
| `avatar` | String | No | URL ảnh đại diện |
| `bio` | String | No | Giới thiệu bản thân |
| `isVerified` | Boolean | Yes | Trạng thái xác minh email |
| `isActive` | Boolean | Yes | Trạng thái tài khoản |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- Email phải thuộc tên miền `@hust.edu.vn`.
- Email không được trùng lặp.
- Password phải được hash bằng bcrypt.
- Role chỉ nhận `STUDENT` hoặc `ADMIN`.
- Tài khoản chưa xác minh email không được kích hoạt.

## 3.2. Collection: courses

**Mục đích:** Lưu danh sách học phần được sử dụng trong hệ thống.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID học phần |
| `courseCode` | String | Yes | Mã học phần |
| `courseName` | String | Yes | Tên học phần |
| `description` | String | No | Mô tả học phần |
| `credits` | Number | No | Số tín chỉ |
| `department` | String | No | Khoa hoặc viện phụ trách |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- `courseCode` không được trùng lặp.
- `courseName` không được để trống.
- Chỉ Admin được thêm, chỉnh sửa và xóa học phần.

## 3.3. Collection: posts

**Mục đích:** Lưu các bài viết thảo luận và chia sẻ kiến thức của sinh viên.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID bài viết |
| `authorId` | ObjectId | Yes | ID người tạo bài viết |
| `courseId` | ObjectId | No | ID học phần liên quan |
| `title` | String | Yes | Tiêu đề |
| `content` | String | Yes | Nội dung |
| `tags` | Array of String | No | Danh sách thẻ |
| `status` | String | Yes | Trạng thái bài viết |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- `authorId` tham chiếu đến `users`.
- `courseId` tham chiếu đến `courses`.
- Chỉ chủ sở hữu hoặc Admin được phép xóa bài viết.
- Status có thể gồm `ACTIVE`, `HIDDEN`, `DELETED`.

## 3.4. Collection: comments

**Mục đích:** Lưu các bình luận của sinh viên trên bài viết.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID bình luận |
| `postId` | ObjectId | Yes | ID bài viết |
| `authorId` | ObjectId | Yes | ID người bình luận |
| `content` | String | Yes | Nội dung bình luận |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- `postId` tham chiếu đến `posts`.
- `authorId` tham chiếu đến `users`.
- Chỉ chủ sở hữu hoặc Admin được xóa bình luận.
- Không cho phép bình luận vào bài viết đã bị xóa hoặc ẩn.

## 3.5. Collection: materials

**Mục đích:** Lưu thông tin các tài liệu học tập được chia sẻ.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID tài liệu |
| `uploaderId` | ObjectId | Yes | ID người tải lên |
| `courseId` | ObjectId | Yes | ID học phần |
| `title` | String | Yes | Tên tài liệu |
| `description` | String | No | Mô tả |
| `fileUrl` | String | Yes | URL file trên Cloud Storage |
| `publicId` | String | No | ID file trên Cloud Storage |
| `fileName` | String | Yes | Tên file gốc |
| `fileType` | String | Yes | Loại file |
| `fileSize` | Number | Yes | Dung lượng file (bytes) |
| `downloadCount` | Number | Yes | Số lượt tải |
| `status` | String | Yes | Trạng thái tài liệu |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- `uploaderId` tham chiếu đến `users`.
- `courseId` tham chiếu đến `courses`.
- File được lưu trên Cloud Storage, không lưu trực tiếp trong MongoDB.
- Chỉ chủ sở hữu hoặc Admin được xóa tài liệu.
- Status có thể gồm `ACTIVE`, `HIDDEN`, `DELETED`.

## 3.6. Collection: reviews

**Mục đích:** Lưu đánh giá và nhận xét ẩn danh về các học phần.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID đánh giá |
| `courseId` | ObjectId | Yes | ID học phần |
| `authorId` | ObjectId | Yes | ID người đánh giá |
| `rating` | Number | Yes | Điểm đánh giá từ 1 đến 5 |
| `content` | String | Yes | Nội dung nhận xét |
| `status` | String | Yes | Trạng thái đánh giá |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- `courseId` tham chiếu đến `courses`.
- `authorId` tham chiếu đến `users`.
- Điểm đánh giá phải nằm trong khoảng từ 1 đến 5.
- Một sinh viên được phép tạo nhiều đánh giá cho cùng một học phần.
- Không tạo unique index kết hợp `authorId` và `courseId`.
- Người khác không được xem `authorId` của đánh giá.
- Chỉ chủ sở hữu hoặc Admin được chỉnh sửa hoặc xóa đánh giá theo quyền hạn.

**Lưu ý về tính ẩn danh:**

`authorId` vẫn được lưu trong MongoDB để xác định chủ sở hữu, phục vụ chức năng chỉnh sửa, xóa và kiểm duyệt. Backend phải loại bỏ trường này khỏi dữ liệu trả về cho người dùng thông thường.

## 3.7. Collection: reports

**Mục đích:** Lưu các báo cáo vi phạm nội dung do sinh viên gửi.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID báo cáo |
| `reporterId` | ObjectId | Yes | ID người báo cáo |
| `targetType` | String | Yes | Loại nội dung |
| `targetId` | ObjectId | Yes | ID nội dung bị báo cáo |
| `reason` | String | Yes | Lý do báo cáo |
| `description` | String | No | Mô tả chi tiết |
| `status` | String | Yes | Trạng thái xử lý |
| `handledBy` | ObjectId | No | ID Admin xử lý |
| `handledAt` | Date | No | Thời gian xử lý |
| `createdAt` | Date | Yes | Ngày tạo |
| `updatedAt` | Date | Yes | Ngày cập nhật |

**Ràng buộc:**
- `reporterId` tham chiếu đến `users`.
- `handledBy` tham chiếu đến `users`.
- `targetType` gồm `POST`, `COMMENT`, `MATERIAL`, `REVIEW`.
- `status` gồm `PENDING`, `RESOLVED`, `REJECTED`.
- Chỉ Admin được xử lý báo cáo.

## 3.8. Collection: bookmarks

**Mục đích:** Lưu các bài viết và tài liệu mà sinh viên muốn đánh dấu để xem lại.

| Field | Data Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | ID bookmark |
| `userId` | ObjectId | Yes | ID người dùng |
| `targetType` | String | Yes | Loại nội dung |
| `targetId` | ObjectId | Yes | ID bài viết hoặc tài liệu |
| `createdAt` | Date | Yes | Ngày tạo |

**Ràng buộc:**
- `userId` tham chiếu đến `users`.
- `targetType` gồm `POST` hoặc `MATERIAL`.
- Một người dùng không được bookmark trùng cùng một nội dung.

---

# 4. Mối quan hệ giữa các Collections

MongoDB sử dụng tham chiếu ObjectId để biểu diễn các mối quan hệ giữa các Collection.

| Collection A | Relationship | Collection B | Mô tả |
|---|---|---|---|
| users | 1 - N | posts | Một người dùng có thể tạo nhiều bài viết |
| users | 1 - N | comments | Một người dùng có thể tạo nhiều bình luận |
| users | 1 - N | materials | Một người dùng có thể tải lên nhiều tài liệu |
| users | 1 - N | reviews | Một người dùng có thể tạo nhiều đánh giá |
| users | 1 - N | reports | Một người dùng có thể gửi nhiều báo cáo |
| users | 1 - N | bookmarks | Một người dùng có thể lưu nhiều nội dung |
| courses | 1 - N | posts | Một học phần có thể có nhiều bài viết |
| courses | 1 - N | materials | Một học phần có thể có nhiều tài liệu |
| courses | 1 - N | reviews | Một học phần có thể có nhiều đánh giá |
| posts | 1 - N | comments | Một bài viết có thể có nhiều bình luận |

---

# 5. Database Indexing

Để cải thiện hiệu suất truy vấn, hệ thống sử dụng các Index sau:

| Collection | Field | Index Type | Mục đích |
|---|---|---|---|
| users | email | Unique | Đảm bảo email không trùng |
| courses | courseCode | Unique | Đảm bảo mã học phần không trùng |
| posts | courseId, createdAt | Compound | Lấy bài viết theo học phần và thời gian |
| posts | authorId | Normal | Lấy bài viết theo người tạo |
| comments | postId, createdAt | Compound | Lấy bình luận theo bài viết |
| materials | courseId, createdAt | Compound | Lấy tài liệu theo học phần |
| reviews | courseId, createdAt | Compound | Lấy đánh giá theo học phần |
| reports | status, createdAt | Compound | Lấy báo cáo đang chờ xử lý |
| bookmarks | userId, targetType, targetId | Unique Compound | Ngăn bookmark trùng |

**Lưu ý:** Không tạo unique index trên cặp `authorId` và `courseId` trong Collection `reviews`, vì hệ thống cho phép một sinh viên đánh giá nhiều lần cùng một học phần.

---

# 6. Bảo mật và toàn vẹn dữ liệu

## 6.1. Bảo mật tài khoản

- Mật khẩu được hash bằng bcryptjs.
- JWT được sử dụng để xác thực người dùng.
- Các API cần kiểm tra quyền truy cập trước khi thực hiện thao tác.
- Không trả về trường password trong API response.
- Email chỉ được xác minh trước khi kích hoạt tài khoản.

## 6.2. Phân quyền

| Chức năng | Guest | Student | Admin |
|---|---|---|---|
| Xem nội dung công khai | Yes | Yes | Yes |
| Đăng bài | No | Yes | Yes |
| Bình luận | No | Yes | Yes |
| Upload tài liệu | No | Yes | Yes |
| Đánh giá học phần | No | Yes | Yes |
| Báo cáo nội dung | No | Yes | Yes |
| Quản lý người dùng | No | No | Yes |
| Quản lý học phần | No | No | Yes |
| Kiểm duyệt nội dung | No | No | Yes |

## 6.3. Toàn vẹn dữ liệu

- Sử dụng Mongoose Schema để kiểm tra kiểu dữ liệu và giá trị hợp lệ.
- Kiểm tra sự tồn tại của ObjectId tham chiếu trước khi tạo dữ liệu liên quan.
- Không cho phép xóa dữ liệu nếu thao tác gây ra tham chiếu không hợp lệ mà chưa xử lý các dữ liệu liên quan.
- Sử dụng soft delete cho nội dung cần lưu lịch sử kiểm duyệt.
- Sử dụng unique index để ngăn dữ liệu trùng lặp ở những trường cần thiết.

---

# 7. Tổng kết

Cơ sở dữ liệu HUST StudyHub được thiết kế với 8 Collections chính, đáp ứng các chức năng cốt lõi của mạng xã hội học tập.

Thiết kế sử dụng MongoDB với các tham chiếu ObjectId, kết hợp Mongoose để quản lý cấu trúc và kiểm tra dữ liệu.

Các Collection có thể được mở rộng trong tương lai để hỗ trợ thêm những chức năng như thông báo, tin nhắn trực tiếp, gợi ý tài liệu và thống kê hoạt động học tập.