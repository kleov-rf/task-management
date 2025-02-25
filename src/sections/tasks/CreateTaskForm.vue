<script setup lang="ts">
import {TaskCreator} from "../../modules/tasks/application/create/TaskCreator.ts";
import {inject, ref} from "vue";

const taskCreator = inject('taskCreator') as TaskCreator;

const title = ref('');
const description = ref('');
const dueDate = ref('');

const handleCreateTask = () => {
  taskCreator.create({
    id: Math.random().toString(36).substring(7),
    title: title.value,
    description: description.value,
    dueDate: new Date(dueDate.value).getTime()
  });
}
</script>

<template>
  <form class="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
          type="text"
          id="title"
          name="title"
          v-model="title"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
          id="description"
          name="description"
          rows="3"
          v-model="description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      ></textarea>
    </div>

    <div>
      <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
      <input
          type="date"
          id="dueDate"
          name="dueDate"
          v-model="dueDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <button type="button"
            @click="handleCreateTask"
            class="flex gap-2 items-center w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3">
      Confirm
    </button>
  </form>
</template>

<style scoped>

</style>