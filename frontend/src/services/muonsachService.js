import axios from "axios";

const API_URL = "http://localhost:3000/api/sach";

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const dangKyMuonSach = async (docGiaID, maSach, quantity, ngayMuon) => {
  console.log("Thông tin mượn sách:", { docGiaID, maSach, quantity, ngayMuon });
  if (!ngayMuon) {
    console.error("Lỗi: ngày mượn hoặc ngày trả không hợp lệ", { ngayMuon });
    return Promise.reject(new Error("Ngày mượn và ngày trả không được để trống"));
  }

  const requestData = {
    docGiaID,
    maSach,
    soQuyen: quantity,
    ngayMuon,
    };

  try {
    await axios.post("http://localhost:3000/api/theodoi/dangKyMuonSach", requestData);
  } catch (error) {
    console.error("Lỗi khi gọi API mượn sách:", error.response?.data || error.message);
    throw error; 
  }
};

