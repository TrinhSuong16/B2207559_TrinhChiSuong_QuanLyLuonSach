<template>
  <div class="sach-card" :class="{ 'no-hover': showDetails }">
    <div class="sach-info">
      <!-- Hình ảnh sách -->
      <img
        v-if="sach.hinhAnh"
        :src="sach.hinhAnh"
        alt="Hình ảnh sách"
        class="sach-image"
      />
      <img
        v-else-if="getNXBName(sach.maNXB) === 'Nhà Xuất Bản Giáo Dục Việt Nam'"
        src="https://lambanner.com/wp-content/uploads/2022/01/MNT-DESGIN-THIET-KE-BIA-SACH-1130x570.jpg"
        alt="Hình ảnh sách"
        class="sach-image"
      />
      <img
        v-else-if="getNXBName(sach.maNXB) === 'Nhà Xuất Bản Trẻ'"
        src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088775_1280.jpg"
        alt="Hình ảnh sách"
        class="sach-image"
      />
      <img
        v-else
        src="https://png.pngtree.com/element_our/20190522/ourmid/pngtree-open-book-illustration-image_1072047.jpg"
        alt="Hình ảnh sách"
        class="sach-image"
      />

      <!-- Tên sách -->
      <h2 class="sach-title">{{ sach.tenSach }}</h2>

      <!-- Nút xem thông tin sách -->
      <button class="btn-view-info" @click="showDetails = true">Xem thông tin sách</button>

      <!-- Nút mượn sách -->
      <button
        class="btn-borrow"
        @click="$emit('borrow', sach)"
        :disabled="sach.soQuyen === 0"
      >
        Mượn sách ngay
      </button>
    </div>

    <!-- Overlay Thông tin sách -->
    <div class="book-details-overlay" v-if="showDetails">
      <div class="book-details-modal">
        <h3>Thông tin chi tiết</h3>
        <h2 class="sach-title">{{ sach.tenSach }}</h2>
        <p><strong>Mã sách:</strong> {{ sach.maSach || "Không rõ" }}</p>
        <p><strong>Tác giả:</strong> {{ sach.tacGia || "Không rõ" }}</p>
        <p><strong>Năm xuất bản:</strong> {{ sach.namXB || "Không rõ" }}</p>
        <p><strong>Nhà xuất bản:</strong> {{ getNXBName(sach.maNXB) || "Không rõ" }}</p>
        <p><strong>Giá:</strong> {{ formatPrice(sach.donGia) }}</p>
        <p>
          <strong>Tình trạng:</strong>
          <span :class="{ 'out-of-stock': sach.soQuyen === 0 }">
            {{ sach.soQuyen > 0 ? `${sach.soQuyen} quyển` : 'Hết sách' }}
          </span>
        </p>
        <button class="btn-close" @click="showDetails = false"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sach: Object,
    nxbs: Array
  },
  data() {
    return {
      showDetails: false
    };
  },
  methods: {
    getNXBName(maNXB) {
      if (!maNXB || !this.nxbs) return 'Chưa có NXB';

      const manxb = typeof maNXB === 'object' ? maNXB.toString() : String(maNXB);
      const nxb = this.nxbs.find(n =>
        String(n.maNXB) === manxb || String(n._id) === manxb
      );

      return nxb ? nxb.tenNXB : 'Không tìm thấy';
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(price);
    }
  }
};
</script>

<style scoped>
/* Thẻ card hiển thị sách */
.sach-card {
  width: 270px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  text-align: center;
  padding: 20px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sach-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
}

.no-hover:hover {
  transform: none !important;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15) !important;
}

/* Ảnh sách */
.sach-image {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.sach-card:hover .sach-image {
  transform: scale(0.95);
}

.no-hover .sach-image {
  transform: none !important;
}

/* Tên sách */
.sach-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-top: 12px;
  text-align: center;
}

/* Nút */
.btn-view-info,
.btn-borrow {
  margin-top: 10px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-view-info {
  background-color: #26a69a;
  color: white;
}

.btn-view-info:hover {
  background-color: #00796b;
}

.btn-borrow {
  background-color: #5c6bc0;
  color: white;
}

.btn-borrow:hover {
  background-color: #3949ab;
}

.btn-borrow:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Overlay khi hiển thị thông tin sách */
.book-details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.25s ease forwards;
}

/* Hiệu ứng mượt khi hiện overlay */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1); /* tránh gây giật */
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Hộp modal thông tin */
.book-details-modal {
  background: #fff;
  padding: 30px 20px;
  border-radius: 14px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: left;
  animation: slideUp 0.25s ease forwards;
}

/* Hiệu ứng xuất hiện modal */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px); /* mượt hơn */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tên sách lớn trong modal */
.book-details-modal h3 {
  margin-bottom: 15px;
  font-size: 22px;
  color: #2c3e50;
  text-align: center;
}

/* Dòng thông tin */
.book-details-modal p {
  font-size: 15px;
  margin: 8px 0;
  color: #444;
}

/* Thông báo hết sách */
.book-details-modal .out-of-stock {
  color: red;
  font-weight: bold;
}

.btn-close {
  margin: 20px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e74c3c;
  color: white;
  width: 40px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-close:hover {
  background-color: #c0392b;
  transform: scale(1.1);
}

</style>
