<template>
  <div class="rich-text-editor">
    <QuillEditor
      v-model:content="content"
      :options="editorOptions"
      contentType="html"
      theme="snow"
      @ready="onEditorReady"
      @textChange="onTextChange"
      @selectionChange="onSelectionChange"
      @editorChange="onEditorChange"
    />
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: 'RichTextEditor',
  components: {
    QuillEditor
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '入力してください'
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      content: this.modelValue,
      editorOptions: {
        placeholder: this.placeholder,
        readOnly: this.disabled,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }]
          ]
        },
        theme: 'snow'
      }
    }
  },
  watch: {
    modelValue(newValue) {
      if (newValue !== this.content) {
        this.content = newValue
      }
    },
    content(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  },
  methods: {
    onEditorReady(quill) {
      // Editor is ready
      console.log('Editor is ready', quill)
    },
    onTextChange(delta, oldDelta, source) {
      // Text has changed
      this.$emit('change', this.content)
    },
    onSelectionChange(range, oldRange, source) {
      // Selection has changed
    },
    onEditorChange(eventName, ...args) {
      // Editor has changed
    }
  }
}
</script>

<style scoped>
.rich-text-editor {
  width: 100%;
  max-width: 100%;
  overflow: visible;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.rich-text-editor :deep(.ql-editor) {
  min-height: 120px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  transition: border-color 0.3s ease;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  flex: 1;
}

.rich-text-editor :deep(.ql-editor:focus) {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.rich-text-editor :deep(.ql-editor.ql-blank::before) {
  color: #999;
  font-style: italic;
}

.rich-text-editor :deep(.ql-container) {
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.rich-text-editor :deep(.ql-toolbar) {
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  background: #f8f9fa;
  padding: 8px 12px;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  overflow: visible;
  position: relative;
  z-index: 10;
}

.rich-text-editor :deep(.ql-toolbar button) {
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #495057;
}

.rich-text-editor :deep(.ql-toolbar button svg) {
  fill: currentColor;
}

.rich-text-editor :deep(.ql-toolbar button:hover) {
  background: #e9ecef;
  border-color: #dee2e6;
}

.rich-text-editor :deep(.ql-toolbar button.ql-active) {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.rich-text-editor :deep(.ql-toolbar .ql-align) {
  color: #495057;
  position: relative;
}

.rich-text-editor :deep(.ql-toolbar .ql-align svg) {
  fill: currentColor;
  position: relative;
  z-index: 1;
}

.rich-text-editor :deep(.ql-toolbar .ql-align.ql-active) {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.rich-text-editor :deep(.ql-toolbar .ql-align.ql-active::after) {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #3b82f6;
  border-radius: 1px;
}

.rich-text-editor :deep(.ql-toolbar .ql-stroke) {
  stroke: currentColor;
}

.rich-text-editor :deep(.ql-toolbar .ql-fill) {
  fill: currentColor;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker) {
  color: #495057;
  position: relative;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-label) {
  color: #495057;
  border: 1px solid transparent;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-label:hover) {
  color: #333;
  border-color: #ccc;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-label.ql-active) {
  color: #333;
  border-color: #ccc;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-options) {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 120px;
  max-width: 200px;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-item) {
  padding: 8px 12px;
  cursor: pointer;
  color: #495057;
  white-space: nowrap;
  min-height: 24px;
  display: flex;
  align-items: center;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-item:hover) {
  background: #f8f9fa;
  color: #333;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-item.ql-selected) {
  background: #3b82f6;
  color: white;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-options) {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-item) {
  padding: 8px 12px;
  cursor: pointer;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-item:hover) {
  background: #f8f9fa;
}

.rich-text-editor :deep(.ql-toolbar .ql-picker-item.ql-selected) {
  background: #3b82f6;
  color: white;
}

/* Error state */
.rich-text-editor.has-error :deep(.ql-editor) {
  border-color: #dc3545;
}

.rich-text-editor.has-error :deep(.ql-toolbar) {
  border-color: #dc3545;
}

/* Styling for align buttons */
.rich-text-editor :deep(.ql-toolbar .ql-align) {
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #495057;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.rich-text-editor :deep(.ql-toolbar .ql-align svg) {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.rich-text-editor :deep(.ql-toolbar .ql-align:hover) {
  background: #e9ecef;
  border-color: #dee2e6;
}

.rich-text-editor :deep(.ql-toolbar .ql-align.ql-active) {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Disabled state */
.rich-text-editor.is-disabled :deep(.ql-editor) {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.rich-text-editor.is-disabled :deep(.ql-toolbar) {
  background: #f8f9fa;
  opacity: 0.6;
}

.rich-text-editor.is-disabled :deep(.ql-toolbar button) {
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .rich-text-editor :deep(.ql-editor) {
    min-height: 100px;
    height: 100%;
    font-size: 0.9rem;
    padding: 10px 12px;
  }
  
  .rich-text-editor :deep(.ql-toolbar) {
    padding: 6px 8px;
  }
  
  .rich-text-editor :deep(.ql-toolbar button) {
    width: 24px;
    height: 24px;
  }
}
</style> 