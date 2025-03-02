<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import CreateTaskForm from './CreateTaskForm.vue'
import PlusIcon from './icons/PlusIcon.vue'
import type { AllTasksGetter } from '@/modules/tasks/application/get-all/AllTasksGetter.ts'
import type { Task } from '@/modules/tasks/domain/Task.ts'
import TaskTable from './TaskTable.vue'
import ConfirmDeleteTaskModal from '@/sections/tasks/ConfirmDeleteTaskModal.vue'

const allTasksGetter = inject('allTasksGetter') as AllTasksGetter

const createNewTaskButton = ref<HTMLButtonElement | null>(null)
const isShowingConfirmDeleteTaskModal = ref(false)
const isShowingCreateTaskForm = ref(false)
const tasks = ref<Task[]>([])

const showConfirmDeleteTaskModal = () => {
  isShowingConfirmDeleteTaskModal.value = true
}

const hideConfirmDeleteTaskModal = () => {
  isShowingConfirmDeleteTaskModal.value = false
}

const showCreateTaskForm = () => {
  isShowingCreateTaskForm.value = true
}

const hideCreateTaskForm = () => {
  createNewTaskButton.value?.focus()
  isShowingCreateTaskForm.value = false
}

const handleTaskCreated = async () => {
  hideCreateTaskForm()
  tasks.value = await allTasksGetter.get()
}

const handleTaskDeleted = async () => {
  tasks.value = await allTasksGetter.get()
}

onMounted(async () => {
  tasks.value = await allTasksGetter.get()
})
</script>

<template>
  <main
    :inert="isShowingCreateTaskForm"
    class="flex flex-col items-end gap-8 h-full bg-white p-8 rounded-2xl"
  >
    <header class="flex items-center justify-between w-full">
      <span class="flex items-center gap-4 text-xl font-medium">
        All Tasks
        <span class="text-sm bg-sky-50 rounded-full p-2">
          {{ tasks.length }}
        </span>
      </span>
      <button
        ref="createNewTaskButton"
        type="button"
        @click="showCreateTaskForm"
        class="flex gap-2 items-center w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition ease-in-out"
      >
        <PlusIcon width="24" height="24" />
        Create new task
      </button>
    </header>
    <TaskTable
      :tasks="tasks"
      @task-deleted="handleTaskDeleted"
      @delete-task="showConfirmDeleteTaskModal"
    />
  </main>
  <CreateTaskForm
    v-if="isShowingCreateTaskForm"
    @cancel-create-task="hideCreateTaskForm"
    @task-created="handleTaskCreated"
  />
  <ConfirmDeleteTaskModal
    v-if="isShowingConfirmDeleteTaskModal"
    @cancel-deletion="hideConfirmDeleteTaskModal"
  />
</template>

<style scoped></style>
