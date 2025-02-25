<script setup lang="ts">
import type {Task} from "../../modules/tasks/domain/Task.ts";

defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">
          Id
        </th>
        <th scope="col" class="px-6 py-3">
          Title
        </th>
        <th scope="col" class="px-6 py-3">
          Description
        </th>
        <th scope="col" class="px-6 py-3">
          Due date
        </th>
        <th scope="col" class="px-6 py-3">
          Status
        </th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in tasks" class="task bg-white border-b border-gray-200 hover:bg-gray-50">
        <td class="px-6 py-4">
          {{ task.id }}
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{ task.title }}
        </th>
        <td class="px-6 py-4">
          {{ task.description }}
        </td>
        <td class="px-6 py-4">
          {{ task.dueDate.toLocaleDateString() }}
        </td>
        <td class="px-6 py-4">
          {{ task.status }}
        </td>
        <td class="px-6 py-4 text-right">
          <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>