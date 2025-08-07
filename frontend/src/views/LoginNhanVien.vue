Form Đăng Nhập Độc Giả (Chỉnh Sửa)
vue
Sao chép
Chỉnh sửa
<style scoped>
:root {
  --primary-color: #b89e25;
  --hover-color: #e2bc13;
}

.container {
  background: linear-gradient(135deg, #f9f6ee, #fffbe6);
  padding: 50px 0;
  border-radius: 10px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.02);
}

h2 {
  color: var(--primary-color);
  font-size: 22px;
  font-weight: bold;
}

.form-control {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  transition: border-color 0.3s ease-in-out;
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(184, 158, 37, 0.5);
}

button {
  background-color: blue;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}

button:hover {
  background-color: blueviolet;
  transform: scale(1.05);
}

.text-muted {
  font-size: 14px;
  transition: color 0.2s ease-in-out;
}

.text-muted:hover {
  color: var(--primary-color);
}
</style>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-50 mt-5">
    <div class="card p-3 shadow-lg" style="max-width: 400px; width: 100%;">
      <h2 class="text-center">Đăng nhập nhân viên</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="sdt" class="form-label">Số điện thoại</label>
          <input type="text" id="dienthoaiNV" v-model="dienthoaiNV" class="form-control" placeholder="Nhập số điện thoại" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu</label>
          <input type="password" id="matkhauNV" v-model="matkhauNV" class="form-control" placeholder="Nhập mật khẩu" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      </form>
      <div class="text-start mt-2">
        <router-link to="/logindocgia" class="text-decoration-none text-muted">Bạn đăng nhập với tư cách là <u>độc giả</u>?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dienthoaiNV: '',
      matkhauNV: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/nhanvien/login', { 
          dienthoaiNV: this.dienthoaiNV, 
          matkhauNV: this.matkhauNV 
        });

        const chucVu = response.data?.chucvu || response.data?.user?.chucvu;
        const id = response.data?._id || response.data?.user?._id; 

        let role = 'docgia';
        if (chucVu === 'quanly') {
          role = 'quanly';
        } else if (chucVu) {
          role = 'nhanvien';
        }

        this.$store.dispatch("login", { _id: id, role: role});

        alert('Đăng nhập nhân viên thành công');
        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404 || error.response.status === 500) {
            alert('Số điện thoại chưa được đăng ký!');
          } else if (error.response.status === 401) {
            alert('Mật khẩu hoặc số điện thoại không đúng!');
          } else {
            alert('Lỗi hệ thống, vui lòng thử lại!');
          }
        } else {
          alert('Không thể kết nối đến máy chủ!');
        }
      }
    }
  }
};
</script>
