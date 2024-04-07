<script setup lang="ts">
defineOptions({
  name: 'MasonryConfig'
});

const filePath = 'masonry';
const fileName = 'salon.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
