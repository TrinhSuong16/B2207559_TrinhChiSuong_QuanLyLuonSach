<style scoped>
/* Wrapper tổng */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #fdfcf5, #f5f1e0);
  padding: 40px 20px;
}

/* Khung login */
.login-card {
  background-color: #fffdf7;
  border-radius: 16px;
  max-width: 650px; /* ← tăng từ 550px lên 650px hoặc tùy ý */
  width: 100%;
  padding: 60px 35px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Tiêu đề */
h2 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #4b3f2f;
  margin-bottom: 30px;
  text-align: center;
}

/* Label */
.form-label {
  font-weight: 500;
  color: #4e4e4e;
}

/* Input */
.form-control {
  border-radius: 10px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  font-size: 15px;
  transition: all 0.2s ease-in-out;
  background-color: #f3f6ff;
}

.form-control:focus {
  outline: none;
  border-color: #b89e25;
  box-shadow: 0 0 0 3px rgba(184, 158, 37, 0.2);
}

/* Nút đăng nhập */
button[type="submit"] {
  background-color: #b89e25;
  border-color: #b89e25;
  border-radius: 10px;
  font-weight: 600;
  padding: 10px;
  font-size: 16px;
  transition: all 0.25s ease;
  margin-top: 15px;
  margin-bottom: 10px;
  color: white;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #a3861f;
  border-color: #a3861f;
}

/* Link đăng nhập quản lý */
.text-muted {
  font-size: 14px;
  color: #6c6c6c;
  transition: color 0.2s ease;
  text-align: center;
}

.text-muted u {
  color: #967e1f;
}

.text-muted:hover {
  color: #000;
  text-decoration: underline;
}
</style>


<template>
  <div class="container d-flex justify-content-center align-items-center vh-50 mt-5">
    <div class="card p-3 shadow-lg" style="max-width: 400px; width: 100%">
      <h2 class="text-center">Đăng nhập để trải nghiệm các tiện ích của Thư viện TCS</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="dienthoaiDG" class="form-label">Số điện thoại</label>
          <input
            type="text"
            id="dienthoaiDG"
            v-model="dienthoaiDG"
            class="form-control"
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        <div class="mb-3">
          <label for="matkhauDG" class="form-label">Mật khẩu</label>
          <input
            type="password"
            id="matkhauDG"
            v-model="matkhauDG"
            class="form-control"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      </form>
      <div class="text-start mt-2">
        <router-link
          to="/loginnhanvien"
          class="text-decoration-none text-muted"
        >
          Bạn đăng nhập với tư cách là <u>quản lý</u>?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        dienthoaiDG: '',
        matkhauDG: ''
      }
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post(
            'http://localhost:3000/api/docgia/login',
            {
              dienthoaiDG: this.dienthoaiDG,
              matkhauDG: this.matkhauDG
            }
          )

          const id = response.data?._id || response.data?.user?._id

          this.$store.dispatch('login', {
            _id: id,
            role: 'docgia',
          })

          alert('Đăng nhập độc giả thành công')
          this.$router.push('/')
        } catch (error) {
          if (error.response) {
            if (
              error.response.status === 404 ||
              error.response.status === 500
            ) {
              alert('Số điện thoại chưa được đăng ký!')
            } else if (error.response.status === 401) {
              alert('Mật khẩu hoặc số điện thoại không đúng!')
            } else {
              alert('Lỗi hệ thống, vui lòng thử lại!')
            }
          } else {
            alert('Không thể kết nối đến máy chủ!')
          }
        }
      }
    }
  }
</script>
