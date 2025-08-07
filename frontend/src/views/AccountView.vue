<style scoped>
.account-view {
  max-width: 600px;
  width: 95%;
  margin: 60px auto;
  padding: 30px 28px;
  background: #ffffff; /* Solid white background */
  border-radius: 12px; /* Softer border radius */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Lighter, more subtle shadow */
  /* backdrop-filter: blur(12px); /* Remove blur for solid background */
  border: 1px solid #e0e0e0; /* Subtle border */
  transition: 0.3s ease;
  text-align: left;
  font-family: 'Segoe UI', sans-serif;
}

.account-view.editing {
  border-color: #7B68EE; /* A more prominent border color for editing state */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow when editing */
}

h1 {
  font-size: 26px;
  color: #3f51b5; /* A slightly softer blue for the heading */
  margin-bottom: 25px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.8px; /* Reduced letter-spacing */
}

/* Updated style for display paragraphs (removed blue line) */
p {
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Vertically align items in the middle */
  gap: 15px; /* Increased space between label and value */
  font-size: 16px;
  color: #555; /* Softer text color for general info */
  background: #f8f9fa; /* Very light grey background for info rows */
  padding: 12px 20px; /* Adjusted padding */
  border-radius: 8px; /* Rounded corners for info rows */
  /* border-left: 5px solid #5D5FEF; /* REMOVED THE BLUE VERTICAL LINE */
  margin: 10px 0; /* Slightly reduced margin */
  font-weight: 500;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08); /* Softer shadow for info rows */
}

p strong {
  display: inline-block;
  width: 140px; /* Keep the fixed width for the label */
  color: #4a69bd; /* A more professional blue for the label */
  font-weight: 600;
  flex-shrink: 0;
  text-transform: uppercase; /* Capitalize labels for emphasis */
  font-size: 14px; /* Slightly smaller font for labels */
}

p span.value {
  flex-grow: 1;
  padding: 8px 12px; /* Adjusted padding for value box */
  background-color: #eceff1; /* Slightly darker light grey for value box */
  border-radius: 6px; /* Slightly less rounded for value box */
  font-size: 15px;
  color: #333; /* Darker text for values */
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); /* Very subtle inner shadow */
  min-height: 20px;
  display: flex;
  align-items: center;
}

