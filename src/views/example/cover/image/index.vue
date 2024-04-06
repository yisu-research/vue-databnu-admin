<script setup lang="ts">
defineOptions({
  name: 'ExampleCoverImage'
});

const filePath = 'example_cover';
// const fileName = 'index.json';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
