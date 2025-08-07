<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Đăng Ký Mượn Sách</h2>

      <div class="borrow-form">
        <div class="borrow-header">Phiếu Mượn</div>
        <div class="borrow-content">
          <div>
            <label>Tên sách:</label>
            <p><strong>{{ book?.tenSach }}</strong></p>
          </div>

          <div>
            <label for="quantity">Số lượng mượn:</label>
            <input
              type="number"
              v-model.number="quantity"
              :max="book?.soQuyen || 1"
              min="1"
            />
          </div>
        </div>
<h5 style="color: red; font-size: 0.95rem;">
  (Lưu ý: Không được mượn quá 14 ngày. Mượn quá 1 ngày phạt 5000đ)
</h5>
        <button class="btn-add" @click="registerBorrow">Đăng Ký Mượn</button>
        <button class="btn-close" @click="$emit('close')">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import { dangKyMuonSach } from '@/services/muonsachService'
import { useStore } from 'vuex'

export default {
  props: {
    book: Object
  },
  data() {
    const store = useStore()
    return {
      store,
      quantity: 1,
      ngayMuon: ''
    }
  },
  computed: {
    docGiaId() {
      return this.store.state.user._id
    }
  },
  methods: {
    registerBorrow() {
      const today = new Date()
      this.ngayMuon = today.toISOString().split('T')[0]

      dangKyMuonSach(this.docGiaId, this.book.maSach, this.quantity, this.ngayMuon)
        .then(() => {
          alert('Đăng ký mượn thành công!')
          this.$emit('close')
        })
        .catch((err) => {
          alert(err.response?.data?.message || 'Lỗi khi đăng ký!')
        })
    }
  }
}
</script>

<style scoped>
/* Lớp phủ mờ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Slightly darker overlay for better focus */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* Form nổi giữa màn hình */
.modal-content {
  background: #f0f4f8; /* Softer, light blue-grey background */
  padding: 30px;
  border-radius: 12px; /* Consistent border-radius */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  max-width: 600px;
  width: 90%; /* Adjusted width for better responsiveness */
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

h2 {
  font-size: 28px;
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.borrow-form {
  background: #ffffff;
  padding: 30px; /* Increased padding inside the form */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
  border-left: none; /* Removed the prominent blue left border */
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0; /* Subtle light border */
}

.borrow-header {
  background: linear-gradient(to right, #4a90e2, #5c7ee6); /* Modern blue gradient */
  color: white;
  padding: 15px 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.borrow-content {
  margin-top: 60px; /* Increased margin to clear the absolute header */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  gap: 20px; /* More space between form groups */
}

.form-group {
    margin-bottom: 0; /* Handled by gap in .borrow-content */
}

label {
  font-weight: 600;
  font-size: 15px;
  color: #34495e;
  display: block;
  margin-bottom: 8px;
}

/* Style for displaying the book name */
.book-name-display {
    padding: 12px 15px;
    background-color: #fcfcfc;
    border: 1px solid #cccccc;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    font-weight: normal; /* Override strong's default bold if needed */
    margin-bottom: 0; /* Remove default paragraph margin */
}

.book-name-display strong {
    color: #333; /* Ensure strong text color is readable within the display box */
}


input[type="number"] {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #fcfcfc;
  transition: all 0.3s ease-in-out;
}

input[type="number"]:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  background-color: #ffffff;
}

h5 {
  color: #e74c3c;
  font-size: 0.9em;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
}

.button-container {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    gap: 15px; /* Space between buttons */
    margin-top: 30px; /* Space above the button group */
}

.btn-add,
.btn-close {
  display: inline-block;
  padding: 14px 25px; /* Consistent padding */
  font-size: 17px;
  border-radius: 8px; /* Consistent border-radius */
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(186, 198, 118, 0.15);
  font-weight: 600;
}

.btn-add {
  background: linear-gradient(to right, #28a745, #218838); /* Green gradient */
  color: white;
}

.btn-add:hover {
  background: linear-gradient(to right, #218838, #1e7e34);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.btn-add:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-close {
  background: #f53f3f; /* Muted grey for close */
  color: white;
}

.btn-close:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.btn-close:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .modal-content {
    padding: 20px;
    width: 95%;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 25px;
  }

  .borrow-form {
    padding: 20px;
  }

  .borrow-header {
    font-size: 18px;
    padding: 10px 15px;
  }

  .borrow-content {
    margin-top: 50px;
    gap: 15px;
  }

  label {
    font-size: 14px;
    margin-bottom: 6px;
  }

  .book-name-display,
  input[type="number"] {
    padding: 10px 12px;
    font-size: 15px;
  }

  h5 {
    font-size: 0.85em;
    margin-top: 15px;
  }

  .button-container {
    flex-direction: column; /* Stack buttons vertically on small screens */
    gap: 10px;
    margin-top: 25px;
  }

  .btn-add,
  .btn-close {
    padding: 12px 20px;
    font-size: 16px;
    width: 100%; /* Full width buttons */
  }
}
</style>
