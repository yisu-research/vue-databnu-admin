<script setup lang="ts">
defineOptions({
  name: 'VisualizationImage'
});

const filePath = 'visualization';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
