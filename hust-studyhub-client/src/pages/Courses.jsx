import "../styles/pages/Courses.css";
import { useMemo, useState } from "react";
import { Search, BookOpen, GraduationCap } from "lucide-react";
import CourseCard from "../components/CourseCard";

const sampleCourses = [
  {
    id: "MI1110",
    code: "MI1110",
    name: "Giải tích I",
    credits: 3,
    department: "Viện Toán ứng dụng và Tin học",
    rating: 4.6,
    reviewCount: 128,
    materialCount: 42,
    studentCount: 1248,
  },
  {
    id: "IT1110",
    code: "IT1110",
    name: "Tin học đại cương",
    credits: 3,
    department: "Trường Công nghệ thông tin và TT",
    rating: 4.8,
    reviewCount: 96,
    materialCount: 38,
    studentCount: 986,
  },
  {
    id: "PH1110",
    code: "PH1110",
    name: "Vật lý đại cương I",
    credits: 3,
    department: "Viện Vật lý kỹ thuật",
    rating: 4.5,
    reviewCount: 84,
    materialCount: 31,
    studentCount: 842,
  },
  {
    id: "IT3080",
    code: "IT3080",
    name: "Cấu trúc dữ liệu & Giải thuật",
    credits: 3,
    department: "Trường Công nghệ thông tin và TT",
    rating: 4.7,
    reviewCount: 112,
    materialCount: 56,
    studentCount: 764,
  },
  {
    id: "MI1140",
    code: "MI1140",
    name: "Đại số",
    credits: 3,
    department: "Viện Toán ứng dụng và Tin học",
    rating: 4.4,
    reviewCount: 73,
    materialCount: 28,
    studentCount: 698,
  },
  {
    id: "ET2020",
    code: "ET2020",
    name: "Tín hiệu và hệ thống",
    credits: 3,
    department: "Trường Điện - Điện tử",
    rating: 4.6,
    reviewCount: 65,
    materialCount: 24,
    studentCount: 512,
  },
];

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const departments = [
    ...new Set(sampleCourses.map((course) => course.department)),
  ];

  const filteredCourses = useMemo(() => {
    let result = sampleCourses.filter((course) => {
      const keyword = searchTerm.toLowerCase().trim();

      const matchesSearch =
        course.code.toLowerCase().includes(keyword) ||
        course.name.toLowerCase().includes(keyword);

      const matchesDepartment =
        selectedDepartment === "all" ||
        course.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });

    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name, "vi")
      );
    } else {
      result = [...result].sort(
        (a, b) => b.studentCount - a.studentCount
      );
    }

    return result;
  }, [searchTerm, selectedDepartment, sortBy]);

  return (
    <div className="courses-page">
      <div className="page-heading">
        <span className="page-eyebrow">HỌC PHẦN</span>
        <h1>Khám phá học phần</h1>
        <p>
          Tìm tài liệu, trao đổi và góc nhìn từ những người đã học.
        </p>
      </div>

      <div className="course-filters">
        <div className="course-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Tìm theo mã hoặc tên học phần..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={selectedDepartment}
          onChange={(event) =>
            setSelectedDepartment(event.target.value)
          }
          aria-label="Lọc theo viện hoặc trường"
        >
          <option value="all">Tất cả viện / trường</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div className="courses-section-heading">
        <h2>Học phần dành cho bạn</h2>

        <div className="course-sort">
          <span>{filteredCourses.length} học phần</span>
          <span>·</span>
          <label htmlFor="course-sort">Sắp xếp:</label>
          <select
            id="course-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="popular">Được quan tâm nhất</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="name">Tên học phần</option>
          </select>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-courses">
          <BookOpen size={36} />
          <h3>Không tìm thấy học phần</h3>
          <p>
            Thử tìm bằng mã học phần hoặc chọn viện / trường khác.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDepartment("all");
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      <div className="course-suggestion">
        <div className="suggestion-icon">
          <GraduationCap size={28} />
        </div>

        <div>
          <h3>Chưa tìm thấy học phần bạn cần?</h3>
          <p>
            Hãy thử tìm bằng mã học phần hoặc chọn viện / trường.
          </p>
        </div>

        <button
          className="suggestion-button"
          onClick={() => {
            setSearchTerm("");
            setSelectedDepartment("all");
          }}
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}

export default Courses;
