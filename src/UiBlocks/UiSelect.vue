<script setup lang="ts">
  defineProps({
    type: String,
  });
</script>

<template>
  <div class="select">
    <select @change="(e) => $emit('changeType', e.target.value)" >
      <option>Локальная</option>
      <option>LDAP</option>
    </select>
  </div>
</template>