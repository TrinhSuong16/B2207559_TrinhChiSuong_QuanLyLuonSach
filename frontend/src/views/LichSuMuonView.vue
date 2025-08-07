<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  font-size: 32px;
  color: #3f51b5;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  font-size: 15px;
  color: #333;
}

.table thead th {
  background-color: #e0e7fa;
  color: #3f51b5;
  padding: 15px 12px;
  text-align: center; /* Căn giữa tiêu đề cột */
  font-weight: 600;
  border-bottom: 2px solid #c5cae9;
  
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
}

.table tbody tr {
  background-color: #ffffff;
  transition: background-color 0.2s ease;
}

.table tbody tr:nth-child(even) {
  background-color: #f8faff;
}

.table tbody tr:hover {
  background-color: #e3f2fd;
  cursor: pointer;
}

.table tbody td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
  text-align: center; /* Căn giữa nội dung ô */
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}
.table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

.text-warning {
  color: #ff9800;
  font-weight: 600;
}
.text-primary {
  color: #2196f3;
  font-weight: 600;
}
.text-success {
  color: #4caf50;
  font-weight: 600;
}
.text-danger {
  color: #f44336;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 5px;
}

td div .text-danger {
  padding-top: 5px;
  border-top: 1px dashed #f44336;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .container {
    margin: 20px auto;
    padding: 15px;
    border-radius: 8px;
  }

  h2 {
    font-size: 26px;
    margin-bottom: 25px;
  }

  .table thead th,
  .table tbody td {
    padding: 10px;
    font-size: 14px;
  }

  .table thead th:first-child {
    border-top-left-radius: 8px;
  }
  .table thead th:last-child {
    border-top-right-radius: 8px;
  }
  .table tbody tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }
  .table tbody tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }

  .text-danger {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .table thead, .table tbody, .table th, .table td, .table tr {
    display: block;
  }

  .table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .table tbody tr {
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .table tbody td {
    border: none;
    position: relative;
    padding-left: 50%;
    text-align: right;
  }

  .table tbody td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    width: calc(50% - 20px);
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: 600;
    color: #555;
  }
}
</style>
<template>
  <div class="container mt-4">
    <h2 class="mb-3">Lịch sử mượn sách</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Tên Sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Số lượng</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in lichSuMuon" :key="m._id">
          <td>{{ gettenSach(m.maSach) || "Không có thông tin" }}</td>
          <td>{{ formatDate(m.ngayMuon) }}</td>
          <td>
            <div>
              {{ formatNgay(m.ngayTra) }}
              <div v-if="isQuaHan(m.ngayMuon, m.ngayTra)" class="text-danger mt-1">
                Mượn quá thời hạn ({{ soNgayTre(m.ngayMuon, m.ngayTra) }} ngày). 
                Phạt thêm {{ soNgayTre(m.ngayMuon, m.ngayTra) * 5000 }}đ
              </div>
            </div>
          </td>
          <td>{{ m.soQuyen }}</td>
          <td>
            <span :class="getStatusClass(m.trangThai)">
              {{ m.trangThai }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { fetchBooks } from '@/services/sachService'

export default {
  data() {
    return {
      lichSuMuon: [],
      sachs: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]), 
  },
  async mounted() {
    try {
      this.sachs = await fetchBooks();
      await this.getLichSuMuon();
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  },
  methods: {    
    async getLichSuMuon() {
      if (!this.getUser) return; 

      try {
        const res = await axios.get("http://localhost:3000/api/theodoi");
        this.lichSuMuon = res.data.filter(m => String(m.maDG) === String(this.getUser._id)); 
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử mượn sách:", error);
      }
    },
    gettenSach(maSach) {
      const sach = this.sachs.find(s => String(s.maSach) === String(maSach));
      return sach ? sach.tenSach : 'Không tìm thấy'
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },
    formatNgay(ngay) {
      if (!ngay) return "Chưa trả"; 
      return new Date(ngay).toLocaleDateString("vi-VN"); 
    },
    getStatusClass(status) {
      return {
        "text-warning": status === "Chờ duyệt",
        "text-primary": status === "Đang mượn",
        "text-success": status === "Đã trả",
      };
    },
    isQuaHan(ngayMuon, ngayTra) {
      if (!ngayMuon || !ngayTra) return false;
      const start = new Date(ngayMuon);
      const end = new Date(ngayTra);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days > 14;
    },
    soNgayTre(ngayMuon, ngayTra) {
      if (!ngayMuon || !ngayTra) return 0;
      const start = new Date(ngayMuon);
      const end = new Date(ngayTra);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days > 14 ? days - 14 : 0;
    },
  }
};
</script>


