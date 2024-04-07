<script setup lang="ts">
defineOptions({
  name: 'ExampleBodyImage'
});

const filePath = 'example_body';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
