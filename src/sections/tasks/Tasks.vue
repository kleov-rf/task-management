<script setup lang="ts">

</script>

<template>
  <main class="flex flex-col gap-8">
    <button type="button"
            class="flex gap-2 items-center w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3">
      Create new task
    </button>
    <form class="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
            type="text"
            id="title"
            name="title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
            id="description"
            name="description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div>
        <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
        <input
            type="date"
            id="dueDate"
            name="dueDate"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </form>
  </main>
</template>

<style scoped>

</style>