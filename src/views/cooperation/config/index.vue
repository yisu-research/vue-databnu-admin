<script setup lang="ts">
defineOptions({
  name: 'CooperationConfig'
});

const filePath = 'cooperation';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
