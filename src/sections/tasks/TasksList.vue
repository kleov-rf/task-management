<script setup lang="ts">
import type {Task} from "../../modules/tasks/domain/Task.ts";
import TrashBinIcon from "./icons/TrashBinIcon.vue";
import {inject} from "vue";
import type {TaskDeleter} from "../../modules/tasks/application/delete/TaskDeleter.ts";

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'task-deleted'): void;
}>()

const taskDeleter = inject('taskDeleter') as TaskDeleter;

const handleDeleteTask = async (id: string) => {
    await taskDeleter.delete(id);
    emit('task-deleted');
}
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
        <td class="flex justify-end px-6 py-4">
          <button type="button"
                  @click="handleDeleteTask(task.id)"
                  class="flex gap-2 items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
            <TrashBinIcon width="16" height="16"/>
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>