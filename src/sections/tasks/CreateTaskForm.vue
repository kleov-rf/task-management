<script setup lang="ts">
import { TaskCreator } from '@/modules/tasks/application/create/TaskCreator.ts'
import { inject, onMounted, ref } from 'vue'
import { HTMLInputElement } from 'happy-dom'

const taskCreator = inject('taskCreator') as TaskCreator

const emit = defineEmits<{
  (e: 'cancel-create-task'): void
  (e: 'task-created'): void
}>()

const titleInput = ref<HTMLInputElement | null>(null)
const description = ref('')
const dueDate = ref('')

const handleCreateTask = async () => {
  try {
    await taskCreator.create({
      id: Math.random().toString(36).substring(7),
      title: titleInput.value?.value ?? '',
      description: description.value,
      dueDate: new Date(dueDate.value).getTime()
    })

    emit('task-created')
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  titleInput.value?.focus()
})
</script>

<template>
  <dialog
    @keydown.esc="emit('cancel-create-task')"
    aria-modal="true"
    aria-labelledby="create-task-title"
    class="absolute flex justify-center items-center inset-0 w-full h-full backdrop-blur-[2px] bg-black/25 z-10"
  >
    <form
      @submit.prevent="handleCreateTask"
      class="w-96 flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 id="create-task-title" class="text-3xl mb-2 font-bold">
        Create new task
      </h2>

      <section>
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900"
          >Title</label
        >
        <input
          type="text"
          id="title"
          ref="titleInput"
          required
          name="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Creating user stories..."
        />
      </section>

      <section>
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Description</label
        >
        <textarea
          id="description"
          name="description"
          v-model="description"
          rows="4"
          required
          class="min-h-24 max-h-80 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-y"
          placeholder="Write more details here..."
        ></textarea>
      </section>

      <section>
        <label
          for="dueDate"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Due Date</label
        >
        <input
          type="date"
          required
          id="dueDate"
          name="dueDate"
          v-model="dueDate"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </section>

      <footer class="flex justify-end">
        <button
          type="button"
          @click="emit('cancel-create-task')"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Confirm
        </button>
      </footer>
    </form>
  </dialog>
</template>

<style scoped></style>
