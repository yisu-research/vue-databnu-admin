<script lang="ts" setup>
import { onMounted, reactive, shallowRef, watch } from 'vue';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import { redo, undo } from '@codemirror/commands';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { useConfigStore } from '@/store/modules/config';

defineOptions({ name: 'JsonEditor' });

interface Props {
  filePath?: string;
  fileName?: string;
  code: string;
}

const props = defineProps<Props>();

const configStore = useConfigStore();

const code = shallowRef(props.code);
const extensions = [json(), oneDark];

const preview = shallowRef(false);
const togglePreview = () => {
  preview.value = !preview.value;
};

const cmView = shallowRef<EditorView>();
const handleReady = ({ view }: any) => {
  cmView.value = view;
};

const handleUndo = () => {
  undo({
    state: cmView.value!.state,
    dispatch: cmView.value!.dispatch
  });
};

const handleRedo = () => {
  redo({
    state: cmView.value!.state,
    dispatch: cmView.value!.dispatch
  });
};

const handleSave = async () => {
  await configStore.setConfig(props.filePath ?? '', props.fileName ?? '', code);
};

const state = reactive({
  lines: null as null | number,
  cursor: null as null | number,
  selected: null as null | number,
  length: null as null | number
});

const handleStateUpdate = (viewUpdate: ViewUpdate) => {
  // selected
  const ranges = viewUpdate.state.selection.ranges;
  state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0);
  state.cursor = ranges[0].anchor;
  // length
  state.length = viewUpdate.state.doc.length;
  state.lines = viewUpdate.state.doc.lines;
};

onMounted(() => {
  watch(
    () => props.code,
    _code => {
      code.value = _code;
    }
  );
});
</script>

<template>
  <div class="editor space-y-3">
    <div class="main">
      <Codemirror
        v-model="code"
        :style="{
          width: preview ? '50%' : '100%',
          height: '75vh',
          backgroundColor: '#fff',
          color: '#333'
        }"
        placeholder="请输入配置代码"
        :extensions="extensions"
        autofocus
        indent-with-tab
        :tab-size="2"
        @update="handleStateUpdate"
        @ready="handleReady"
      />
      <pre v-if="preview" class="code" :style="{ height: '75vh', width: preview ? '50%' : '0px' }">{{ code }}</pre>
    </div>
    <div class="grid grid-cols-12 items-center gap-y-4">
      <div class="col-span-5 <xl:col-span-24 space-x-4">
        <NButton @click="togglePreview">
          <span class="mr-1">预览</span>
          <SvgIcon :icon="preview ? 'iconamoon:eye-duotone' : 'iconamoon:eye-off-duotone'" class="text-icon" />
        </NButton>
        <NButton @click="handleUndo">
          <span class="mr-1">撤销</span>
          <SvgIcon icon="ci:undo" class="text-icon" />
        </NButton>
        <NButton @click="handleRedo">
          <span class="mr-1">重做</span>
          <SvgIcon icon="ci:redo" class="text-icon" />
        </NButton>
        <NButton :loading="configStore.configLoading" type="primary" @click="handleSave">
          <span class="mr-1">保存</span>
          <SvgIcon icon="ant-design:save-twotone" class="text-icon" />
        </NButton>
      </div>
      <div class="col-span-7 justify-self-end <xl:col-span-24 space-x-8 <md:space-x-4">
        <span>Spaces: {{ 2 }}</span>
        <span>Length: {{ state.length }}</span>
        <span>Lines: {{ state.lines }}</span>
        <span>Cursor: {{ state.cursor }}</span>
        <span>Selected: {{ state.selected }}</span>
      </div>
    </div>
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
