<template>
  <div class="rich-text-editor" :class="{ 'has-error': error, 'is-disabled': disabled }">
    <!-- QuillEditor component -->
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
    },
    placeholder(newValue) {
      this.editorOptions.placeholder = newValue
    },
    disabled(newValue) {
      this.editorOptions.readOnly = newValue
    }
  },
  methods: {
    onEditorReady(quill) {
      console.log('Editor is ready', quill)
    },
    
    onTextChange(delta, oldDelta, source) {
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

/* Existing Quill styles */
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

/* Error state for Quill */
.rich-text-editor.has-error :deep(.ql-editor) {
  border-color: #dc3545;
}

.rich-text-editor.has-error :deep(.ql-toolbar) {
  border-color: #dc3545;
}

/* Disabled state for Quill */
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