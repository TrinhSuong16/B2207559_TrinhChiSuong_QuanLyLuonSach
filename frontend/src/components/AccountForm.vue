<style scoped>
/* Nền overlay mờ */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.4); /* lớp tối mờ */
  backdrop-filter: blur(5px); /* làm mờ nền */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Form nổi */
form {
  width: 100%;
  max-width: 480px;
  padding: 30px 28px;
  background: rgba(254, 254, 254, 0.929);
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  font-family: 'Segoe UI', sans-serif;
  border: 1.5px solid rgba(93, 95, 239, 0.4);
  animation: fadeIn 0.3s ease;
}

/* Animation mượt */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Nhóm form */
.form-group {
  margin-bottom: 18px;
}

/* Label đẹp hơn */
label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #333;
}

/* Input style */
input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.3);
}

/* Radio group */
.radio-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0 20px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

/* Buttons */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-top: 25px;
}

.btn {
  flex: 1;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-success {
  background: linear-gradient(to right, #00c853, #43a047);
  color: white;
}

.btn-success:hover {
  background: linear-gradient(to right, #00b248, #2e7d32);
  transform: scale(1.03);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: scale(1.03);
}

.btn:active {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 600px) {
  form {
    padding: 24px 20px;
  }

  input {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
    padding: 10px 16px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>



<template>
  <div class="overlay">
    
    <form @submit.prevent="saveChanges">
          <h3>Cập nhật Thông Tin Tài Khoản</h3>

      <label>Địa chỉ:</label>
      <input v-model="form.diachi" type="text" required />

      <div v-if="role === 'docgia'">
        <label>Họ và Tên:</label>
        <input v-model="form.hoten" type="text" required />

        <label>Ngày Sinh:</label>
        <input v-model="form.ngaysinh" type="date" required />

        <label>Giới tính:</label>
        <div class="radio-group">
          <label>
            <input type="radio" value="Nam" v-model="form.gioitinh" required />
            Nam
          </label>
          <label>
            <input type="radio" value="Nữ" v-model="form.gioitinh" required />
            Nữ
          </label>
        </div>
      </div>

      <div v-else>
        <label>Họ và Tên:</label>
        <input v-model="form.hoten" type="text" required />
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-success" @click="$emit('update')">Lưu</button>
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Hủy</button>
      </div>
    </form>
  </div>
</template>


<script>
  import { updateUserInfo } from '@/services/accService'

  export default {
    props: {
      user: Object,
      role: String,
      userId: String
    },
    emits: ['cancel', 'update'],
    data() {
      return {
        form: {
          diachi: this.user?.diachi || '',
          hoten: this.user?.hoten || '',
          ngaysinh: this.user?.ngaysinh?.includes('T') 
                  ? this.user.ngaysinh.split('T')[0] 
                  : '',
          gioitinh: this.user?.gioitinh || 'Nam',
        }
      }
    },

    watch: {
      user: {
        handler(newUser) {
          if (newUser) {
            this.form.diachi = newUser.diachi || ''
            this.form.hoten = newUser.hoten || ''
            this.form.ngaysinh = newUser.ngaysinh
              ? newUser.ngaysinh.split('T')[0]
              : ''
            this.form.gioitinh = newUser.gioitinh || 'Nam'
          }
        },
        immediate: true
      }
    },
    methods: {
      async saveChanges() {
        if (!this.userId) {
          alert('Lỗi: Không tìm thấy userId!')
          return
        }

        try {
          let updateData
          if (this.role === 'docgia') {
            updateData = {
              diachi: this.form.diachi,
              tenDG: this.form.hoten,
              ngaysinh: this.form.ngaysinh,
              gioitinh: this.form.gioitinh
            }
          } else {
            updateData = {
              diachi: this.form.diachi,
              hotenNV: this.form.hoten,
            }
          }
          await updateUserInfo(this.role, this.userId, updateData)

          alert('Cập nhật thành công!')
          this.$emit('update')
          this.$emit('cancel')
        } catch (error) {
          alert('Có lỗi xảy ra!')
          console.error(error)
        }
      }
    }
  }
</script>
