<script setup lang="ts">
defineOptions({
  name: 'BannerConfig'
});

const filePath = 'banner';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
