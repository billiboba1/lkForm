import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLkFormsStore = defineStore('counter', () => {
  //interfaces
  interface IPassword {
    text: String,
    hidden: Boolean,
  }
  interface ILkForm {
    id: Number,
    validationActive: Boolean,
    mark: String,
    type: String,
    login: String,
    password: IPassword | null,
  }

  //data
  let currentId = 0;
  const lkForms: ILkForm[] = reactive([]);

  //actions
  function addForm() :void {
    lkForms.push({id: currentId, validationActive: false, mark: '', type: 'Локальное', login: '', password: {text: '', hidden: true}});
    currentId += 1;
  };
  function deleteForm(id: number) :void {
    lkForms.filter((form) => form.id !== id);
  };
  function togglePassword(id: number) :void {
    const password = lkForms[id].password;
    password ? password.hidden = !password.hidden : '';
  };
  function changeForm(id: number, data: object) {
    lkForms[id] = { ...lkForms[id], ...data }
  };
  function activateValidation(id: number) {
    
  }

  //getters
  //const doubleCount = computed(() => count.value * 2);

  return { lkForms, addForm, deleteForm, togglePassword, changeForm }
})
