<script setup lang="ts">
  import { useLkFormsStore } from '@/stores/lkForms.ts'
  import UiSelect from '@/UiBlocks/UiSelect.vue'
  import UiInput from '@/UiBlocks/UiInput.vue'
  import { ref, computed } from 'vue'

  const store = useLkFormsStore();
  //localStorage.setItem('lk-forms', '0' );
  store.updateData();
  console.log(store.lkForms);
  const forms = store.lkForms;
  const onUnfocus = (id: number, content: string | object, block: string) :void => {
    store.activateValidation(id);
    store.changeForm(id, { [block]: content});
  }
  const passwordsMask = ref(true);
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
      <div v-for="form in forms" :key="form.id" class="lk-form">
        <UiInput 
          class="mark"
          @unfocused="(content) => onUnfocus(form.id, content, 'mark')"
          :content="form.mark"
          :validationActive="false"
          placeholder="XXX;YYY;ZZZ"
          :maxlength="50"
        />
        <UiSelect 
          type="Локальная"
          @change-type="(newType) => store.changeForm(form.id, { type: newType})"
          class="type"
        />
        <UiInput
          class="login"
          :content="form.login"
          @unfocused="(content) => onUnfocus(form.id, content, 'login')"
          :validationActive="form.validationActive"
          placeholder="Логин"
          :maxlength="100"
        />
        <UiInput 
          v-show="form.type === 'Локальная'"
          :content="form.password"
          @unfocused="(content) => onUnfocus(form.id, content, 'password' )"
          :validationActive="form.validationActive"
          :passwordMask='true'
          class="password"
          placeholder="Пароль"
          :maxlength="100"
        />
        <img src="@/assets/icons/delete.svg" @click="() => store.deleteForm(form.id)" alt="Удалить учетную запись">
      </div>
    </div>
  </div>
</template>
