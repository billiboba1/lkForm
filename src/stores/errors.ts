import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const errors = {
    select: {

    },
    input: {

    },
  };

  return { errors }
})
