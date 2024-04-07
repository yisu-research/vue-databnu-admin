<script setup lang="ts">
defineOptions({
  name: 'CooperationImage'
});

const filePath = 'cooperation';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
