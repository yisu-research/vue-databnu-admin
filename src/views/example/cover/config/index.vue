<script setup lang="ts">
defineOptions({
  name: 'ExampleCoverConfig'
});

const filePath = 'example';
const fileName = 'cover.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
