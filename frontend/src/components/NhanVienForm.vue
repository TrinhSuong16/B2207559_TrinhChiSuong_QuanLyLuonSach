<template>
  <div class="overlay">
    <div class="form-container">
      <h2>Thêm Tài Khoản Nhân Viên</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="hoten">Họ tên:</label>
          <input type="text" id="hoten" v-model="hotenNV" required />
        </div>

        <div class="form-group">
          <label for="sdt">Số điện thoại:</label>
          <input type="text" id="sdt" v-model="dienthoaiNV" required />
        </div>

        <div class="form-group">
          <label for="matkhau">Mật khẩu:</label>
          <input type="password" id="matkhau" v-model="matkhauNV" required />
        </div>

        <div class="form-group">
          <label for="xacnhan">Xác nhận mật khẩu:</label>
          <input type="password" id="xacnhan" v-model="confirmmatkhauNV" required />
        </div>

        <div class="form-group">
          <label>Chức vụ:</label>
          <div class="radio-group">
            <label>
              <input type="radio" value="quanly" v-model="chucvu" /> Quản lý
            </label>
            <label>
              <input type="radio" value="nhanvien" v-model="chucvu" /> Nhân viên
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">Thêm</button>
          <button type="button" class="btn-cancel" @click="cancel">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NhanVienForm',
  data() {
    return {
      hotenNV: '',
      dienthoaiNV: '',
      matkhauNV: '',
      confirmmatkhauNV: '',
      chucvu: 'nhanvien'
    };
  },
  methods: {
    submitForm() {
      if (this.matkhauNV !== this.confirmmatkhauNV) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }

      const newNhanVien = {
        hotenNV: this.hotenNV,
        dienthoaiNV: this.dienthoaiNV,
        matkhauNV: this.matkhauNV,
        confirmmatkhauNV: this.confirmmatkhauNV,
        chucvu: this.chucvu
      };

      this.$emit('submit', newNhanVien);
      this.resetForm();
    },
    resetForm() {
      this.hotenNV = '';
      this.dienthoaiNV = '';
      this.matkhauNV = '';
      this.confirmmatkhauNV = '';
      this.chucvu = 'nhanvien';
    },
    cancel() {
      this.$emit('cancel');
      this.resetForm();
    }
  }
};
</script>

<style scoped>
/* Lớp phủ nền mờ */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Nền mờ hơn một chút */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  font-family: 'Segoe UI', sans-serif;
}

/* Form chính */
.form-container {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); /* Bóng đổ mềm mại hơn */
  width: 100%;
  max-width: 500px; /* Chiều rộng tối đa */
  animation: fadeInScale 0.3s ease-out forwards; /* Hiệu ứng mở form */
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

h2 {
  text-align: center;
  margin-bottom: 28px; /* Tăng khoảng cách dưới tiêu đề */
  color: #3f51b5; /* Màu xanh đậm cho tiêu đề */
  font-size: 26px;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px; /* Tăng khoảng cách giữa các nhóm form */
  text-align: left; /* Căn chỉnh lại label về bên trái */
}

.form-group label {
  display: block;
  font-weight: 600; /* Đậm hơn */
  margin-bottom: 8px; /* Tăng khoảng cách giữa label và input */
  color: #333;
  font-size: 15px;
}

input[type="text"],
input[type="password"] {
  width: calc(100% - 20px); /* Điều chỉnh lại width để tránh tràn ra ngoài với padding */
  padding: 12px 10px; /* Tăng padding */
  border-radius: 8px; /* Bo tròn hơn */
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #4a90e2; /* Màu viền khi focus */
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2); /* Hiệu ứng box-shadow khi focus */
  outline: none;
}

.radio-group {
  display: flex;
  gap: 25px; /* Khoảng cách giữa các radio option */
  margin-top: 5px;
}

.radio-group label {
  display: flex;
  align-items: center;
  font-weight: normal; /* Đặt lại trọng lượng font cho label radio */
  color: #555;
  cursor: pointer;
}

input[type="radio"] {
  margin-right: 8px; /* Khoảng cách giữa radio và text */
  transform: scale(1.1); /* Phóng to radio button một chút */
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end; /* Di chuyển nút sang phải */
  gap: 15px; /* Khoảng cách giữa các nút */
  margin-top: 30px; /* Tăng khoảng cách trên nhóm nút */
}

.btn-submit,
.btn-cancel {
  padding: 10px 25px; /* Tăng padding */
  border: none;
  border-radius: 8px; /* Bo tròn hơn */
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-submit {
  background: linear-gradient(to right, #4CAF50, #2E7D32); /* Xanh lá cây */
  color: #fff;
}

.btn-submit:hover {
  background: linear-gradient(to right, #388E3C, #1B5E20);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background: linear-gradient(to right, #f44336, #d32f2f); /* Đỏ */
  color: #fff;
}

.btn-cancel:hover {
  background: linear-gradient(to right, #d32f2f, #c62828);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .form-container {
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .form-group label {
    font-size: 14px;
    margin-bottom: 6px;
  }

  input[type="text"],
  input[type="password"] {
    padding: 10px;
    font-size: 14px;
  }

  .radio-group {
    flex-direction: column; /* Xếp chồng radio buttons trên màn hình nhỏ */
    gap: 10px;
  }

  .form-actions {
    flex-direction: column; /* Xếp chồng nút hành động */
    gap: 10px;
    margin-top: 20px;
  }

  .btn-submit,
  .btn-cancel {
    width: 100%; /* Nút chiếm toàn bộ chiều rộng */
    padding: 12px;
    font-size: 15px;
  }
}
</style>