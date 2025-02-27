import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { LocalStorageTaskRepository } from './modules/tasks/infrastructure/LocalStorageTaskRepository.ts'
import { TaskCreator } from './modules/tasks/application/create/TaskCreator.ts'
import { AllTasksGetter } from './modules/tasks/application/get-all/AllTasksGetter.ts'
import { TaskDeleter } from './modules/tasks/application/delete/TaskDeleter.ts'

const app = createApp(App)

const taskRepository = new LocalStorageTaskRepository()
app.provide('taskCreator', new TaskCreator(taskRepository))
app.provide('allTasksGetter', new AllTasksGetter(taskRepository))
app.provide('taskDeleter', new TaskDeleter(taskRepository))

app.mount('#app')
