<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'cancel-deletion'): void
}>()

const confirmDeleteTaskDialog = ref<HTMLDialogElement | null>(null)

const handleCancelDeletion = () => {
  confirmDeleteTaskDialog.value?.close()
  emit('cancel-deletion')
}

onMounted(() => {
  confirmDeleteTaskDialog.value?.showModal()
})
</script>

<template>
  <dialog
    ref="confirmDeleteTaskDialog"
    @keydown.esc="emit('cancel-deletion')"
    aria-modal="true"
    aria-labelledby="confirm-delete-task-title"
    class="flex justify-center items-center w-full h-full bg-transparent backdrop:bg-black/25 backdrop-blur-[2px]"
  >
    <section class="w-96 flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      <h2 id="confirm-delete-task-title" class="text-3xl mb-2 font-bold">
        Delete task?
      </h2>

      <p class="text-gray-700">
        Are you sure you want to delete this task?
        <br />
        This action cannot be undone.
      </p>

      <footer class="flex justify-end">
        <button
          type="button"
          @click="handleCancelDeletion"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Cancel
        </button>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Confirm
        </button>
      </footer>
    </section>
  </dialog>
</template>

<style scoped></style>
