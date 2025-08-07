<template>
    <div class="overlay">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="tenNXB">Tên Nhà Xuất Bản</label>
                <input type="text" class="form-control" v-model="nxbLocal.tenNXB" required />
            </div>
            <div class="form-group">
                <label for="diachiNXB">Địa Chỉ</label>
                <input type="text" class="form-control" v-model="nxbLocal.diachiNXB" />
            </div>
            <button type="submit" class="btn btn-success">Lưu</button>
            <button type="button" class="btn btn-secondary ml-2" @click="$emit('cancel')">Hủy</button>
        </form>
    </div>
</template>


<script>
export default {
    props: {
        nxb: { type: Object, default: () => ({ tenNXB: "", diachiNXB: "" }) },
    },
    data() {
        return {
            nxbLocal: { ...this.nxb },
        };
    },
    methods: {
        submitForm() {
            if (!this.nxbLocal.tenNXB.trim()) {
                alert("Tên Nhà Xuất Bản không được để trống!");
                return;
            }
            this.$emit("submit", this.nxbLocal);
        },
    },
};
</script>
 
<style scoped>
/* Lớp phủ nền mờ */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

/* Form chính */
form {
    background: #f9f9f9;
    padding: 20px 25px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    font-family: Arial, sans-serif;
    width: 100%;
    max-width: 500px;
    z-index: 1000;
    position: relative;
}

/* Các nhóm input */
.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
}

/* Nút */
.btn {
    padding: 10px 15px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
}

.btn-success {
    background-color: #28a745;
    border: none;
    color: white;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-secondary {
    background-color: red;
    border: none;
    color: white;
}

.btn-secondary:hover {
    background-color: orange;
}

.ml-2 {
    margin-left: 10px;
}

@media (max-width: 768px) {
    form {
        max-width: 90%;
        padding: 15px;
    }

    input {
        font-size: 16px;
        padding: 12px;
    }

    .btn {
        width: 100%;
        display: block;
        text-align: center;
        margin-bottom: 10px;
    }

    .ml-2 {
        margin-left: 0;
    }
}
</style>