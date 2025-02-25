<script setup lang="ts">
import {ref} from "vue";
import CreateTaskForm from "./CreateTaskForm.vue";
import PlusIcon from "./icons/PlusIcon.vue";

const isShowingCreateTaskForm = ref(false);

const showCreateTaskForm = () => {
  isShowingCreateTaskForm.value = true;
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
    <CreateTaskForm v-if="isShowingCreateTaskForm"/>
  </main>
</template>

<style scoped>

</style>