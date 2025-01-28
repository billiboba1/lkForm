<script setup lang="ts">
  import { ref } from 'vue'
  defineProps({
    type: String,
  });
</script>

<template>
  <div class="select">
    <select @change="(e) => $emit('changeType', e.target.value)" >
      <option>Локальный</option>
      <option>LDAP</option>
    </select>
  </div>
</template>