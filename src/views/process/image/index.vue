<script setup lang="ts">
defineOptions({
  name: 'ProcessImage'
});

const filePath = 'process';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
