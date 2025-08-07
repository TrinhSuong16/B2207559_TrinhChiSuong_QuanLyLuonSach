
<template>
  <div class="page-size mb-2">
    <label for="pageSize">Hiển thị:</label>
    <select v-model="perPage" id="pageSize">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    <span>sách / trang</span>
  </div>

  <div>
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>Mã Sách</th>
          <th>Tên Sách</th>
          <th>Tác giả</th>
          <th>Nhà Xuất Bản</th>
          <th>Số Lượng</th>
          <th>Đơn Giá</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in paginatedBooks" :key="book._id">
          <td>{{ book.maSach || 'Không có mã' }}</td>
          <td>{{ book.tenSach || 'Không có tên' }}</td>
          <td>{{ book.tacGia || 'Không có tên' }}</td>
          <td>{{ getNXBName(book.maNXB) }}</td>
          <td>
            {{ book.soQuyen !== undefined ? book.soQuyen : 'Không có dữ liệu' }}
          </td>
          <td>{{ formatCurrency(book.donGia) }}</td>
          <td>
            <div class="button-group">
              <button
                class="btn btn-warning btn-sm mx-1"
                @click="$emit('edit', book)"
              >
                Sửa
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="$emit('delete', book._id)"
              >
                Xóa
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i>
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      books: { type: Array, required: true },
      nxbs: { type: Array, required: true }
    },
    data() {
      return {
        currentPage: 1,
        perPage: 10
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.books.length / this.perPage)
      },
      paginatedBooks() {
        const start = (this.currentPage - 1) * this.perPage
        return this.books.slice(start, start + this.perPage)
      }
    },
    emits: ['edit', 'delete'],
    methods: {
      prevPage() {
        if (this.currentPage > 1) this.currentPage--
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++
      },
      getNXBName(maNXB) {
        if (!maNXB || !this.nxbs) return 'Chưa có NXB';

        const manxb = typeof maNXB === 'object' ? maNXB.toString() : String(maNXB);

        const nxb = this.nxbs.find(n => 
          String(n.maNXB) === manxb || String(n._id) === manxb
        );

        return nxb ? nxb.tenNXB : 'Không tìm thấy';
      },
      formatCurrency(value) {
        if (value == null || isNaN(value)) return 'Không có giá'
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(value)
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
/* Container cho phần lựa chọn số lượng hiển thị */
.page-size {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 25px; /* Tăng khoảng cách dưới phần chọn */
  font-size: 15px;
  color: #555;
  gap: 15px; /* Khoảng cách giữa các phần tử */
}

.page-size label {
  font-weight: 600; /* Đậm hơn một chút */
  color: #333;
}

.page-size select {
  padding: 8px 12px; /* Tăng padding cho select */
  border: 1px solid #c0c0c0; /* Viền mềm mại hơn */
  border-radius: 8px; /* Bo tròn góc */
  font-size: 15px;
  background: #fdfdfd; /* Nền gần trắng */
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px; /* Chiều rộng tối thiểu cho select */
}

.page-size select:hover {
  border-color: #a0a0a0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.page-size select:focus {
  outline: none;
  border-color: #4a90e2; /* Màu viền khi focus */
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.page-size span {
  font-size: 15px;
  color: #555;
}

/* Bảng */
.table {
  width: 100%;
  border-collapse: separate; /* Cho phép bo tròn góc */
  border-spacing: 0; /* Loại bỏ khoảng cách giữa các ô */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* Đổ bóng nhẹ cho bảng */
  border-radius: 12px; /* Bo tròn góc cho toàn bộ bảng */
  overflow: hidden; /* Đảm bảo nội dung không tràn ra ngoài bo tròn */
  margin-top: 20px; /* Thêm khoảng cách trên bảng */
  font-family: 'Segoe UI', sans-serif; /* Font hiện đại */
  color: #333;
}

th,
td {
  border: none; /* Bỏ viền riêng lẻ của ô */
  padding: 14px 10px; /* Tăng padding để nội dung thoáng hơn */
  text-align: center; /* Căn giữa nội dung */
  vertical-align: middle; /* Căn giữa theo chiều dọc */
}

.thead-light th { /* Cập nhật để phù hợp với class Bootstrap */
  background: linear-gradient(to right, #4a90e2, #5c7ee6); /* Gradient màu xanh đẹp */
  color: white; /* Chữ trắng */
  font-weight: 600; /* Chữ đậm hơn */
  text-transform: uppercase; /* Viết hoa tiêu đề */
  letter-spacing: 0.5px; /* Khoảng cách chữ */
  font-size: 14px;
}

/* Bo tròn góc cho thead */
.thead-light th:first-child { border-top-left-radius: 12px; }
.thead-light th:last-child { border-top-right-radius: 12px; }

td {
  background-color: #ffffff; /* Nền trắng cho ô */
  border-bottom: 1px solid #eef0f3; /* Viền dưới nhẹ nhàng */
}

tbody tr:nth-child(even) td {
  background-color: #f8faff; /* Sọc nền cho hàng chẵn */
}

tbody tr:hover td {
  background-color: #e3f2fd; /* Nền khi hover */
  transform: scale(1.005); /* Hiệu ứng phóng to nhẹ */
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: pointer; /* Thêm con trỏ dạng pointer khi hover hàng */
}

/* Các ô cuối cùng của hàng cuối cùng để bo tròn góc bảng */
tbody tr:last-child td {
  border-bottom: none; /* Bỏ viền dưới cho hàng cuối cùng */
}
tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}
tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

/* Nhóm nút trong cột "Thao tác" */
.button-group {
  display: flex;
  justify-content: center; /* Căn giữa các nút trong nhóm */
  gap: 8px; /* Khoảng cách giữa các nút */
  margin-top: 0; /* Bỏ margin-top mặc định */
}

/* Nút bấm */
button.btn { /* Sử dụng class .btn để chọn nút */
  padding: 8px 12px; /* Tăng padding cho nút */
  margin: 0; /* Bỏ margin xung quanh nút, dùng gap trong button-group */
  font-size: 13px; /* Kích thước chữ phù hợp */
  border: none;
  cursor: pointer;
  border-radius: 6px; /* Bo tròn góc nút */
  transition: all 0.3s ease; /* Hiệu ứng mượt mà */
  font-weight: 600; /* Chữ đậm hơn */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ cho nút */
  min-width: 60px; /* Đảm bảo nút có chiều rộng tối thiểu */
}

button.btn:hover {
  opacity: 1; /* Bỏ opacity hover mặc định */
  transform: translateY(-1px); /* Nút nhấc nhẹ lên */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Bóng rõ hơn khi hover */
}

button.btn:active {
  transform: translateY(0); /* Nút lún xuống khi click */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Màu sắc cụ thể cho từng loại nút Bootstrap */
.btn-warning { /* Sửa */
  background: linear-gradient(to right, #ffc107, #e0a800) !important;
  color: #333 !important; /* Màu chữ đen hoặc xám đậm cho nút vàng */
}
.btn-warning:hover {
  background: linear-gradient(to right, #e0a800, #c69500) !important;
}

.btn-danger { /* Xóa */
  background: linear-gradient(to right, #dc3545, #c82333) !important;
  color: white !important;
}
.btn-danger:hover {
  background: linear-gradient(to right, #c82333, #bd2130) !important;
}

/* Phân trang */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px; /* Khoảng cách lớn hơn từ bảng */
  gap: 15px; /* Khoảng cách giữa các nút phân trang */
}

.pagination button {
  padding: 8px 15px; /* Tăng padding */
  border: none;
  background: linear-gradient(to right, #4a90e2, #5c7ee6); /* Gradient xanh đồng bộ */
  color: white;
  border-radius: 8px; /* Bo tròn góc lớn hơn */
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa icon và chữ */
  box-shadow: 0 2px 8px rgba(231, 91, 91, 0.1); /* Đổ bóng nhẹ */
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
  color: #faf7f7;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.pagination span {
  font-size: 16px;
  color: #444;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 992px) {
  .page-size {
    margin-bottom: 20px;
  }
  .table {
    border-radius: 10px;
  }
  .thead-light th:first-child { border-top-left-radius: 10px; }
  .thead-light th:last-child { border-top-right-radius: 10px; }
  tbody tr:last-child td:first-child { border-bottom-left-radius: 10px; }
  tbody tr:last-child td:last-child { border-bottom-right-radius: 10px; }
  
  th, td {
    padding: 12px 8px;
    font-size: 14px;
  }
  .button-group {
    gap: 6px;
  }
  button.btn {
    padding: 7px 10px;
    font-size: 12px;
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
    border-radius: 8px;
  }

  .thead-light th:first-child { border-top-left-radius: 8px; }
  .thead-light th:last-child { border-top-right-radius: 8px; }
  tbody tr:last-child td:first-child { border-bottom-left-radius: 8px; }
  tbody tr:last-child td:last-child { border-bottom-right-radius: 8px; }

  th, td {
    padding: 10px 8px;
    font-size: 13px;
  }
  
  /* Cột "Thao tác" trên mobile: đảm bảo đủ không gian */
  th:last-child,
  td:last-child {
    min-width: 100px; /* Có thể điều chỉnh tùy theo kích thước nút */
    padding: 5px; /* Giảm padding để tiết kiệm không gian */
  }

  .button-group {
    flex-direction: column; /* Xếp chồng nút lên nhau */
    gap: 5px; /* Giảm khoảng cách giữa các nút khi xếp chồng */
  }
  button.btn {
    width: 100%; /* Nút chiếm toàn bộ chiều rộng */
    padding: 8px 10px; /* Tăng padding cho nút xếp chồng */
  }
}

@media (max-width: 576px) {
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

  /* Chế độ table "card" cho mobile */
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

  .table tbody td[data-label="Thao Tác"] {
    display: flex;
    flex-direction: row; /* Giữ các nút cạnh nhau nếu có thể, hoặc wrap */
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
  }
  .table tbody td[data-label="Thao Tác"]::before {
    display: none;
  }
  .table tbody td[data-label="Thao Tác"] .button-group {
    width: 100%; /* Đảm bảo button group chiếm đủ không gian */
  }
  .table tbody td[data-label="Thao Tác"] button.btn {
    flex-grow: 1; /* Nút sẽ giãn ra để lấp đầy */
    margin: 3px; /* Khoảng cách giữa các nút */
    font-size: 12px;
    padding: 6px 8px;
  }
}
</style>