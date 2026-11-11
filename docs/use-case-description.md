# USE CASE DESCRIPTION
## HUST StudyHub – Mạng xã hội học tập dành cho sinh viên HUST

**Phiên bản:** 1.0  
**Dự án:** HUST StudyHub  
**Môn học:** IT3943 – Project 3

---

# 1. Tổng quan

## 1.1. Mục đích

Tài liệu mô tả chi tiết các Use Case chính của hệ thống HUST StudyHub. Tài liệu xác định các tác nhân, điều kiện thực hiện, luồng xử lý chính, luồng ngoại lệ và kết quả của từng chức năng.

## 1.2. Các tác nhân (Actors)

| Actor | Mô tả |
|---|---|
| Guest | Người chưa đăng nhập vào hệ thống. Có thể xem các nội dung công khai và đăng ký tài khoản. |
| Student | Sinh viên đã đăng nhập bằng tài khoản HUST. Có thể đăng bài, bình luận, chia sẻ tài liệu và đánh giá học phần. |
| Admin | Người quản trị hệ thống. Có quyền quản lý tài khoản, học phần và kiểm duyệt nội dung. |

## 1.3. Danh sách Use Case được mô tả

| Mã | Tên Use Case | Actor chính |
|---|---|---|
| UC01 | Register / Login | Guest |
| UC02 | Manage Posts | Student |
| UC03 | Share Materials | Student |
| UC04 | Submit Anonymous Review | Student |
| UC05 | Moderate Content | Admin |

---

# 2. Chi tiết các Use Case

## UC01 – Register / Login

**Mục đích:** Cho phép người dùng đăng ký tài khoản bằng email HUST hoặc đăng nhập vào hệ thống.

**Actor chính:** Guest

**Tiền điều kiện (Preconditions):**
- Người dùng chưa đăng nhập vào hệ thống.
- Người dùng có địa chỉ email hợp lệ.

**Luồng xử lý chính (Main Flow):**

1. Người dùng truy cập trang đăng ký hoặc đăng nhập.
2. Người dùng chọn chức năng đăng ký tài khoản.
3. Hệ thống hiển thị biểu mẫu đăng ký.
4. Người dùng nhập họ tên, email HUST và mật khẩu.
5. Hệ thống kiểm tra định dạng email, mật khẩu và tính duy nhất của email.
6. Hệ thống gửi email xác minh đến địa chỉ đã đăng ký.
7. Người dùng truy cập liên kết xác minh trong email.
8. Hệ thống xác minh email và kích hoạt tài khoản.
9. Người dùng nhập email và mật khẩu để đăng nhập.
10. Hệ thống xác thực thông tin và cấp quyền truy cập.
11. Hệ thống chuyển người dùng đến trang chủ.

**Luồng ngoại lệ (Alternative Flows):**

- 5a. Email không thuộc tên miền `@hust.edu.vn`: Hệ thống thông báo email không hợp lệ.
- 5b. Email đã được sử dụng: Hệ thống yêu cầu sử dụng email khác.
- 5c. Mật khẩu không đáp ứng yêu cầu: Hệ thống hiển thị thông báo lỗi.
- 6a. Không gửi được email xác minh: Hệ thống thông báo lỗi và cho phép gửi lại.
- 7a. Liên kết xác minh hết hạn: Người dùng phải yêu cầu gửi lại email xác minh.
- 10a. Email hoặc mật khẩu không chính xác: Hệ thống từ chối đăng nhập.

**Hậu điều kiện (Postconditions):**

- Tài khoản được tạo và kích hoạt sau khi xác minh email thành công.
- Người dùng đăng nhập thành công và được cấp quyền truy cập phù hợp.

---

## UC02 – Manage Posts

**Mục đích:** Cho phép sinh viên tạo, xem, chỉnh sửa và xóa bài viết thảo luận học tập.

**Actor chính:** Student

**Tiền điều kiện (Preconditions):**

- Sinh viên đã đăng nhập.
- Tài khoản đang hoạt động.

**Luồng xử lý chính (Main Flow):**

1. Sinh viên truy cập mục Discussion.
2. Hệ thống hiển thị danh sách bài viết.
3. Sinh viên chọn chức năng tạo bài viết.
4. Hệ thống hiển thị biểu mẫu tạo bài viết.
5. Sinh viên nhập tiêu đề, nội dung và chọn học phần liên quan.
6. Sinh viên nhấn nút đăng bài.
7. Hệ thống kiểm tra tính hợp lệ của dữ liệu.
8. Hệ thống lưu bài viết vào MongoDB.
9. Hệ thống thông báo đăng bài thành công.
10. Bài viết xuất hiện trong danh sách thảo luận.

