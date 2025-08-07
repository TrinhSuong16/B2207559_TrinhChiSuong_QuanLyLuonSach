<template>
  <div class="overlay">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="tenSach">Tên Sách</label>
        <input
          type="text"
          class="form-control"
          v-model="bookLocal.tenSach"
          required
        />
      </div>
      <div class="form-group">
        <label for="maNXB">Nhà Xuất Bản</label>
        <select v-model="bookLocal.maNXB" class="form-control" required>
          <option value="" disabled>-- Chọn nhà xuất bản --</option>
          <option v-for="nxb in nxbList" :key="nxb.maNXB" :value="nxb.maNXB">
            {{ nxb.tenNXB }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="soQuyen">Số lượng quyển</label>
        <input
          type="number"
          class="form-control"
          v-model.number="bookLocal.soQuyen"
          min="1"
          required
        />
      </div>
      <div class="form-group">
        <label for="donGia">Đơn giá</label>
        <input
          type="number"
          v-model.number="bookLocal.donGia"
          class="form-control"
          id="donGia"
          required
        />
      </div>
      <div class="form-group">
        <label for="namXB">Năm xuất bản</label>
        <input
          type="number"
          v-model.number="bookLocal.namXB"
          class="form-control"
          id="namXB"
          required
        />
      </div>
      <div class="form-group">
        <label for="tacGia">Tác giả</label>
        <input
          type="text"
          v-model="bookLocal.tacGia"
          class="form-control"
          id="tacGia"
          required
        />
      </div>
      <div class="form-group">
        <label for="hinhAnh">Ảnh sách:</label>
        <input type="file" id="hinhAnh" accept="image/*" @change="onFileChange" />
        
      </div>
      <button class="btn btn-success">Lưu</button>
      <button
        type="button"
        class="btn btn-secondary ml-2"
        @click="$emit('cancel')"
      >
        Hủy
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => ({
        tenSach: '',
        maNXB: '',
        soQuyen: 1,
        donGia: 0,
        namXB: 2010,
        tacGia: '',
        hinhAnh: ''
      })
    },
    nxbList: { type: Array, required: true }
  },
  data() {
    return {
      bookLocal: { ...this.book },
      formKey: 0
    }
  },
  watch: {
    book: {
      handler(newVal) {
        this.bookLocal = { ...newVal }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm() {
      if (!this.bookLocal.maNXB) {
        alert('Vui lòng chọn Nhà Xuất Bản!')
        return
      }

      const bookData = { ...this.bookLocal }
      this.$emit('submit', bookData)
    },
    onFileChange(event) {
  console.log('Đã chọn file:', event.target.files[0]); // 👈 kiểm tra
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = e => {
      this.bookLocal.hinhAnh = e.target.result;
      console.log('Base64 ảnh:', this.bookLocal.hinhAnh.slice(0, 100)); // 👈 kiểm tra base64
    };
    reader.readAsDataURL(file);
  } else {
    alert('Vui lòng chọn tệp hình ảnh hợp lệ!');
  }
}

  }
}
</script>

<style scoped>
/* Phần nền mờ */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* Màu tối mờ */
  backdrop-filter: blur(3px); /* Tạo hiệu ứng blur cho nền */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Form */
form {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 1000;
  position: relative;
}

.form-group {
  margin-bottom: 18px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #333;
  font-size: 15px;
}

input,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #fefefe;
}

input[type="file"] {
  padding: 8px 0;
  background-color: transparent;
}

input:focus,
select:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  outline: none;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #dc3545;
  color: white;
}

.btn-secondary:hover {
  background-color: #c82333;
}

.ml-2 {
  margin-left: 12px;
}

@media (max-width: 768px) {
  form {
    padding: 20px;
    max-width: 90%;
  }

  input,
  select {
    font-size: 16px;
    padding: 12px;
  }

  .btn {
    width: 100%;
    margin-bottom: 12px;
    text-align: center;
  }

  .ml-2 {
    margin-left: 0;
  }
}
</style>
