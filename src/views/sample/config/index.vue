<script setup lang="ts">
defineOptions({
  name: 'SampleConfig'
});

const filePath = 'sample';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
