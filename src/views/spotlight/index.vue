<script setup lang="ts">
defineOptions({
  name: 'SpotlightConfig'
});

const filePath = 'spotlight';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
