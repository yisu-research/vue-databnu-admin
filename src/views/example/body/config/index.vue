<script setup lang="ts">
defineOptions({
  name: 'ExampleBodyConfig'
});

const filePath = 'example';
const fileName = 'body.json';
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" />
</template>

<style scoped></style>
