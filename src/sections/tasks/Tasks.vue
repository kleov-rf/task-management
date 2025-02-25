<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import CreateTaskForm from "./CreateTaskForm.vue";
import PlusIcon from "./icons/PlusIcon.vue";
import type {AllTasksGetter} from "../../modules/tasks/application/get-all/AllTasksGetter.ts";
import type {Task} from "../../modules/tasks/domain/Task.ts";
import TasksList from "./TasksList.vue";

const allTasksGetter = inject('allTasksGetter') as AllTasksGetter;

const isShowingCreateTaskForm = ref(false);
const tasks = ref<Task[]>([]);

const showCreateTaskForm = () => {
  isShowingCreateTaskForm.value = true;
};

const hideCreateTaskForm = () => {
  isShowingCreateTaskForm.value = false;
};

const handleTaskCreated = async () => {
  hideCreateTaskForm();
  tasks.value = await allTasksGetter.get();
};

onMounted(async () => {
  tasks.value = await allTasksGetter.get();
});
</script>

<template>
  <main class="flex flex-col gap-8">
    <button type="button"
            @click="showCreateTaskForm"
            class="flex gap-2 items-center w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3">
      <PlusIcon width="24" height="24"/>
      Create new task
    </button>
    <CreateTaskForm v-if="isShowingCreateTaskForm" @cancel-create-task="hideCreateTaskForm"
                    @task-created="handleTaskCreated"/>
    <TasksList :tasks="tasks"/>
  </main>
</template>

<style scoped>

</style>