**Luồng ngoại lệ (Alternative Flows):**

- 5a. Sinh viên không nhập tiêu đề hoặc nội dung: Hệ thống yêu cầu bổ sung thông tin.
- 7a. Nội dung không hợp lệ: Hệ thống thông báo lỗi.
- 8a. Xảy ra lỗi khi lưu dữ liệu: Hệ thống thông báo đăng bài thất bại.
- 11a. Sinh viên chỉnh sửa bài viết: Hệ thống chỉ cho phép chủ sở hữu chỉnh sửa bài viết của mình.
- 11b. Sinh viên xóa bài viết: Hệ thống yêu cầu xác nhận trước khi xóa.

**Hậu điều kiện (Postconditions):**

- Bài viết mới được lưu vào cơ sở dữ liệu.
- Bài viết có thể được các sinh viên khác xem và bình luận.
- Sinh viên chỉ được chỉnh sửa hoặc xóa bài viết do mình tạo, trừ quyền kiểm duyệt của Admin.

---

## UC03 – Share Materials

**Mục đích:** Cho phép sinh viên chia sẻ tài liệu học tập với cộng đồng.

**Actor chính:** Student

**Tiền điều kiện (Preconditions):**

- Sinh viên đã đăng nhập.
- Tài khoản đang hoạt động.
- Sinh viên có file tài liệu cần chia sẻ.

**Luồng xử lý chính (Main Flow):**

1. Sinh viên truy cập mục Materials.
2. Hệ thống hiển thị danh sách tài liệu.
3. Sinh viên chọn chức năng Upload Material.
4. Hệ thống hiển thị biểu mẫu tải tài liệu.
5. Sinh viên chọn file, nhập tên tài liệu, mô tả và học phần liên quan.
6. Sinh viên xác nhận tải lên.
7. Hệ thống kiểm tra định dạng và dung lượng file.
8. Hệ thống tải file lên dịch vụ Cloud Storage.
9. Dịch vụ Cloud Storage trả về đường dẫn lưu trữ file.
10. Hệ thống lưu thông tin tài liệu và đường dẫn file vào MongoDB.
11. Hệ thống thông báo tải tài liệu thành công.
12. Tài liệu xuất hiện trong danh sách tài liệu của học phần.

**Luồng ngoại lệ (Alternative Flows):**

- 5a. Sinh viên chưa chọn file: Hệ thống yêu cầu chọn file.
- 7a. File không thuộc định dạng được hỗ trợ: Hệ thống từ chối tải lên.
- 7b. Dung lượng file vượt giới hạn: Hệ thống thông báo lỗi.
- 8a. Upload lên Cloud Storage thất bại: Hệ thống thông báo và cho phép thử lại.
- 10a. Không thể lưu metadata vào MongoDB: Hệ thống xử lý lỗi và không hiển thị tài liệu như một bản ghi hoàn tất.

**Hậu điều kiện (Postconditions):**

- File được lưu trên Cloud Storage.
- Metadata và URL của file được lưu trong MongoDB.
- Sinh viên khác có thể xem và tải tài liệu.
- Chủ sở hữu hoặc Admin có thể xóa tài liệu theo quyền hạn.

---

## UC04 – Submit Anonymous Review

**Mục đích:** Cho phép sinh viên gửi đánh giá ẩn danh về các học phần đã học.

**Actor chính:** Student

**Tiền điều kiện (Preconditions):**

- Sinh viên đã đăng nhập.
- Học phần cần đánh giá tồn tại trong hệ thống.

**Luồng xử lý chính (Main Flow):**

1. Sinh viên truy cập mục Course Reviews.
2. Hệ thống hiển thị danh sách học phần và các đánh giá hiện có.
3. Sinh viên chọn học phần muốn đánh giá.
4. Hệ thống hiển thị biểu mẫu đánh giá.
5. Sinh viên nhập điểm đánh giá và nội dung nhận xét.
6. Sinh viên chọn gửi đánh giá.
7. Hệ thống kiểm tra tính hợp lệ của dữ liệu.
8. Hệ thống lưu đánh giá vào MongoDB.
9. Hệ thống không hiển thị thông tin nhận dạng người đánh giá cho người dùng khác.
10. Hệ thống cập nhật danh sách đánh giá và điểm trung bình của học phần.
11. Hệ thống thông báo gửi đánh giá thành công.

