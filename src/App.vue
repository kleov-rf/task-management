<script setup lang="ts">
import TaskDashboard from './sections/tasks/TaskDashboard.vue'
import CalendarEditIcon from './sections/tasks/icons/CalendarEditIcon.vue'
</script>

<template>
  <section class="min-w-full h-svh bg-sky-50">
    <section class="container mx-auto flex flex-col gap-8 px-8 pt-16 h-full">
      <header class="flex gap-4 items-center">
        <CalendarEditIcon width="48" height="48" />
        <h1 class="text-5xl font-extrabold">Task Manager</h1>
      </header>
      <TaskDashboard />
    </section>
  </section>
</template>

<style scoped></style>
