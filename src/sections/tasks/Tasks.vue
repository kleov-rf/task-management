<script setup lang="ts">
import {inject, ref} from "vue";
import CreateTaskForm from "./CreateTaskForm.vue";
import PlusIcon from "./icons/PlusIcon.vue";

const allTasksGetter = inject('allTasksGetter') as AllTasksGetter;

const isShowingCreateTaskForm = ref(false);

const showCreateTaskForm = () => {
  isShowingCreateTaskForm.value = true;
};

const hideCreateTaskForm = () => {
  isShowingCreateTaskForm.value = false;
};

const handleTaskCreated = () => {
  hideCreateTaskForm();
  allTasksGetter.get();
};
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
  </main>
</template>

<style scoped>

</style>