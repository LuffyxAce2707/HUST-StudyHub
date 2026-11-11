
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const BookmarkContext = createContext(null);

const STORAGE_KEY = "hust-studyhub-bookmarks";

// Lấy dữ liệu đã lưu từ localStorage
function getInitialBookmarks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Không thể đọc bookmarks:", error);
    return [];
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(getInitialBookmarks);

  // Đồng bộ state với localStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Không thể lưu bookmarks:", error);
    }
  }, [bookmarks]);

  // Kiểm tra một đối tượng đã được lưu chưa
  const isBookmarked = (targetType, targetId) => {
    if (!targetId) return false;

    return bookmarks.some(
      (item) =>
        item.targetType === targetType &&
        String(item.targetId) === String(targetId)
    );
  };

  // Thêm một đối tượng vào danh sách
  const addBookmark = (targetType, data) => {
    const targetId = data?.id ?? data?._id;

    if (!targetId) {
      console.error("Đối tượng cần lưu phải có id hoặc _id");
      return;
    }

    setBookmarks((prev) => {
      const existed = prev.some(
        (item) =>
          item.targetType === targetType &&
          String(item.targetId) === String(targetId)
      );

      if (existed) return prev;

      return [
        ...prev,
        {
          targetType,
          targetId: String(targetId),
          data,
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  // Xóa một đối tượng khỏi danh sách
  const removeBookmark = (targetType, targetId) => {
    setBookmarks((prev) =>
      prev.filter(
        (item) =>
          !(
            item.targetType === targetType &&
            String(item.targetId) === String(targetId)
          )
      )
    );
  };

  // Thêm nếu chưa lưu, bỏ lưu nếu đã lưu
  const toggleBookmark = (targetType, data) => {
    const targetId = data?.id ?? data?._id;

    if (!targetId) {
      console.error("Đối tượng cần lưu phải có id hoặc _id");
      return;
    }

    if (isBookmarked(targetType, targetId)) {
      removeBookmark(targetType, targetId);
    } else {
      addBookmark(targetType, data);
    }
  };

  const value = useMemo(
    () => ({
      bookmarks,
      isBookmarked,
      addBookmark,
      removeBookmark,
      toggleBookmark,
    }),
    [bookmarks]
  );

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

// Hook để các component sử dụng BookmarkContext
export function useBookmarks() {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error(
      "useBookmarks phải được sử dụng bên trong BookmarkProvider"
    );
  }

  return context;
}