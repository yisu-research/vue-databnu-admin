<script setup lang="ts">
defineOptions({
  name: 'FooterConfig'
});

const filePath = 'footer';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
