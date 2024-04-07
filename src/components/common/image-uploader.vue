<script lang="ts" setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';
import { $t } from '@/locales';
import { useConfigStore } from '@/store/modules/config';

defineOptions({ name: 'ImageUploader' });

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const IMAGE_TYPE_REG = /^image\/(png|jpg|jpeg|svg|xml|webp|gif)$/;

interface Props {
  filePath: string;
}

const props = defineProps<Props>();
const filePath = shallowRef(props.filePath);

const configStore = useConfigStore();

const showModal = shallowRef(false);
const previewFileList = ref<UploadFileInfo[]>([]);
const previewImage = reactive({
  name: '',
  url: ''
});

const handlePreview = (file: UploadFileInfo) => {
  const { name, url } = file;
  previewImage.name = name ?? '';
  previewImage.url = url ?? '';
  showModal.value = true;
};

const handleBeforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if ((data.file.file?.size ?? 0) > FILE_SIZE_LIMIT) {
    window.$message?.error($t('image.tooLarge'));
    return false;
  }

  if (!IMAGE_TYPE_REG.test(data.file.file?.type ?? '')) {
    window.$message?.error($t('image.notImage'));
    return false;
  }

  const nameList = data.fileList.map(item => item.name);
  if (nameList.includes(data.file.name)) {
    window.$message?.error($t('image.alreadyExist'));
    return false;
  }

  return true;
};

const handleSubmit = ({
  file,
  data,
  headers,
  withCredentials,
  onFinish,
  onError,
  onProgress
}: UploadCustomRequestOptions) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(key, data[key as keyof UploadCustomRequestOptions['data']]);
    });
  }
  formData.append('file', file.file as File);

  configStore
    .uploadImage({
      withCredentials,
      headers: headers as Record<string, string>,
      data: formData,
      onUploadProgress: ({ percent }: { percent: number }) => {
        onProgress({ percent: Math.ceil(percent) });
      }
    })
    .then(() => {
      window.$message?.success($t('common.addSuccess'));
      onFinish();
    })
    .catch(error => {
      window.$message?.error(error.message);
      onError();
    });
};

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  previewFileList.value = data.fileList;
};

const handleFinish = ({ file }: { file: UploadFileInfo }) => {
  file.url = configStore.updateImageUrl(filePath.value, file.name);
  return file;
};

onMounted(async () => {
  previewFileList.value = await configStore.getImageList(filePath.value);
});
</script>

<template>
  <div class="uploader">
    <NUpload
      v-model:file-list="previewFileList"
      action="#"
      :headers="{ 'content-type': 'application/x-www-form-urlencoded' }"
      :data="{
        file_path: filePath
      }"
      file-list-class="uploader-list"
      list-type="image-card"
      accept="image/*"
      :show-remove-button="false"
      :custom-request="handleSubmit"
      @before-upload="handleBeforeUpload"
      @preview="handlePreview"
      @change="handleUploadChange"
      @finish="handleFinish"
    />

    <NModal v-model:show="showModal" preset="card" style="width: 600px" :title="previewImage.name">
      <img :src="previewImage.url" style="width: 100%" loading="lazy" />
    </NModal>
  </div>
</template>

<style lang="scss" scoped>
$column-width: 160px;
$column-gap: 16px;

.uploader {
  :deep(.uploader-list) {
    grid-template-columns: repeat(auto-fill, $column-width);
    grid-gap: $column-gap;

    .n-upload-file,
    .n-upload-trigger {
      width: $column-width;
      height: $column-width;
    }
  }
}
</style>
