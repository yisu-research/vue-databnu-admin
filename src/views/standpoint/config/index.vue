<script setup lang="ts">
defineOptions({
  name: 'StandpointConfig'
});

const filePath = 'standpoint';
const fileName = 'index.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
