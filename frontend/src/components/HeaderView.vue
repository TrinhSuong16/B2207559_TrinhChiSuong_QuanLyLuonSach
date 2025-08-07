<template>
  <div class="header-bar">
    <!-- Bên trái: Logo + Tên -->
    <div class="header-left">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <span class="store-name">Thư Viện TCS</span>
    </div>

    <!-- Navbar nằm ngay bên phải logo + tên -->
    <nav class="navbar-center">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Trang chủ</router-link>
        </li>

        <template v-if="userRole === 'docgia'">
          <li class="nav-item">
            <router-link class="nav-link" to="/muonsach">Đăng ký Mượn Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lichsumuon">Lịch Sử Mượn Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/taikhoan">Thông Tin Tài Khoản</router-link>
          </li>
        </template>

        <template v-else-if="userRole === 'quanly'">
          <li class="nav-item">
            <router-link class="nav-link" to="/theodoimuon">Theo Dõi Mượn Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/quanlysach">Quản Lý Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/quanlytaikhoan">Quản Lý Tài Khoản</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/taikhoan">Thông Tin Tài Khoản</router-link>
          </li>
        </template>

        <template v-else-if="userRole === 'nhanvien'">
          <li class="nav-item">
            <router-link class="nav-link" to="/theodoimuon">Theo Dõi Mượn Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/taikhoan">Thông Tin Tài Khoản</router-link>
          </li>
        </template>

        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/logindocgia">Đăng nhập</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Đăng ký</router-link>
          </li>
        </template>

        <li class="nav-item" v-if="userRole">
          <router-link class="nav-link logout" to="/logout" @click="handleLogout">
            Đăng Xuất
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    userRole() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/logindocgia");
    }
  }
};
</script>

<style scoped>
/* Header tổng thể */
.header-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #1a2b4c;
  padding: 14px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  height: 70px;
  gap: 90px; /* Khoảng cách giữa logo+name và navbar */
}

/* Bên trái: logo và tên */
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 45px;
  width: 45px;
  object-fit: cover;
}

.store-name {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

/* Navbar bên phải */
.navbar-center {
  position: static;
  transform: none;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  color: #f0f0f0 !important;
  font-weight: 500;
  font-size: 15px;
  padding: 8px 14px;
  border-radius: 6px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
}

.nav-link:hover {
  background-color: #88b0f0;
  color: #ffffff !important;
  transform: translateY(-1px);
}

/* Nút Đăng xuất */
.logout {
  background-color: #e53935;
  color: #fff !important;
  font-weight: 600;
}

.logout:hover {
  background-color: #c62828;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .header-bar {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 12px;
    gap: 10px;
  }

  .navbar-center {
    width: 100%;
  }

  .navbar-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .nav-link {
    width: 100%;
  }
}
</style>
