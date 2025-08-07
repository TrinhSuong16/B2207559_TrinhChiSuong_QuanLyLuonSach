import axios from "axios";

const API_URL = "http://localhost:3000/api/sach";

export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải sách:", error.response?.data || error.message);
        throw error;
    }
};

export async function createBook(book) {
  try {
    const response = await axios.post(API_URL, book, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm sách:", error.response?.data || error.message);
    throw error;
  }
}

export async function updateBook(book) {
  try {
    const response = await axios.put(`${API_URL}/${book._id}`, book, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error.response?.data || error.message);
    throw error;
  }
}

export async function deleteBook(bookId) {
  try {
    if (!bookId || typeof bookId !== "string") {
      throw new Error("ID sách không hợp lệ");
    }

    const exists = await checkBookExists(bookId);
    if (!exists) {
      throw new Error("Sách không tồn tại hoặc đã bị xóa trước đó");
    }

    await axios.delete(`${API_URL}/${bookId}`);
    console.log("Xóa sách thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error.response?.data || error.message);
    throw error;
  }
}

async function checkBookExists(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data !== null;
    } catch (error) {
        return false;
    }
}