**Luồng ngoại lệ (Alternative Flows):**

- 5a. Điểm đánh giá nằm ngoài phạm vi cho phép: Hệ thống yêu cầu nhập lại.
- 5b. Nội dung đánh giá không hợp lệ: Hệ thống yêu cầu chỉnh sửa.
- 7a. Dữ liệu không đầy đủ: Hệ thống yêu cầu bổ sung.
- 8a. Lỗi lưu dữ liệu: Hệ thống thông báo gửi đánh giá thất bại.
- 12a. Sinh viên muốn chỉnh sửa hoặc xóa đánh giá cũ: Hệ thống chỉ cho phép chủ sở hữu thực hiện thao tác này.

**Hậu điều kiện (Postconditions):**

- Đánh giá mới được lưu thành một bản ghi riêng trong MongoDB.
- Một sinh viên được phép gửi nhiều đánh giá cho cùng một học phần.
- Danh tính người đánh giá không được công khai.
- Điểm trung bình của học phần được cập nhật.

---

## UC05 – Moderate Content

**Mục đích:** Cho phép Admin kiểm duyệt bài viết, bình luận, tài liệu và xử lý nội dung bị báo cáo.

**Actor chính:** Admin

**Tiền điều kiện (Preconditions):**

- Admin đã đăng nhập.
- Tài khoản có quyền quản trị hệ thống.

**Luồng xử lý chính (Main Flow):**

1. Admin truy cập trang quản trị.
2. Hệ thống hiển thị danh sách nội dung và các báo cáo vi phạm.
3. Admin chọn nội dung cần kiểm duyệt.
4. Hệ thống hiển thị chi tiết nội dung và thông tin báo cáo liên quan.
5. Admin kiểm tra nội dung.
6. Admin lựa chọn hành động: giữ nguyên, xóa nội dung hoặc xử lý báo cáo.
7. Hệ thống kiểm tra quyền của Admin.
8. Hệ thống cập nhật trạng thái nội dung hoặc báo cáo trong MongoDB.
9. Hệ thống thông báo xử lý thành công.
10. Danh sách nội dung được cập nhật.

**Luồng ngoại lệ (Alternative Flows):**

- 3a. Không có nội dung cần kiểm duyệt: Hệ thống hiển thị danh sách trống.
- 4a. Nội dung không còn tồn tại: Hệ thống thông báo và tải lại danh sách.
- 6a. Admin quyết định giữ nguyên nội dung: Hệ thống ghi nhận kết quả xử lý báo cáo.
- 7a. Người dùng không có quyền Admin: Hệ thống từ chối thao tác.
- 8a. Lỗi cập nhật dữ liệu: Hệ thống thông báo xử lý thất bại.

**Hậu điều kiện (Postconditions):**

- Nội dung vi phạm được xử lý theo quyết định của Admin.
- Báo cáo được cập nhật trạng thái.
- Các thay đổi được lưu trong MongoDB.

---

# 3. Quy tắc nghiệp vụ (Business Rules)

| Mã | Quy tắc |
|---|---|
| BR-01 | Người dùng chỉ được đăng ký bằng email có tên miền `@hust.edu.vn`. |
| BR-02 | Tài khoản phải xác minh email trước khi được kích hoạt. |
| BR-03 | Người dùng phải đăng nhập để tạo bài viết, bình luận, chia sẻ tài liệu và đánh giá học phần. |
| BR-04 | Sinh viên chỉ được chỉnh sửa hoặc xóa nội dung do mình tạo. |
| BR-05 | Một sinh viên được phép gửi nhiều đánh giá cho cùng một học phần. |
| BR-06 | Danh tính người đánh giá không được công khai. |
| BR-07 | Chỉ Admin được phép quản lý học phần và kiểm duyệt nội dung. |
| BR-08 | File tài liệu được lưu trên Cloud Storage; MongoDB chỉ lưu metadata và URL. |
| BR-09 | Quyền truy cập chức năng quản trị chỉ được cấp cho tài khoản có role Admin. |

---

# 4. Kết luận

Tài liệu này mô tả 5 Use Case tiêu biểu của hệ thống HUST StudyHub, bao gồm xác thực người dùng, quản lý bài viết, chia sẻ tài liệu, đánh giá học phần ẩn danh và kiểm duyệt nội dung.

Các Use Case là cơ sở để thiết kế cơ sở dữ liệu, xây dựng API, phát triển giao diện và kiểm thử hệ thống trong các giai đoạn tiếp theo.