<style scoped>
.borrow-list {
  padding: 30px;
  max-width: 1200px;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 32px;
  color: #2c3e50;
  text-shadow: none;
  margin-bottom: 35px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.5px;
}

.page-size {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 25px;
  font-size: 15px;
  color: #555;
  gap: 15px;
}

.page-size label {
  font-weight: 600;
  color: #333;
}

.page-size select {
  padding: 8px 12px;
  border: 1px solid #c0c0c0;
  border-radius: 8px;
  font-size: 15px;
  background: #fdfdfd;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.page-size select:hover {
  border-color: #a0a0a0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.page-size select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.page-size span {
  font-size: 15px;
  color: #555;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

th,
td {
  border: none;
  padding: 14px 10px;
  text-align: center;
  vertical-align: middle;
}

th {
  background: linear-gradient(to right, #4a90e2, #5c7ee6);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 14px;
}

th:first-child { border-top-left-radius: 12px; }
th:last-child { border-top-right-radius: 12px; }

td {
  background-color: #ffffff;
  border-bottom: 1px solid #eef0f3;
}

tbody tr:nth-child(even) td {
  background-color: #f8faff;
}

tbody tr:hover td {
  background-color: #e3f2fd;
  transform: scale(1.005);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

tbody tr:last-child td {
  border-bottom: none;
}
tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}
tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

th:last-child,
td:last-child {
  width: auto;
  min-width: 140px;
  text-align: center;
  padding: 8px;
}

button {
  padding: 8px 12px;
  margin: 3px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button:hover {
  opacity: 1;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

button[style*="background: #4caf50"] {
  background: linear-gradient(to right, #28a745, #218838) !important;
  color: white;
}
button[style*="background: #4caf50"]:hover {
  background: linear-gradient(to right, #218838, #1e7e34) !important;
}

button[style*="background: #f44336"] {
  background: linear-gradient(to right, #dc3545, #c82333) !important;
  color: white;
}
button[style*="background: #f44336"]:hover {
  background: linear-gradient(to right, #c82333, #bd2130) !important;
}

button[style*="background: #ff9800"] {
  background: linear-gradient(to right, #ffc107, #e0a800) !important;
  color: #333;
}
button[style*="background: #ff9800"]:hover {
  background: linear-gradient(to right, #e0a800, #c69500) !important;
}

div[style*="color: red"] {
  color: #e74c3c !important;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 5px;
  border-top: 1px dashed #e74c3c;
  padding-top: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination button {
  padding: 8px 15px;
  border: none;
  background: linear-gradient(to right, #530ef3, #3925ef);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  font-weight: 600;
}

.pagination button:hover {
  background: linear-gradient(to right, #0a6bf2, #4c6dd0);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pagination button:disabled {
  background-color: #d0d0d0;
  color: #999;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.pagination span {
  font-size: 16px;
  color: #444;
  font-weight: 500;
}

@media (max-width: 992px) {
  .borrow-list {
    padding: 25px;
    margin: 30px auto;
  }
  h1 {
    font-size: 28px;
    margin-bottom: 30px;
  }
  th, td {
    padding: 12px 8px;
    font-size: 14px;
  }
  .page-size {
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 25px;
    gap: 10px;
  }
  .pagination button {
    padding: 6px 12px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .borrow-list {
    padding: 20px;
    border-radius: 12px;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 25px;
  }
  .page-size {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 20px;
  }
  .page-size select {
    width: 100px;
  }
  .table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 10px;
  }

  .table thead th:first-child { border-top-left-radius: 10px; }
  .table thead th:last-child { border-top-right-radius: 10px; }
  tbody tr:last-child td:first-child { border-bottom-left-radius: 10px; }
  tbody tr:last-child td:last-child { border-bottom-right-radius: 10px; }

  th, td {
    padding: 10px 8px;
    font-size: 13px;
  }
  th:last-child, td:last-child {
      min-width: 120px;
  }
}

@media (max-width: 576px) {
  .borrow-list {
    padding: 15px;
    margin: 20px auto;
    border-radius: 10px;
  }
  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .page-size {
    font-size: 14px;
  }
  .page-size select {
    padding: 6px 10px;
    font-size: 13px;
  }
  .pagination {
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 8px;
    margin-top: 20px;
  }
  .pagination button {
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 6px;
  }
  .pagination span {
    font-size: 14px;
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
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    padding: 10px;
  }

  .table tbody td {
    border: none;
    position: relative;
    padding-left: 50%;
    text-align: right;
    font-size: 14px;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    flex-shrink: 0;
  }

  .table tbody td[data-label="Ngày trả"] > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  }
  .table tbody td[data-label="Ngày trả"] > div .text-danger {
      text-align: right;
      border-top: none;
      padding-top: 0;
      margin-top: 5px;
      width: 100%;
  }

  .table tbody td[data-label="Thao tác"] {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
  }
  .table tbody td[data-label="Thao tác"]::before {
    display: none;
  }
  .table tbody td[data-label="Thao tác"] button {
    flex-grow: 1;
    margin: 5px;
    font-size: 13px;
    padding: 8px 10px;
  }
}
</style>

<template>
  <div class="borrow-list">
    <h1>Theo dõi mượn sách</h1>

    <InputSearch v-model="search" />

    <div class="page-size mb-2">
      <label for="pageSize">Hiển thị:</label>
      <select v-model="perPage" id="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span> phiếu / trang</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Người mượn</th>
          <th>Tên sách</th>
          <th>Số quyển</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="don in paginatedDonMuon" :key="don._id">
          <td>{{ loadHoTen(don.maDG) }}</td>
          <td>{{ loadSach(don.maSach) }}</td>
          <td>{{ don.soQuyen }}</td>
          <td>{{ formatDate(don.ngayMuon) }}</td>
          <td>
            {{ formatNgay(don.ngayTra) }}
            <div
              v-if="isQuaHan(don.ngayMuon, don.ngayTra)"
              style="color: red; font-size: 0.9rem"
            >
              Mượn quá hạn ({{ soNgayTre(don.ngayMuon, don.ngayTra) }} ngày).
              Phạt thêm {{ soNgayTre(don.ngayMuon, don.ngayTra) * 5000 }}đ
            </div>
          </td>
          <td>{{ don.trangThai }}</td>
          <td>
            <button
              style="background: #4caf50; color: white"
              v-if="don.trangThai === 'Chờ duyệt'"
              @click="$emit('duyetMuon', don)"
            >
              Duyệt
            </button>
            <button
              style="background: #f44336; color: white"
              v-if="don.trangThai === 'Đang mượn'"
              @click="$emit('xacNhanTra', don)"
            >
              Trả
            </button>
            <button
              style="background: #ff9800; color: white"
              v-if="don.trangThai === 'Đã trả'"
              @click="$emit('xoaDonMuon', don)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination mt-3">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i>
        Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Sau
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue'

export default {
  components: { InputSearch },
  props: {
    danhSachDonMuon: Array,
    danhSachDocGia: Array,
    danhSachSach: Array
  },

  data() {
    return {
      books: [],
      currentPage: 1,
      perPage: 10,
      search: ''
    }
  },
  computed: {
    filteredDonMuon() {
      const keyword1 = this.search.normalize("NFC").toLowerCase().trim();
      const keyword2 = this.search.toLowerCase().trim()
      return this.danhSachDonMuon.filter(don => {
        const tenSach = this.loadSach(don.maSach).toLowerCase().trim() || '';
        const hoTen = this.loadHoTen(don.maDG).toLowerCase().trim() || '';
        const trangThai = don.trangThai?.toLowerCase().trim() || '';
        return (
          tenSach.includes(keyword1) ||
          hoTen.includes(keyword2) ||
          trangThai.includes(keyword1)
        );
      });
    },

    totalPages() {
      return Math.ceil(this.filteredDonMuon.length / this.perPage)
    },
    paginatedDonMuon() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredDonMuon.slice(start, end)
    }
  },
  methods: {
    loadHoTen(maDG) {
      const docGia = this.danhSachDocGia.find(dg => dg._id === maDG)
      return docGia ? docGia.tenDG : 'Không tìm thấy'
    },
    loadSach(maSach) {
      const sach = this.danhSachSach.find(s => s.maSach === maSach)
      return sach ? sach.tenSach : 'Không tìm thấy'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN')
    },
    formatNgay(ngay) {
      if (!ngay || ngay === 'null') return 'Chưa trả'
      return new Date(ngay).toLocaleDateString('vi-VN')
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
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
    }
  },
  created() {
    this.danhSachDonMuon.forEach(don => {
      this.loadHoTen(don.maDG, don)
      this.loadSach(don.maSach, don)
    })
  },
  watch: {
    perPage() {
      this.currentPage = 1
    }
  }
}
</script>
