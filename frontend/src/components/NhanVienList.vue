
<template>
  <div class="nhanvien-list">
    <h2>Danh sách nhân viên</h2>

    <InputSearch v-model="search" />

    <div class="page-size mb-2">
      <label for="pageSize">Hiển thị:</label>
      <select v-model="perPage" id="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span>nhân viên / trang</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Chức vụ</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanvien in paginatedNhanViens" :key="nhanvien._id">
          <td>{{ nhanvien.hotenNV }}</td>
          <td>{{ nhanvien.dienthoaiNV }}</td>
          <td>
            {{ nhanvien.chucvu === 'quanly' ? 'Quản lý' : 'Nhân viên' }}
          </td>
          <td>
            <button
              class="delete-btn"
              @click="$emit('deleteNhanVien', nhanvien._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
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
      nhanViens: { type: Array, required: true }
    },
    data() {
      return {
        currentPage: 1,
        perPage: 5,
        search: ''
      }
    },
    computed: {
      filteredNhanViens() {
        const keyword = this.search.normalize("NFC").toLowerCase().trim();
        return this.nhanViens.filter(nhanvien => {
          const hoTen = nhanvien.hotenNV ? nhanvien.hotenNV.toLowerCase() : ''
          const soDienThoai = nhanvien.dienthoaiNV
            ? nhanvien.dienthoaiNV.toLowerCase()
            : ''
          const chucVu =
            nhanvien.chucvu === 'quanly' ? 'quản lý' : 'nhân viên'

          return (
            hoTen.includes(keyword) ||
            soDienThoai.includes(keyword) ||
            chucVu.includes(keyword)
          )
        })
      },
      totalPages() {
        return Math.ceil(this.nhanViens.length / this.perPage)
      },
      paginatedNhanViens() {
        const start = (this.currentPage - 1) * this.perPage
        const end = start + this.perPage
        return this.filteredNhanViens.slice(start, end)
      }
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
      }
    },
    watch: {
      perPage() {
        this.currentPage = 1
      }
    }
  }
</script>
<style scoped>
.nhanvien-list-container {
  padding: 30px;
  max-width: 1000px;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  font-size: 32px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 35px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search-and-page-size-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.page-size {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 15px;
  color: #555;
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
  margin-top: 20px;
  color: #333;
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
  cursor: pointer;
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
  min-width: 100px;
  text-align: center;
  padding: 8px;
}

.delete-btn {
  background: linear-gradient(to right, #dc3545, #c82333);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-width: 60px;
}

.delete-btn:hover {
  background: linear-gradient(to right, #c82333, #bd2130);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.delete-btn:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(to right, #4a90e2, #5c7ee6);
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
  background: linear-gradient(to right, #3a7bd5, #4c6dd0);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pagination button:disabled {
  background-color: #d0d0d0;
  color: #f7f6f6;
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
  .nhanvien-list-container {
    padding: 25px;
    margin: 30px auto;
  }
  h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }
  th, td {
    padding: 12px 8px;
    font-size: 14px;
  }
  .search-and-page-size-group {
    gap: 15px;
    margin-bottom: 20px;
  }
  .page-size {
    gap: 10px;
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
  .nhanvien-list-container {
    padding: 20px;
    border-radius: 12px;
  }
  h2 {
    font-size: 24px;
    margin-bottom: 25px;
  }
  .search-and-page-size-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
  }
  .page-size {
    flex-direction: row; /* Giữ cùng hàng */
    align-self: flex-start; /* Căn trái */
  }
  .page-size select {
    width: 100px;
  }
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 10px;
  }

  table thead th:first-child { border-top-left-radius: 10px; }
  table thead th:last-child { border-top-right-radius: 10px; }
  tbody tr:last-child td:first-child { border-bottom-left-radius: 10px; }
  tbody tr:last-child td:last-child { border-bottom-right-radius: 10px; }

  th, td {
    padding: 10px 8px;
    font-size: 13px;
  }
  th:last-child, td:last-child {
      min-width: 80px;
  }
  .delete-btn {
    padding: 7px 10px;
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .nhanvien-list-container {
    padding: 15px;
    margin: 20px auto;
    border-radius: 10px;
  }
  h2 {
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

  table thead, table tbody, table th, table td, table tr {
    display: block;
  }

  table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  table tbody tr {
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    padding: 10px;
  }

  table tbody td {
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

  table tbody td::before {
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
  table tbody td[data-label="Thao tác"] {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
  }
  table tbody td[data-label="Thao tác"]::before {
    display: none;
  }
  table tbody td[data-label="Thao tác"] .delete-btn {
    flex-grow: 1;
    margin: 5px;
    font-size: 13px;
    padding: 8px 10px;
  }
}
</style>