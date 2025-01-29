<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps({
    placeholder: String,
    maxlength: Number,
    validationActive: Boolean,
    content: String,
    passwordMask: Boolean,
  });
  const content = ref(props.content);
  const passwordHidden = ref(props.passwordMask ? 'yes' : false);
  const errorField = computed(() => content.value ===  '');
  function togglePassword() {
    passwordHidden.value = passwordHidden.value === 'yes' ? 'no' : 'yes' ;
  }
</script>

<template>
  <div class="input">
    <input :type="passwordHidden === 'yes' ? 'password' : 'text'" @blur="$emit('unfocused', content)" v-model="content" :class="{ error: validationActive && errorField }" :placeholder="placeholder" :maxlength="maxlength">
    <img @click="togglePassword" v-if="passwordHidden === 'yes'" src="@/assets/icons/openPassword.png" alt="Показать пароль" height="20" width="20" >
    <img @click="togglePassword" v-else-if="passwordHidden === 'no'" src="@/assets/icons/hidePassword.png" alt="Скрыть пароль" height="20" width="20" >
  </div>
</template>