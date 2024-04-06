<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { useConfigStore } from '@/store/modules/config';

defineOptions({ name: 'ImageUploader' });

interface Props {
  filePath: string;
  // fileName: string;
}

const props = defineProps<Props>();

const configStore = useConfigStore();

const showModal = shallowRef(false);
const previewImageUrl = shallowRef('');
const previewFileList = ref<UploadFileInfo[]>([
  {
    id: 'Computers-in-Human-Behavior.jpg',
    name: 'Computers-in-Human-Behavior.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/Computers-in-Human-Behavior.jpg'
  },
  {
    id: 'Food-Quality-and-Preference.png',
    name: 'Food-Quality-and-Preference.png',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/Food-Quality-and-Preference.png'
  },
  {
    id: 'Foods.jpg',
    name: 'Foods.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/Foods.jpg'
  },
  {
    id: '中小学电教.jpg',
    name: '中小学电教.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/中小学电教.jpg'
  },
  {
    id: '南京医科大学学报(社会科学版).jpg',
    name: '南京医科大学学报(社会科学版).jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/南京医科大学学报(社会科学版).jpg'
  },
  {
    id: '国际新闻界.jpg',
    name: '国际新闻界.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/国际新闻界.jpg'
  },
  {
    id: '学苑教育.jpg',
    name: '学苑教育.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/学苑教育.jpg'
  },
  {
    id: '教育传媒研究.jpg',
    name: '教育传媒研究.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/教育传媒研究.jpg'
  },
  {
    id: '新闻与传播研究.jpg',
    name: '新闻与传播研究.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/新闻与传播研究.jpg'
  },
  {
    id: '新闻与写作.jpg',
    name: '新闻与写作.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/新闻与写作.jpg'
  },
  {
    id: '新闻战线.jpg',
    name: '新闻战线.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/新闻战线.jpg'
  },
  {
    id: '新闻界.jpg',
    name: '新闻界.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/新闻界.jpg'
  },
  {
    id: '武汉体育学院学报.png',
    name: '武汉体育学院学报.png',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/武汉体育学院学报.png'
  },
  {
    id: '科技智囊.jpg',
    name: '科技智囊.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/科技智囊.jpg'
  },
  {
    id: '西南民族大学学报人文社会科学版.jpg',
    name: '西南民族大学学报人文社会科学版.jpg',
    status: 'finished',
    url: 'http://127.0.0.1:6077/image/get/example_cover/西南民族大学学报人文社会科学版.jpg'
  }
]);

function handlePreview(file: UploadFileInfo) {
  const { url } = file;
  previewImageUrl.value = url as string;
  showModal.value = true;
}

onMounted(async () => {
  const data = await configStore.getImageList(props.filePath);
  console.log('dara', data);

  previewFileList.value = data;
});

onMounted(() => {
  // watch(
  //   () => props.code,
  //   _code => {
  //     code.value = _code;
  //   }
  // );
});
</script>

<template>
  <div class="editor space-y-3">
    <NUpload
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :default-file-list="previewFileList"
      :show-remove-button="false"
      list-type="image-card"
      @preview="handlePreview"
    />
    <NModal v-model:show="showModal" preset="card" style="width: 600px" title="一张很酷的图片">
      <img :src="previewImageUrl" style="width: 100%" />
    </NModal>
  </div>
</template>

<style lang="scss" scoped>
$border-color: #d4d4d4;

.editor {
  .main {
    display: flex;
    width: 100%;

    .code {
      width: 30%;
      height: 100px;
      margin: 0;
      padding: 0.4em;
      overflow: scroll;
      border-left: 1px solid $border-color;
      font-family: monospace;
    }
  }
}
</style>
