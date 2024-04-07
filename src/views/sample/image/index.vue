<script setup lang="ts">
defineOptions({
  name: 'SampleImage'
});

const filePath = 'sample';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
