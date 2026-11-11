import "../styles/pages/Materials.css";
import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Download,
  UploadCloud,
  BookOpen,
  X,
  File,
} from "lucide-react";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext";

const sampleMaterials = [
  {
    id: 1,
    title: "Bài giảng Đại số tuyến tính",
    course: "MI1110",
    courseName: "Đại số tuyến tính",
    fileName: "bai-giang-dai-so.pdf",
    fileType: "PDF",
    fileSize: "2.4 MB",
    uploader: "Nguyễn Văn A",
    date: "05/11/2026",
    downloads: 125,
  },
  {
    id: 2,
    title: "Bài tập Giải tích I",
    course: "MI1111",
    courseName: "Giải tích I",
    fileName: "bai-tap-giai-tich.docx",
    fileType: "DOCX",
    fileSize: "850 KB",
    uploader: "Trần Thị B",
    date: "03/11/2026",
    downloads: 86,
  },
  {
    id: 3,
    title: "Đề thi lập trình C cơ bản",
    course: "IT1110",
    courseName: "Tin học đại cương",
    fileName: "de-thi-lap-trinh.zip",
    fileType: "ZIP",
    fileSize: "5.1 MB",
    uploader: "Lê Văn C",
    date: "01/11/2026",
    downloads: 210,
  },
  {
    id: 4,
    title: "Tóm tắt Vật lý đại cương",
    course: "PH1110",
    courseName: "Vật lý đại cương",
    fileName: "tom-tat-vat-ly.pdf",
    fileType: "PDF",
    fileSize: "1.8 MB",
    uploader: "Phạm Thị D",
    date: "28/10/2026",
    downloads: 64,
  },
];

const courses = [
  { code: "ALL", name: "Tất cả học phần" },
  { code: "MI1110", name: "Đại số tuyến tính" },
  { code: "MI1111", name: "Giải tích I" },
  { code: "IT1110", name: "Tin học đại cương" },
  { code: "PH1110", name: "Vật lý đại cương" },
];

