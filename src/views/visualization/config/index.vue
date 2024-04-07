<script setup lang="ts">
defineOptions({
  name: 'VisualizationConfig'
});

const filePath = 'visualization';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
