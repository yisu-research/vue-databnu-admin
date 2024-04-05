<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/store/modules/config';

defineOptions({
  name: 'ExampleCoverConfig'
});

const configStore = useConfigStore();

const filePath = 'example';
const fileName = 'cover.json';

const configData = ref('');

onMounted(async () => {
  const data = await configStore.getConfig(filePath, fileName);
  configData.value = JSON.stringify(data, null, '  ');
});
</script>

<template>
  <JsonEditor :file-path="filePath" :file-name="fileName" :code="configData" />
</template>

<style scoped></style>
