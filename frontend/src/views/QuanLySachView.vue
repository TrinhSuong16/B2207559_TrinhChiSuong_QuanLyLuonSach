
<template>
  <div>
    <h1>Quản Lý Sách</h1>
    <InputSearch v-model="search" />

    <button @click="openBookForm(null)" class="btn btn-add"> 📚 + Thêm Sách mới</button>

    <button @click="showNxbForm = true" class="btn btn-success ml-2">
      🖨️ + Thêm Nhà Xuất Bản mới
    </button>

    <SachForm
      v-if="showBookForm"
      :book="selectedBook"
      :nxbList="nxbs"
      @submit="saveBook"
      @cancel="closeBookForm"
      :key="selectedBook?._id || 'new'"
    />

    <NxbForm
      v-if="showNxbForm"
      @submit="saveNxb"
      @cancel="showNxbForm = false"
    />

    <SachList
      :books="filteredBooks"
      :nxbs="nxbs"
      @edit="openBookForm"
      @delete="deleteBook"
    />
  </div>
</template>

<script>
  import InputSearch from '@/components/InputSearch.vue'
  import SachForm from '@/components/SachForm.vue'
  import NxbForm from '@/components/NxbForm.vue'
  import SachList from '@/components/SachList.vue'
  import {
    fetchBooks,
    createBook,
    updateBook,
    deleteBook
  } from '@/services/sachService'
  import { fetchNXB, createNXB } from '@/services/nxbService'

  export default {
    components: { SachForm, NxbForm, SachList, InputSearch },
    data() {
      return {
        search: '',
        books: [],
        nxbs: [],
        showBookForm: false,
        showNxbForm: false,
        selectedBook: null,
        formKey: 0,
        saving: false
      }
    },
    computed: {
      filteredBooks() {
        return this.books.filter(book => {
          const tenSach = book.tenSach ? book.tenSach.toLowerCase() : ''
          const maSach = book.maSach ? book.maSach.toLowerCase() : ''
          const tacGia = book.tacGia
            ? book.tacGia.trim().toLowerCase()
            : ''
          const keyword = this.search.normalize("NFC").toLowerCase().trim();

          const manxbValue = book.maNXB || ''
          const nxb = this.nxbs.find(n => String(n.maNXB) === String(manxbValue))
          const tenNXB = nxb ? nxb.tenNXB.toLowerCase() : ''

          return (
            tenSach.includes(keyword) ||
            maSach.includes(keyword) ||
            tenNXB.includes(keyword) ||
            tacGia.includes(keyword)
          )
        })
      }
    },
    methods: {
      async loadBooks() {
        try {
          this.books = await fetchBooks()
        } catch (error) {
          console.error('Lỗi khi tải sách:', error)
        }
      },
      async loadNXBs() {
        try {
          this.nxbs = await fetchNXB()
        } catch (error) {
          console.error('Lỗi khi tải nhà xuất bản:', error)
        }
      },
      getNXBName(maNXB) {
        if (!maNXB || !this.nxbs) return 'Chưa có NXB';

        const manxb = typeof maNXB === 'object' ? maNXB.toString() : String(maNXB);

        const nxb = this.nxbs.find(n => 
          String(n.maNXB) === manxb || String(n._id) === manxb
        );

        return nxb ? nxb.tenNXB : 'Không tìm thấy';
      },
      async openBookForm(book) {
        await this.loadNXBs()
        this.selectedBook = book ? { ...book } : null
        this.showBookForm = true
      },
      closeBookForm() {
        this.selectedBook = null
        this.showBookForm = false
      },
      async saveBook(book) {
        try {
          if (this.saving) return;
          this.saving = true;

          if (book._id) {
            await updateBook(book);
            alert('Cập nhật sách thành công!');
          } else {
              console.log('📦 Dữ liệu gửi để tạo mới:', book); // 👈 THÊM DÒNG NÀY

            const newBook = await createBook(book);
            if (!newBook) {
              throw new Error('Không nhận được dữ liệu từ API sau khi thêm sách!');
            }
            alert('Thêm sách mới thành công!');
          }

          this.closeBookForm();
          await this.loadBooks();
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Lỗi không xác định';
          alert(`Không thể lưu sách. Vui lòng thử lại.\nChi tiết: ${errorMessage}`);
        } finally {
          this.saving = false;
          this.selectedBook = null;
        }
      },

      async saveNxb(nxb) {
        try {
          const newNXB = await createNXB(nxb)
          this.nxbs.push(newNXB)
          alert('Thêm nhà xuất bản mới thành công!')
          this.showNxbForm = false
        } catch (error) {
          console.error('Lỗi khi thêm nhà xuất bản:', error)
        }
      },
      async deleteBook(id) {
        try {
          await deleteBook(id)
          alert('Xóa sách thành công!')
          await this.loadBooks()
          this.loadBooks()
        } catch (error) {
          console.error('Lỗi khi xóa sách:', error)
        }
      }
    },
    created() {
      this.loadBooks()
      this.loadNXBs()
    }
  }
</script>

<style scoped>
.book-management-container {
  padding: 30px;
  max-width: 1000px;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 32px;
  color: #2c3e50;
  text-shadow: none;
  margin-bottom: 35px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.5px;
}

.controls-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  justify-content: flex-start;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

button:hover {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-add {
  background: linear-gradient(to right, #28a745, #218838);
}

.btn-add:hover {
  background: linear-gradient(to right, #218838, #1e7e34);
}

.btn-success {
  background: linear-gradient(to right, #007bff, #0056b3);
}

.btn-success:hover {
  background: linear-gradient(to right, #0056b3, #004085);
}

.ml-2 {
  margin-left: 0;
}

@media (max-width: 768px) {
  .book-management-container {
    padding: 20px;
    margin: 30px auto;
    border-radius: 12px;
  }
  h1 {
    font-size: 26px;
    margin-bottom: 30px;
  }
  .controls-group {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 6px;
  }
  .ml-2 {
    margin-left: 0;
  }
}

@media (max-width: 576px) {
  .book-management-container {
    padding: 15px;
    margin: 20px auto;
    border-radius: 10px;
  }
  h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }
  button {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>