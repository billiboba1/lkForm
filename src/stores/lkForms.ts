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
  const lkForms = reactive({});

  //actions
  function updateData() {
    console.log(localStorage.getItem('lk-forms'));
    const localStorageData = JSON.parse(localStorage.getItem('lk-forms'));
    console.log(localStorageData);
    Object.keys(localStorageData).forEach((id) => {
      localStorageData[id]
      const newMark = localStorageData[id].mark.map((objectText) => Object.values(objectText))
        .join(';');
      lkForms[id] = { ...localStorageData[id], mark: newMark }
    });
  };
  function addForm() :void {
    if (!Object.keys(lkForms).includes(String(currentId))) {
      lkForms[currentId] = {id: currentId, validationActive: false, mark: '', type: 'Локальная', login: '', password: ''};
      console.log(currentId);
      currentId += 1;
    } else {
      currentId += 1;
      this.addForm();
    }
  };
  function deleteForm(id: number, forms: ILkForm[] = [] ) :void {
    delete lkForms[id];
    //for localStorage
    const lsData = JSON.parse(localStorage.getItem('lk-forms'));
    delete lsData[id];
    console.log(lsData);
    localStorage.setItem('lk-forms', JSON.stringify(lsData));
  };
  function changeForm(id: number, data: object) {
    lkForms[id] = { ...lkForms[id], ...data };
    formIsDone(id);
  };
  function activateValidation(id: number) {
    lkForms[id].validationActive = true;
  };
  function formIsDone(id: number) {
    if (lkForms[id].password && lkForms[id].login || lkForms[id].login && lkForms[id].type === 'LDAP') {
      const oldItems = JSON.parse(localStorage.getItem('lk-forms'));
      const newMark = lkForms[id].mark.split(';')
        .map((part: string) => {
          console.log(part);
          return {text: part}
        });//mark: [{text: 'dshbfksdf}, {text: 'hjjdsf}]
      console.log(newMark);
      const newItems = { [id]:{ ...lkForms[id], mark: newMark}};
      //lkForms[id]
      localStorage.setItem('lk-forms', JSON.stringify({ ...oldItems, ...newItems }) );
      console.log(JSON.stringify({ ...oldItems, ...lkForms[id] }));
    }
  };

  //getters
  //const doubleCount = computed(() => count.value * 2);

  return { lkForms, addForm, deleteForm, changeForm, activateValidation, updateData}
})
