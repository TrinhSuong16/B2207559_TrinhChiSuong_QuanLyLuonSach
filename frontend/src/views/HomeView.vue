<template>
  <div class="container text-center mt-5">
    <InputSearch v-model="search" />

    <div class="sach-list">
      <SachCard
        v-for="sach in paginatedBooks"
        :key="sach.maSach"
        :sach="sach"
        :nxbs="nxbs"
        @borrow="handleBorrow"
      />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i> Trang trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Trang sau <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <BorrowForm
      v-if="showBorrowForm"
      :book="selectedSach"
      @close="showBorrowForm = false"
    />
  </div>
</template>

<script>
import SachCard from '@/components/SachCard.vue'
import InputSearch from '@/components/InputSearch.vue'
import BorrowForm from '@/components/BorrowForm.vue'
import { fetchBooks } from '@/services/sachService'
import { fetchNXB } from '@/services/nxbService'

export default {
  components: {
    SachCard,
    InputSearch,
    BorrowForm
  },
  data() {
    return {
      sachList: [],
      search: '',
      nxbs: [],
      currentPage: 1,
      pageSize: 12,
      selectedSach: null,
      showBorrowForm: false
    }
  },
  mounted() {
    this.loadBooks()
    this.loadNXBs()
  },
  computed: {
    filteredBooks() {
      return this.sachList.filter(book => {
        const keyword = this.search.normalize("NFC").toLowerCase().trim();
        const manxbValue = book.maNXB?._id || book.maNXB || '';
        const nxb = this.nxbs.find(n => String(n.maNXB).trim() === String(manxbValue).trim());
        const tenNXB = nxb ? nxb.tenNXB.normalize("NFC").toLowerCase() : '';
        return (
          book.tenSach?.normalize("NFC").toLowerCase().includes(keyword) ||
          book.maSach?.toLowerCase().includes(keyword) ||
          book.tacGia?.toLowerCase().includes(keyword) ||
          (book.namXB?.toString() || '').toLowerCase().includes(keyword) ||
          tenNXB.includes(keyword)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.pageSize)
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredBooks.slice(start, end)
    }
  },
  methods: {
    async loadBooks() {
      try {
        this.sachList = await fetchBooks()
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
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    handleBorrow(sach) {
      this.selectedSach = sach
      this.showBorrowForm = true
    }
  }
}
</script>

<style scoped>
h2 {
  color: #5a4631;
}
.card {
  max-width: 500px;
  margin: auto;
  border-radius: 15px;
}
.sach-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination button {
  padding: 8px 12px;
  margin: 5px;
  border: none;
  background: #b89e25;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.pagination span {
  margin: 15px;
}
</style>
