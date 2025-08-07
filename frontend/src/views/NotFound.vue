<template>
  <div class="not-found-container">
    <div class="glass-box">
      <h1>404</h1>
      <h2>Trang không tồn tại</h2>
      <p>Trang bạn đang tìm có thể đã bị xóa, hoặc không còn tồn tại.</p>
      <router-link to="/" class="home-button"> Về trang chủ</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('@/assets/404-bg.jpg') no-repeat center center / cover;
  backdrop-filter: blur(8px);
  padding: 20px;
}

.glass-box {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  border-radius: 16px;
  padding: 40px 32px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  max-width: 480px;
  width: 100%;
}

h1 {
  font-size: 100px;
  margin: 0;
  font-weight: 800;
  color: #ff4e4e;
}

h2 {
  font-size: 26px;
  margin: 12px 0;
  font-weight: 600;
  color: #ffffffdd;
}

p {
  font-size: 16px;
  color: #141313;
  margin-bottom: 28px;
}

.home-button {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.home-button:hover {
  background: linear-gradient(to right, #5b68df, #5c3f99);
  transform: translateY(-2px);
}
</style>
