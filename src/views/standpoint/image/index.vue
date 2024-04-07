<script setup lang="ts">
defineOptions({
  name: 'StandpointImage'
});

const filePath = 'standpoint';
</script>

<template>
  <ImageUploader :file-path="filePath" />
</template>

<style scoped></style>