function Materials() {
  const [materials, setMaterials] = useState(sampleMaterials);
  const [keyword, setKeyword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [formData, setFormData] = useState({
    title: "",
    course: "MI1110",
    file: null,
  });

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesKeyword =
        material.title.toLowerCase().includes(keyword.toLowerCase()) ||
        material.course.toLowerCase().includes(keyword.toLowerCase());

      const matchesCourse =
        selectedCourse === "ALL" || material.course === selectedCourse;

      const matchesType =
        selectedType === "ALL" || material.fileType === selectedType;

      return matchesKeyword && matchesCourse && matchesType;
    });
  }, [materials, keyword, selectedCourse, selectedType]);

  const handleUpload = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.file) {
      alert("Vui lòng nhập tên tài liệu và chọn file.");
      return;
    }

    const course = courses.find(
      (item) => item.code === formData.course
    );

    const extension = formData.file.name.split(".").pop().toUpperCase();

    const newMaterial = {
      id: Date.now(),
      title: formData.title,
      course: formData.course,
      courseName: course?.name || formData.course,
      fileName: formData.file.name,
      fileType: extension,
      fileSize: `${(formData.file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploader: "Bạn",
      date: new Date().toLocaleDateString("vi-VN"),
      downloads: 0,
    };

    setMaterials((previous) => [newMaterial, ...previous]);
    setFormData({ title: "", course: "MI1110", file: null });
    setShowUploadForm(false);
  };

  const handleDownload = (material) => {
    alert(
      `Đây là dữ liệu mẫu. Chức năng tải "${material.fileName}" sẽ hoạt động khi kết nối backend và Cloudinary.`
    );
  };

  return (
    <div className="materials-page">
      <div className="page-heading">
        <span className="page-eyebrow">THƯ VIỆN HỌC TẬP</span>
        <h1>Tài liệu học tập</h1>
        <p>
          Khám phá, chia sẻ và lưu trữ tài liệu học tập từ cộng đồng sinh viên HUST.
        </p>
      </div>

      <div className="materials-toolbar">
        <div className="materials-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu hoặc mã học phần..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>

        <select
          value={selectedCourse}
          onChange={(event) => setSelectedCourse(event.target.value)}
        >
          {courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value="ALL">Tất cả định dạng</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="ZIP">ZIP</option>
        </select>

        <button
          className="upload-material-button"
          onClick={() => setShowUploadForm(!showUploadForm)}
        >
          <UploadCloud size={18} />
          Tải lên tài liệu
        </button>
      </div>

      {showUploadForm && (
        <section className="upload-material-form">
          <div className="upload-form-heading">
            <div>
              <h2>Chia sẻ tài liệu mới</h2>
              <p>Thêm tài liệu để chia sẻ với sinh viên khác.</p>
            </div>
            <button
              className="close-upload-button"
              onClick={() => setShowUploadForm(false)}
              aria-label="Đóng biểu mẫu"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleUpload}>
            <label>
              Tên tài liệu
              <input
                type="text"
                placeholder="Ví dụ: Bài giảng chương 1"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                required
              />
            </label>

            <label>
              Học phần
              <select
                value={formData.course}
                onChange={(event) =>
                  setFormData({ ...formData, course: event.target.value })
                }
              >
                {courses
                  .filter((course) => course.code !== "ALL")
                  .map((course) => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Chọn file
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    file: event.target.files?.[0] || null,
                  })
                }
                required
              />
            </label>

            <div className="upload-form-actions">
              <button type="submit">
                <UploadCloud size={17} />
                Thêm tài liệu
              </button>
              <button
                type="button"
                className="cancel-upload-button"
                onClick={() => setShowUploadForm(false)}
              >
                Hủy
              </button>
            </div>
          </form>

          <p className="upload-demo-note">
            Lưu ý: Đây mới là mô phỏng frontend. File chưa được tải lên máy chủ
            hoặc Cloudinary.
          </p>
        </section>
      )}

      <div className="materials-section-heading">
        <div>
          <h2>Thư viện tài liệu</h2>
          <p>{filteredMaterials.length} tài liệu được tìm thấy</p>
        </div>
      </div>

      {filteredMaterials.length > 0 ? (
        <div className="materials-list">
          {filteredMaterials.map((material) => (
            <article className="material-card" key={material.id}>
              <div className={`material-file-icon ${material.fileType.toLowerCase()}`}>
                <FileText size={25} />
                <span>{material.fileType}</span>
              </div>

              <div className="material-info">
                <h3>{material.title}</h3>

                <div className="material-course">
                  <BookOpen size={14} />
                  {material.course} · {material.courseName}
                </div>

                <div className="material-meta">
                  <span>{material.fileName}</span>
                  <span>{material.fileSize}</span>
                  <span>Đăng bởi {material.uploader}</span>
                  <span>{material.date}</span>
                </div>
              </div>

              {/* Nút bookmark */}
              <button
                className={`bookmark-button ${
                  isBookmarked("MATERIAL", material.id ?? material._id)
                    ? "saved"
                    : ""
                }`}
                onClick={() => toggleBookmark("MATERIAL", material)}
                aria-label={
                  isBookmarked("MATERIAL", material.id ?? material._id)
                    ? "Bỏ lưu tài liệu"
                    : "Lưu tài liệu"
                }
                title={
                  isBookmarked("MATERIAL", material.id ?? material._id)
                    ? "Bỏ lưu"
                    : "Lưu tài liệu"
                }
              >
                <Bookmark
                  size={19}
                  fill={
                    isBookmarked("MATERIAL", material.id ?? material._id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <div className="material-download">
                <span>{material.downloads} lượt tải</span>
                <button
                  onClick={() => handleDownload(material)}
                  title="Tải tài liệu"
                >
                  <Download size={17} />
                  Tải xuống
                </button>
              </div>
            </article>

          ))}
        </div>
      ) : (
        <div className="empty-materials">
          <File size={38} />
          <h3>Không tìm thấy tài liệu</h3>
          <p>Thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
        </div>
      )}
    </div>
  );
}

export default Materials;