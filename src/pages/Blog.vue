<script setup>
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';

// blog/:idのidを取得する
const route = useRoute();
const id = ref(route.params.id);
console.log('watch外：', id);

watch(route, () => {
  id.value = route.params.id;
  console.log('watch内：', id.value);
});
</script>
<template>
  <p>blog page</p>
  <p>blog id = {{ id }}</p>
</template>
