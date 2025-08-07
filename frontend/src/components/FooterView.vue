<template>
  <footer class="footer">
    <div class="container footer-container">
      <!-- Logo + mô tả -->
      <div class="footer-section footer-branding">
        <img src="../assets/logo.png" alt="Logo hệ thống" class="footer-logo" />
        <p>Hệ thống giúp độc giả đăng ký và quản lý mượn sách trực tuyến một cách thuận tiện, hiệu quả.</p>
      </div>

      <!-- Liên hệ -->
      <div class="footer-section">
        <h4>Liên Hệ</h4>
        <p><i class="bi bi-geo-alt"></i> Đại Học Cần Thơ</p>
        <p><i class="bi bi-envelope"></i> suong0344887316@gmail.com</p>
        <p><i class="bi bi-telephone"></i> 0344 887 316 (Hỗ trợ 24/7)</p>
      </div>

      <!-- Thông tin -->
      <div class="footer-section">
        <h4>Thông Tin</h4>
        <span class="footer-link" @click="openModal('gioithieu')">Giới thiệu</span><br />
        <span class="footer-link" @click="openModal('dieukhoan')">Điều khoản mượn sách</span><br />
        <span class="footer-link" @click="openModal('huongdan')">Hướng dẫn sử dụng</span>
      </div>
    </div>

    <div class="footer-bottom">© 2025 Hệ Thống Quản Lý Mượn Sách</div>

    <!-- Modal -->
    <div v-if="activeModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        <div v-if="activeModal === 'gioithieu'">
          <h3>Giới Thiệu</h3>
          <p>Hệ thống quản lý mượn sách giúp bạn dễ dàng theo dõi và quản lý việc mượn sách trực tuyến.</p>
        </div>
        <div v-else-if="activeModal === 'dieukhoan'">
          <h3>Điều Khoản Mượn Sách</h3>
          <p>1. Độc giả cần tài khoản hợp lệ để sử dụng hệ thống.</p>
          <p>2. Thời gian mượn tối đa là 20 ngày; hệ thống sẽ nhắc trước 3 ngày.</p>
          <p>3. Phí phạt áp dụng nếu trễ hạn hoặc hư hỏng sách.</p>
          <p>4. Có thể gia hạn nếu yêu cầu trước hạn.</p>
        </div>
        <div v-else-if="activeModal === 'huongdan'">
          <h3>Hướng Dẫn Sử Dụng</h3>
          <p>1. Đăng nhập bằng số điện thoại và mật khẩu.</p>
          <p>2. Duyệt sách và gửi yêu cầu mượn.</p>
          <p>3. Theo dõi lịch sử mượn và trả.</p>
          <p>4. Tuân thủ quy định mượn trả.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      activeModal: null,
    };
  },
  methods: {
    openModal(type) {
      this.activeModal = type;
    },
    closeModal() {
      this.activeModal = null;
    },
  },
};
</script>

<style scoped>
.footer {
  background: linear-gradient(to right, #f1f5f9, #e2e8f0);
  padding: 40px 20px 20px;
  color: #334155;
  font-family: 'Segoe UI', sans-serif;
  border-top: 3px solid #1e3a8a;
  margin-top: 50px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-section {
  flex: 1;
  min-width: 260px;
}

.footer-section h4 {
  font-size: 18pt;
  margin-bottom: 15px;
  color: #1e3a8a;
  border-bottom: 2px solid #38bdf8;
  padding-bottom: 5px;
}

.footer-section p,
.footer-link {
  font-size: 14pt;
  margin: 8px 0;
  color: #334155;
  line-height: 1.6;
}

.footer-link {
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition: 0.3s ease;
}

.footer-link::after {
  content: '';
  width: 100%;
  height: 2px;
  background: #38bdf8;
  display: block;
  transform: scaleX(0);
  transition: transform 0.3s;
}

.footer-link:hover {
  color: #1e3a8a;
}

.footer-link:hover::after {
  transform: scaleX(1);
}

.footer-logo {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(30, 58, 138, 0.2);
}

.footer-branding p {
  font-size: 13pt;
  color: #334155;
}

.footer-bottom {
  text-align: center;
  font-size: 12pt;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #1e3a8a;
  color: #1e3a8a;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 41, 59, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  border: 2px solid #1e3a8a;
  box-shadow: 0 10px 30px rgba(30, 41, 59, 0.25);
  position: relative;
  animation: fadeIn 0.3s ease;
  color: #334155;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 26px;
  color: #1e3a8a;
  background: none;
  border: none;
  cursor: pointer;
}

.close-btn:hover {
  color: #38bdf8;
}

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

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }
  .footer-section h4 {
    font-size: 16pt;
  }
  .footer-section p,
  .footer-link {
    font-size: 12pt;
  }
  .footer-logo {
    margin: 0 auto 15px;
  }
}

</style>
