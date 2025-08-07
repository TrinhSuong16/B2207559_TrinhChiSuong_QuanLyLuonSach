<style scoped>
.input-group {
  max-width: 480px;
  margin: 30px auto;
  display: flex;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  overflow: hidden;
  background: #ffffff;
}

.form-control {
  flex: 1;
  border: none;
  padding: 14px 20px;
  font-size: 16px;
  border-radius: 30px 0 0 30px;
  background-color: #f5f5f5;
  transition: background 0.3s, box-shadow 0.3s;
}

.form-control:focus {
  outline: none;
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #667eea;
}

.btn-outline-secondary {
  border: none;
  padding: 0 24px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  border-radius: 0 30px 30px 0;
}

.btn-outline-secondary:hover {
  background: linear-gradient(to right, #5b68df, #5c3f99);
  transform: translateY(-2px);
}
</style>


<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Nhập thông tin tìm kiếm ...." :value="modelValue"
      @input="updateModelValue" @keyup.enter="submit" />
    <button class="btn btn-outline-secondary" @click="submit">Tìm kiếm 🔍</button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue", "submit"]);

const updateModelValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const submit = () => {
  emit("submit");
};
</script>
