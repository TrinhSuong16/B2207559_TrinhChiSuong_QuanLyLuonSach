import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/store'

import HomeView from '@/views/HomeView.vue';
import LoginNhanVien from '@/views/LoginNhanVien.vue';
import LoginDocGia from '@/views/LoginDocGia.vue';
import RegisterView from '@/views/RegisterView.vue';
import NotFound from '@/views/NotFound.vue';
import QuanLySachView from '@/views/QuanLySachView.vue';
import AccountView from '@/views/AccountView.vue';
import MuonSachView from '@/views/MuonSachView.vue';
import LichSuMuonView from '@/views/LichSuMuonView.vue';
import TheoDoiMuonView from '@/views/TheoDoiMuonView.vue';
import QuanLyTaiKhoanView from '@/views/QuanLyTaiKhoanView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/loginnhanvien', component: LoginNhanVien },
  { path: '/logindocgia', component: LoginDocGia },
  { path: '/register', component: RegisterView },
  { path: '/:pathMatch(.*)*', component: NotFound },
  {
    path: '/quanlysach',
    component: QuanLySachView,
    meta: { requiresAuth: true, role: 'quanly' }
  },
  { 
    path: '/taikhoan', 
    component: AccountView, 
    meta: { requiresAuth: true }
  },
  {
    path: '/muonsach',
    component: MuonSachView,
    meta: { requiresAuth: true, role: 'docgia' }
  },
  {
    path: '/lichsumuon',
    component: LichSuMuonView,
    meta: { requiresAuth: true, role: 'docgia' }
  },
  {
    path: '/theodoimuon',
    component: TheoDoiMuonView,
    meta: { requiresAuth: true, role: ['quanly', 'nhanvien'] }
  },
  {
    path: '/quanlytaikhoan',
    component: QuanLyTaiKhoanView,
    meta: { requiresAuth: true, role: 'quanly' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn
  const role = store.getters.getUserRole

  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('Bạn chưa đăng nhập!');
    next('/logindocgia');
  } else if (to.meta.role && ![].concat(to.meta.role).includes(role)) {
    alert('Bạn không đủ quyền truy cập vào trang này!');
    next(from.fullPath);
  } else {
    next();
  }
});

export default router;
