<script lang="ts" setup>
import { onMounted, reactive, shallowRef, watch } from 'vue';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import { redo, undo } from '@codemirror/commands';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

defineOptions({ name: 'JsonEditor' });

interface Props {
  code: string;
}

const props = defineProps<Props>();

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

const handleSave = () => {
  console.log('save');
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
  <div class="editor">
    <div class="main">
      <Codemirror
        v-model="code"
        :style="{
          width: preview ? '50%' : '100%',
          height: '75vh',
          backgroundColor: '#fff',
          color: '#333'
        }"
        placeholder="Please enter the code."
        :extensions="extensions"
        autofocus
        indent-with-tab
        :tab-size="2"
        @update="handleStateUpdate"
        @ready="handleReady"
      />
      <pre v-if="preview" class="code" :style="{ height: '75vh', width: preview ? '50%' : '0px' }">{{ code }}</pre>
    </div>
    <div class="divider"></div>
    <div class="footer">
      <div class="space-x-4">
        <NButton @click="togglePreview">
          <span>Preview</span>
          <i class="iconfont" :class="preview ? 'icon-eye' : 'icon-eye-close'"></i>
        </NButton>
        <NButton @click="handleUndo">Undo</NButton>
        <NButton @click="handleRedo">Redo</NButton>
        <NButton @click="handleSave">Save</NButton>
      </div>
      <div class="space-x-8">
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
// theme
$text-color: #24292f;
$text-secondary: rgba($text-color, 0.72);
$border-color: #d4d4d4;

.editor {
  .divider {
    height: 1px;
    background-color: $border-color;
  }

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

  .footer {
    height: 3rem;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 90%;
  }
}
</style>
