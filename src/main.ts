import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {LocalStorageTaskRepository} from "./modules/tasks/infrastructure/LocalStorageTaskRepository.ts";
import {TaskCreator} from "./modules/tasks/application/create/TaskCreator.ts";

const app = createApp(App);

const taskRepository = new LocalStorageTaskRepository();
app.provide('taskCreator', new TaskCreator(taskRepository));

app.mount('#app')
