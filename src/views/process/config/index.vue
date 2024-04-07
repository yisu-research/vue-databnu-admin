<script setup lang="ts">
defineOptions({
  name: 'ProcessConfig'
});

const filePath = 'process';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
