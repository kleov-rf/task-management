<script setup lang="ts">
defineProps<{
  width: string
  height: string
  className?: string
}>()
</script>

<template>
  <svg :class="className" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
       :width="width" :height="height" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M5 12h14m-7 7V5"/>
  </svg>
</template>

<style scoped>

</style>