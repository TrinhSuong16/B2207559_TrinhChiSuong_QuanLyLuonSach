<template>
  <div class="container">
    <div class="card">
      <h2 class="text-center">Đăng ký</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Họ và tên</label>
            <input type="text" class="form-control" v-model="tenDG" required />
          </div>
          <div class="form-group">
            <label class="form-label">Ngày sinh</label>
            <input type="date" class="form-control" v-model="ngaysinh" required />
          </div>

          <div class="form-group">
            <label class="form-label">Giới tính</label>
            <div class="radio-group">
              <label><input type="radio" value="Nam" v-model="gioitinh" required /> Nam</label>
              <label><input type="radio" value="Nữ" v-model="gioitinh" required /> Nữ</label>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" v-model="diachi" required />
          </div>

          <div class="form-group">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" v-model="dienthoaiDG" required />
          </div>
          <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" v-model="matkhauDG" required />
          </div>

          <div class="form-group">
            <label class="form-label">Xác nhận mật khẩu</label>
            <input type="password" class="form-control" v-model="confirmmatkhauDG" required />
          </div>
        </div>

        <button type="submit" class="btn-primary w-100">Đăng ký</button>

        <div class="text-center">
          <p>Bạn đã có tài khoản?
            <router-link to="/logindocgia" class="text-decoration-none">Đăng nhập</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f2f5 0%, #e0e6ed 100%);
  padding: 2rem;
}

.card {
  border-radius: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  padding: 2.5rem;
  max-width: 700px;
  width: 100%;
}

h2 {
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-size: 0.95rem;
}

.form-control {
  border-radius: 0.6rem;
  border: 1px solid #d1d9e6;
  padding: 0.75rem 1rem;
  background-color: #f8faff;
  color: #333;
}

.form-control:focus {
  border-color: #6a9acb;
  box-shadow: 0 0 0 0.25rem rgba(106, 154, 203, 0.3);
  background-color: #ffffff;
  outline: none;
}

.radio-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.radio-group input[type="radio"] {
  accent-color: #3498db;
  margin-right: 0.4rem;
  transform: scale(1.1);
}

.btn-primary {
  background: linear-gradient(45deg, #3498db 0%, #2980b9 100%);
  border: none;
  padding: 0.9rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 0.7rem;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
  transition: all 0.3s ease;
  color: white;
  cursor: pointer;
  margin: 2rem 0 1rem 0;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.3);
  background: linear-gradient(45deg, #2980b9 0%, #3498db 100%);
}

.text-center {
  text-align: center;
}

.text-center p {
  color: #666;
  font-size: 0.95rem;
}

.text-decoration-none {
  color: #3498db;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.text-decoration-none:hover {
  color: #2980b9;
  text-decoration: underline;
}
</style>


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
