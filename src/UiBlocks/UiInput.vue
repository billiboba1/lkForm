<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps({
    placeholder: String,
    maxlength: Number,
    validationActive: Boolean,
    content: String,
    passwordMask: Boolean,
    passwordExists: Boolean,
  });
  const content = ref(props.content);
  const errorField = computed(() => content.value ===  '');
</script>

<template>
  <div class="input">
    <input :type="passwordMask ? 'password' : 'text'" @blur="$emit('unfocused', content)" v-model="content" :class="{ error: validationActive && errorField }" :placeholder="placeholder" :maxlength="maxlength">
    <img @click="$emit('toggleMask')" v-if="passwordMask && passwordExists" src="@/assets/icons/openPassword.png" alt="Показать пароль">
    <img @click="$emit('toggleMask')" v-else-if="!passwordMask && passwordExists" src="@/assets/icons/hidePassword.png" alt="Скрыть пароль">
  </div>
</template>