<script setup lang="ts">
defineOptions({
  name: 'FeatureConfig'
});

const filePath = 'feature';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