/* Button for display mode */
.account-view > button {
  display: block;
  margin: 30px auto 0;
  background: linear-gradient(to right, #4CAF50, #66BB6A); /* Green gradient for 'Chỉnh sửa' */
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px; /* Slightly softer button corners */
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.account-view > button:hover {
  background: linear-gradient(to right, #43A047, #5cb85c);
  transform: translateY(-2px); /* Subtle lift */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.account-view > button:active {
  background: #388E3C;
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* New styles for AccountForm component */
.account-form {
  background: #fdfdfd; /* Very light background for the form */
  border-radius: 10px; /* Matching border radius with account-view */
  padding: 20px; /* Reduced padding */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); /* Even softer shadow */
  margin-top: 20px;
  border: 1px solid #eee; /* Lighter border */
}

.account-form .form-group {
  margin-bottom: 15px; /* Reduced spacing between form fields */
}

.account-form label {
  display: block;
  font-size: 13px; /* Slightly smaller label font */
  color: #666; /* Softer label color */
  margin-bottom: 6px; /* Reduced space below label */
  font-weight: 600;
  text-transform: uppercase; /* Capitalize form labels too */
  letter-spacing: 0.5px;
}

.account-form input[type="text"],
.account-form input[type="date"],
.account-form select {
  width: calc(100% - 20px); /* Adjust width for new padding */
  padding: 10px; /* Reduced padding for inputs */
  border: 1px solid #ddd; /* Light grey border */
  border-radius: 6px; /* Slightly less rounded input fields */
  font-size: 15px;
  color: #333;
  background-color: #fff; /* White background for inputs */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.account-form input[type="text"]:focus,
.account-form input[type="date"]:focus,
.account-form select:focus {
  border-color: #7B68EE; /* A new highlight color on focus */
  box-shadow: 0 0 0 3px rgba(123, 104, 238, 0.2); /* Soft glow with new color */
  background-color: #fff;
}

.account-form .button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* Reduced space between buttons */
  margin-top: 25px; /* Reduced space above buttons */
}

.account-form .button-group button {
  display: inline-block;
  margin: 0;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 6px; /* Matching form input border-radius */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Softer button shadow */
  transition: all 0.2s ease-in-out;
}

.account-form .button-group button.cancel-btn {
  background: #bdbdbd; /* Muted grey for cancel */
  color: #555;
}

.account-form .button-group button.cancel-btn:hover {
  background: #a0a0a0;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.account-form .button-group button.save-btn {
  background: linear-gradient(to right, #42a5f5, #2196f3); /* Blue gradient for save */
  color: #fff;
}

.account-form .button-group button.save-btn:hover {
  background: linear-gradient(to right, #1e88e5, #1976d2);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}


button {
  display: block;
  margin: 30px auto 0;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  padding: 14px 26px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
}

button:hover {
  background: linear-gradient(to right, #5f10c9, #1e60dc);
  transform: translateY(-2px) scale(1.04);
}

button:active {
  background: #2E3192;
  transform: scale(0.96);
}


/* Responsive */
@media (max-width: 600px) {
  .account-view {
    padding: 20px 15px;
    border-radius: 10px;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  p {
    font-size: 14px;
    padding: 8px 15px;
    gap: 8px;
  }

  p strong {
    width: 90px; /* Further reduced width for labels on small screens */
    font-size: 12px;
  }

  p span.value {
      font-size: 13px;
      padding: 6px 10px;
  }

  .account-view > button {
    font-size: 13px;
    padding: 10px 20px;
  }

  .account-form {
    padding: 15px;
  }

  .account-form label {
    font-size: 12px;
  }

  .account-form input[type="text"],
  .account-form input[type="date"],
  .account-form select {
    padding: 8px;
    font-size: 13px;
  }

  .account-form .button-group {
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
  }

  .account-form .button-group button {
    width: 100%;
    padding: 10px;
  }

  
}
</style>

<template>
  <div class="account-view">
    <h1>Thông Tin Tài Khoản</h1>

    <AccountForm
      v-if="isEditing"
      :user="userInfo"
      :role="userRole"
      :userId="userInfo._id"
      @update="fetchUser"
      @cancel="isEditing = false"
    />

    <div v-if="userInfo">
      <p>
        <strong>Số điện thoại:</strong>
        <span class="value">{{ userInfo.sdt }}</span>
      </p>
      <p>
        <strong>Họ và Tên:</strong>
        <span class="value">{{ userInfo.hoten }}</span>
      </p>
      <p v-if="userRole === 'docgia'">
        <strong>Giới tính:</strong>
        <span class="value">{{ userInfo.gioitinh }}</span>
      </p>
      <p v-if="userRole === 'docgia'">
        <strong>Ngày sinh:</strong>
        <span class="value">{{ formatDate(userInfo.ngaysinh) }}</span>
      </p>
      <p>
        <strong>Quyền hạn:</strong>
        <span class="value">{{ userInfo.chucvu }}</span>
      </p>
      <p>
        <strong>Địa chỉ:</strong>
        <span class="value">{{ userInfo.diachi }}</span>
      </p>
      <button @click="isEditing = true">Chỉnh sửa</button>
    </div>

    <p v-else>Đang tải thông tin...</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/services/accService'
  import AccountForm from '@/components/AccountForm.vue'

  export default {
    components: { AccountForm },
    data() {
      return {
        userInfo: null,
        isEditing: false
      }
    },
    computed: {
      ...mapState({
        userRole() {
          return this.$store.state.user.role
        },
        userID() {
          return this.$store.state.user._id
        }
      })
    },
    methods: {
      async fetchUser() {
        if (!this.userID) {
          console.error('Không tìm tài khoản!')
          return
        }
        try {
          const userData = await getUserInfo(this.userID, this.userRole)
          this.userInfo = {
            _id: userData._id,
            sdt: this.userRole === 'docgia'
                ? userData.dienthoaiDG || ''
                : userData.dienthoaiNV || '',
            hoten: this.userRole === 'docgia'
                ? userData.tenDG || ''
                : userData.hotenNV || '',
            diachi: userData.diachi || 'Chưa cập nhật',
            role: this.userRole,
            gioitinh: userData.gioitinh || '',
            chucvu:
              this.userRole === 'docgia'
                ? 'Độc giả'
                : userData.chucvu === 'quanly'
                ? 'Quản lý'
                : 'Nhân viên',
            ngaysinh:
              this.userRole === 'docgia' && userData?.ngaysinh
                ? userData.ngaysinh.split('T')[0]
                : ''
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin tài khoản:', error)
        }
      },
      formatDate(dateString) {
        if (!dateString) return 'Chưa cập nhật'
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
      }
    },
    mounted() {
      this.fetchUser()
    }
  }
</script>
