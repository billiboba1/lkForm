<script setup lang="ts">
  import { ref, computed } from 'vue'
  defineProps({
    placeholder: String,
    maxlength: Number,
    validationActive: Boolean,
  });
  const content = ref('');
  const errorField = computed(() => content.value !==  '');
</script>

<template>
  <div class="input">
    <input @change="$emit('')" @blur="$emit('unfocused')" v-model="content" :placeholder="placeholder" :maxlength="maxlength">
    <slot></slot>
  </div>
</template>