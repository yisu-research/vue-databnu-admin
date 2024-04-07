<script setup lang="ts">
defineOptions({
  name: 'ExampleCoverImage'
});

const filePath = 'example_cover';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
