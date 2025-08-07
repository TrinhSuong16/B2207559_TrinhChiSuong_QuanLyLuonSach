<style scoped>
.borrow-container {
    max-width: 650px;
    margin: 50px auto;
    padding: 30px;
    text-align: center;
    background: #f0f4f8;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
}

h2 {
    font-size: 28px;
    color: #2c3e50;
    font-weight: 700;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.borrow-form {
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: left;
    border-left: none;
    position: relative;
    overflow: hidden;
    border: 1px solid #e0e0e0;
}

.borrow-header {
    background: linear-gradient(to right, #4a90e2, #5c7ee6);
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
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    margin-bottom: 0;
}

label {
    font-weight: 600;
    font-size: 15px;
    color: #34495e;
    display: block;
    margin-bottom: 8px;
}

select, input[type="number"] {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    background-color: #fcfcfc;
    transition: all 0.3s ease-in-out;
}

select:focus, input[type="number"]:focus {
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

.btn-add {
    background: linear-gradient(to right, #28a745, #218838);
    color: white;
    padding: 14px 25px;
    font-size: 17px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 30px;
    transition: all 0.3s ease;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    font-weight: 600;
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

@media (max-width: 600px) {
    .borrow-container {
        width: 95%;
        padding: 20px;
        margin: 30px auto;
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

    select, input[type="number"] {
        padding: 10px 12px;
        font-size: 15px;
    }

    h5 {
        font-size: 0.85em;
        margin-top: 15px;
    }

    .btn-add {
        padding: 12px 20px;
        font-size: 16px;
        margin-top: 25px;
    }
}
</style>
<template>
  <div class="borrow-container">
    <h2>Đăng Ký Mượn Sách</h2>

    <div class="borrow-form">
      <div class="borrow-header">Phiếu Đăng ký Mượn Sách</div>
      <div class="borrow-content">
        
        <div>
          <label for="book">Tên sách:</label>
          <select v-model="selectedBook" @change="updateAvailableQuantity">
            <option v-for="book in books" :key="book._id" :value="book">
              {{ book.tenSach }} (Còn: {{ book.soQuyen }})
            </option>
          </select>
        </div>

        <div>
          <label for="quantity">Số quyển:</label>
          <input type="number" v-model.number="quantity" :max="selectedBook ? selectedBook.soQuyen : 1" min="1" />
        </div>

      </div>
      <h5 style="color: red; font-size: 0.95rem;">
        (Lưu ý: Không được mượn quá 14 ngày. Mượn quá 1 ngày phạt 5000đ)
      </h5>

      <button class="btn-add" @click="registerBorrow">Đăng Ký Mượn</button>
    </div>
  </div>
</template>

<script>
import { getBooks, dangKyMuonSach } from "@/services/muonsachService";
import { useStore } from 'vuex';

export default {
  data() {
    const store = useStore();
    return {
      store,
      books: [],
      selectedBook: null,
      quantity: 1,
      ngayMuon: "",
    };
  },

  computed: {
    docGiaId() {
      return this.store.state.user._id;
    },
  },

  methods: {
    async loadBooks() {
      this.books = await getBooks();
    },

    updateAvailableQuantity() {
      this.quantity = 1;
    },

    openBorrowForm() {
      const today = new Date();
      this.ngayMuon = today.toISOString().split("T")[0];
    },

    async registerBorrow() {
      this.openBorrowForm();

      try {
        await dangKyMuonSach(this.docGiaId, this.selectedBook.maSach, this.quantity, this.ngayMuon);
        alert("Đăng ký mượn thành công! Vui lòng chờ duyệt.");
        this.selectedBook = null;
        this.quantity = 1;
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi không xác định!");
        console.error(error);
      }
    },
  },

  mounted() {
    this.loadBooks();
  },
};
</script>

