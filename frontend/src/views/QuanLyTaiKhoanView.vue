<style scoped>
.quanly-acc-container {
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 32px;
  color: #2c3e50;
  text-shadow: none;
  margin-bottom: 35px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

button {
  padding: 12px 22px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white; /* Đặt màu chữ mặc định là trắng */
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Các màu sắc mới cho nút */
.btn-docgia {
  background: linear-gradient(to right, #4CAF50, #2E7D32); /* Xanh lá cây đậm */
}

.btn-docgia:hover {
  background: linear-gradient(to right, #388E3C, #1B5E20);
}

.btn-nhanvien {
  background: linear-gradient(to right, #2196F3, #1976D2); /* Xanh dương đậm */
}

.btn-nhanvien:hover {
  background: linear-gradient(to right, #1976D2, #0D47A1);
}

.btn-add-nhanvien {
  background: linear-gradient(to right, #FFC107, #EF6C00); /* Cam vàng rực rỡ */
  color: #333; /* Chữ màu đậm hơn cho nền cam để dễ đọc */
}

.btn-add-nhanvien:hover {
  background: linear-gradient(to right, #F57C00, #E65100);
}

/* Hiệu ứng cho nút đang hoạt động (active tab) */
button.active {
  border: 2px solid #3f51b5;
  box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.3);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .quanly-acc-container {
    padding: 25px;
    margin: 30px auto;
    border-radius: 12px;
  }
  h1 {
    font-size: 26px;
    margin-bottom: 30px;
  }
  .buttons {
    gap: 10px;
    margin-bottom: 25px;
  }
  button {
    padding: 10px 18px;
    font-size: 14px;
    border-radius: 6px;
    min-width: 130px;
  }
}

@media (max-width: 576px) {
  .quanly-acc-container {
    padding: 20px;
    margin: 20px auto;
    border-radius: 10px;
  }
  h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }
  .buttons {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    padding: 12px;
    font-size: 14px;
  }
}
</style>

<template>
  <div class="quanly-acc-container">
    <h1>Quản lý tài khoản</h1>

    <div class="buttons">
      <button @click="activeTab = 'docgia'" :class="{ active: activeTab === 'docgia', 'btn-docgia': true }">
        Danh sách Độc giả
      </button>
      <button @click="activeTab = 'nhanvien'" :class="{ active: activeTab === 'nhanvien', 'btn-nhanvien': true }">
        Danh sách Nhân viên 
      </button>
      <button @click="showNhanVienForm = true" class="btn-add-nhanvien">
        + Thêm nhân viên mới
      </button>
    </div>

    <NhanVienForm
      v-if="showNhanVienForm"
      @submit="addNhanVien"
      @cancel="showNhanVienForm = false"
    />

    <DocGiaList
      v-if="activeTab === 'docgia'"
      :docGias="docGias"
      @deleteDocGia="deleteDocGia"
    />
    <NhanVienList
      v-if="activeTab === 'nhanvien'"
      :nhanViens="nhanViens"
      @deleteNhanVien="deleteNhanVien"
    />
  </div>
</template>

<script>
  import axios from 'axios'
  import DocGiaList from '@/components/DocGiaList.vue'
  import NhanVienList from '@/components/NhanVienList.vue'
  import NhanVienForm from '@/components/NhanVienForm.vue'

  export default {
    components: { DocGiaList, NhanVienList, NhanVienForm },
    data() {
      return {
        activeTab: 'docgia',
        docGias: [],
        nhanViens: [],
        showNhanVienForm: false
      }
    },
    async created() {
      await this.fetchDocGias()
      await this.fetchNhanViens()
    },
    methods: {
      async fetchDocGias() {
        try {
          const response = await axios.get('http://localhost:3000/api/docgia')
          this.docGias = response.data.map(docGia => docGia._doc || docGia)
        } catch (error) {
          console.error('Lỗi khi tải danh sách độc giả:', error)
        }
      },
      async fetchNhanViens() {
        try {
          const response = await axios.get('http://localhost:3000/api/nhanvien')
          this.nhanViens = response.data.map(nhanVien => nhanVien._doc || nhanVien)
        } catch (error) {
          console.error('Lỗi khi tải danh sách nhân viên:', error)
        }
      },
      async deleteDocGia(id) {
        if (confirm('Bạn có chắc muốn xóa độc giả này?')) {
          try {
            await axios.delete(`http://localhost:3000/api/docgia/${id}`)
            this.docGias = this.docGias.filter(docgia => docgia._id !== id)
            alert('Xóa độc giả thành công!')
          } catch (error) {
            console.error('Lỗi khi xóa độc giả:', error)
          }
        }
      },
      async deleteNhanVien(id) {
        if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
          try {
            await axios.delete(`http://localhost:3000/api/nhanvien/${id}`)
            this.nhanViens = this.nhanViens.filter(nhanvien => nhanvien._id !== id)
            alert('Xóa nhân viên thành công!')
          } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error)
          }
        }
      },

      // ✅ Hàm thêm nhân viên - sửa lỗi thông báo sai
      async addNhanVien(nvData) {
        try {
          const res = await axios.post("http://localhost:3000/api/nhanvien/register", nvData);

          if (res.status === 200 && res.data && !res.data.error) {
            alert("Thêm nhân viên thành công!");
            this.showNhanVienForm = false;
            await this.fetchNhanViens();
          } else {
            const msg = res.data.message || "Đăng ký thất bại.";
            alert("Thêm thất bại: " + msg);
          }
        } catch (err) {
          const msg = err?.response?.data?.message || "Đã xảy ra lỗi khi thêm nhân viên!";
         
        }
      }

    }
  }
</script>


