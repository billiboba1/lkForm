<script setup lang="ts">
  import { useLkFormsStore } from '@/stores/lkForms.ts'
  import UiSelect from '@/UiBlocks/UiSelect.vue'
  import UiInput from '@/UiBlocks/UiInput.vue'
  import { ref, computed } from 'vue'

  const store = useLkFormsStore();
  const forms = store.lkForms;

</script>

<template>
  <div class="lk-forms__page">
    <div class="header">
      <p class="title">Учетные записи</p>
      <button @click="store.addForm" class="add-lk__button">+</button>
    </div>
    <div class="info-block">
      <img src="@/assets/icons/info.svg">
      <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ";"</span>
    </div>
    <div class="lk-forms__content">
      <div v-for="form in forms" :key="form.id.valueOf()" class="lk-form">
        <UiInput class="mark" @unfocused="() => " placeholder="XXX;YYY;ZZZ" :maxlength="50" />
        <UiSelect type="Локальная" @change-type="(newType) => store.changeForm(form.id.valueOf(), { type: newType})" class="type" />
        <UiInput class="login" @unfocused="() => " placeholder="Логин" :maxlength="100" />
        <UiInput v-show="() => computed(() => form.type.valueOf() === 'Локальная')" @unfocused="() => " :validationActive="form.validationActive" class="password" placeholder="Пароль" :maxlength="100" > 
          <img v-if="form.password?.hidden" src="@/assets/icons/openPassword.png" @click="store.togglePassword" alt="Показать пароль">
          <img v-else src="@/assets/icons/hidePassword.png" @click="store.togglePassword" alt="Скрыть пароль">
        </UiInput>
        <img src="@/assets/icons/delete.svg" @click="() => store.deleteForm(form.id.valueOf())" alt="Удалить учетную запись">
      </div>
    </div>
  </div>
</template>
