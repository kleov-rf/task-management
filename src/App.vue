<script setup lang="ts">
import Tasks from './sections/tasks/Tasks.vue'
import CalendarEditIcon from './sections/tasks/icons/CalendarEditIcon.vue'
</script>

<template>
  <section class="min-w-full h-svh bg-sky-50">
    <section class="container mx-auto flex flex-col gap-8 px-8 pt-16 h-full">
      <header class="flex gap-4 items-center">
        <CalendarEditIcon width="48" height="48" />
        <h1 class="text-5xl font-extrabold">Task Manager</h1>
      </header>
      <Tasks />
    </section>
  </section>
</template>

<style scoped></style>
