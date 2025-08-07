<style scoped>
:root {
  --primary-color: #b89e25;
  --hover-color: #e2bc13;
}

.container {
  background: linear-gradient(135deg, #f9f6ee, #fffbe6);
  padding: 50px 0;
  border-radius: 10px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  max-width: 400px;
  width: 100%;
  padding: 30px;
}

.card:hover {
  transform: scale(1.02);
}

h2 {
  color: var(--primary-color);
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.form-control {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 12px;
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
  padding: 12px;
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

.radio-group {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.radio-group label {
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

input[type="radio"] {
  margin-right: 6px;
  accent-color: var(--primary-color);
}
</style>

<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-50 mt-5">
    <div class="card p-3 shadow-sm w-100" style="max-width: 400px;">
      <h2 class="text-center mb-3">Đăng ký</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="tenDG" class="form-label">Họ và tên</label>
          <input type="text" class="form-control" v-model="tenDG" required />
        </div>
        <div class="mb-3">
          <label for="ngaysinh" class="form-label">Ngày sinh</label>
          <input type="date" class="form-control" v-model="ngaysinh" required />
        </div>
        <div class="radio-group">
          <label>Giới tính:</label>
          <br>
          <label>
            <input type="radio" value="Nam" v-model="gioitinh" required />
            Nam
          </label>
          <label>
            <input type="radio" value="Nữ" v-model="gioitinh" required />
            Nữ
          </label>
        </div>
        <div class="mb-3">
          <label for="diachi" class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" v-model="diachi" required />
        </div>
        <div class="mb-3">
          <label for="dienthoaiDG" class="form-label">Số điện thoại</label>
          <input type="text" class="form-control" v-model="dienthoaiDG" required />
        </div>
        <div class="mb-3">
          <label for="matkhauDG" class="form-label">Mật khẩu</label>
          <input type="password" class="form-control" v-model="matkhauDG" required />
        </div>
        <div class="mb-3">
          <label for="confirmmatkhauDG" class="form-label">Xác nhận mật khẩu</label>
          <input type="password" class="form-control" v-model="confirmmatkhauDG" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
      </form>
      <div class="text-center mt-3">
        <p class="mb-0">Bạn đã có tài khoản? 
          <router-link to="/logindocgia" class="text-decoration-none"><span>Đăng nhập</span></router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tenDG: '',
      ngaysinh: '',
      gioitinh: '',
      diachi: '',
      dienthoaiDG: '',
      matkhauDG: '',
      confirmmatkhauDG: '',
    };
  },
  methods: {
    async handleRegister() {
      if (this.matkhauDG !== this.confirmmatkhauDG) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/docgia/register', { 
          tenDG: this.tenDG,
          ngaysinh: this.ngaysinh,
          gioitinh: this.gioitinh,
          diachi: this.diachi,
          dienthoaiDG: this.dienthoaiDG, 
          matkhauDG: this.matkhauDG, 
          confirmmatkhauDG: this.confirmmatkhauDG });
        alert('Đăng ký thành công');
        this.$router.push('/logindocgia');
      } catch (error) {
        alert(error.response?.data?.message || 'Đăng ký thất bại');
      }
    }
  }
};
</script>
