<template>
  <div>
    <TheoDoiMuonList 
      :danhSachDonMuon="danhSachDonMuon"
      :danhSachDocGia="danhSachDocGia"
      :danhSachSach="danhSachSach"
      @duyetMuon="duyetMuon" 
      @xacNhanTra="xacNhanTra"
      @xoaDonMuon="xoaDonMuon"
    />
  </div>
</template>

<script>
import TheoDoiMuonList from "@/components/TheoDoiMuonList.vue";
import axios from "axios";

export default {
  components: { TheoDoiMuonList },
  data() {
    return {
      danhSachDonMuon: [],
      danhSachDocGia: [],
      danhSachSach: [],
    };
  },
  mounted() {
    this.loadDanhSachMuon();
    this.loadDanhSachDocGia();
    this.loadDanhSachSach();
  },
  methods: {
    async loadDanhSachMuon() {
      try {
        const res = await axios.get("http://localhost:3000/api/theodoi");
        this.danhSachDonMuon = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn mượn:", error);
      }
    },
    async loadDanhSachDocGia() {
      try {
        const res = await axios.get("http://localhost:3000/api/docgia");
        this.danhSachDocGia = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn mượn:", error);
      }
    },
    async loadDanhSachSach() {
      try {
        const res = await axios.get("http://localhost:3000/api/sach");
        this.danhSachSach = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn mượn:", error);
      }
    },
    async duyetMuon(don) {
      if (!confirm("Bạn có chắc chắn duyệt đơn mượn sách này chứ?")) return;

      try {
        await axios.put(`http://localhost:3000/api/theodoi/duyetMuonSach/${don._id}`);
        this.loadDanhSachMuon();
      } catch (error) {
        console.error("Lỗi khi duyệt mượn:", error);
      }
    },
    async xacNhanTra(don) {
      if (!confirm("Bạn có chắc chắn sách này đã được trả chứ?")) return;

      try {
        await axios.put(`http://localhost:3000/api/theodoi/xacNhanTraSach/${don._id}`);
        this.loadDanhSachMuon();
      } catch (error) {
        console.error("Lỗi khi xác nhận trả:", error);
      }
    },
    async xoaDonMuon(don) {
      if (!confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;

      try {
        const response = await axios.delete(`http://localhost:3000/api/theodoi/${don._id}`);
        this.danhSachDonMuon = this.danhSachDonMuon.filter(item => item._id !== don._id);
        alert(response.data.message || "Xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa yêu cầu:", error);
        if (error.response) {
          console.error("Chi tiết lỗi:", error.response.data);
          if (error.response.status === 404) {
            alert("Lịch sử mượn không tồn tại hoặc đã bị xóa!");
          } else {
            alert(error.response.data.message || "Xóa không thành công!");
          }
        }
      }
    },
  }
};
</script>
