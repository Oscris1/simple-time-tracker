import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export type Task = {
  id: string
  name: string
  creationTime: number
  counterTime: { start: number; stop?: number }[]
}

type TasksSlice = {
  currentTask: Task | null
  tasksList: Task[]
}

const initialState = {
  currentTask: null,
  tasksList: [],
} as TasksSlice

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add new task
    addTask(state, { payload }: PayloadAction<{ name: string }>) {
      const id = uuidv4()
      const newTask = {
        id,
        name: payload.name,
        creationTime: new Date().getTime(),
        counterTime: [{ start: new Date().getTime(), stop: undefined }],
        isNew: true,
      } as Task
      state.currentTask = newTask
    },
    // Stop task
    stopTask(state) {
      if (!state.currentTask) return
      const {
        currentTask: { counterTime },
      } = state

      const timeArray = counterTime.map((item, index) => {
        if (index === counterTime.length - 1) {
          return { ...item, stop: new Date().getTime() }
        }
        return item
      })

      const editedTask = { ...state.currentTask, counterTime: timeArray, isNew: false } as Task

      //   if (state.currentTask?.isNew) {
      //     state.tasksList.push(editedTask)
      //   } else {
      //     state.tasksList.map((item) => {
      //       if (item.id === id) {
      //         return editedTask
      //       }
      //       return item
      //     })
      //   }

      state.tasksList.unshift(editedTask)

      state.currentTask = null
    },
    // ContinueTask
    continueTask(state, { payload }: PayloadAction<{ id: string }>) {
      //   const id = uuidv4()
      //   const newTask = {
      //     id,
      //     name: payload.name,
      //     creationTime: new Date().getTime(),
      //     counterTime: [{ start: new Date().getTime(), stop: undefined }],
      //     isNew: true,
      //   } as Task

      // const taskToEdit = tasksList.find((item) => item.id === payload.id)
      // taskToEdit?.counterTime.push({ start: new Date().getTime(), stop: undefined })

      //   const index = tasksList.findIndex((item) => item.id === payload.id)
      //   console.log('pressed', index)
      //   const copiedTasks = [...tasksList]
      //   copiedTasks[index].counterTime.push({
      //     start: new Date().getTime(),
      //     stop: undefined,
      //   })
      //   currentTask = copiedTasks[index]

      //   const taskToEdit = state.tasksList.find((item) => item.id === payload.id)
      //   if (!taskToEdit) return
      //   state.currentTask = taskToEdit

      console.log('pressed')
      //   state.tasksList.filter((item) => {
      //     if (item.id === payload.id) {
      //       state.currentTask = item
      //     } else {
      //       return item
      //     }
      //   })
      const list = state.tasksList.filter((item) => {
        if (item.id === payload.id) {
          const editedTask = item
          editedTask.counterTime.push({
            start: new Date().getTime(),
            stop: undefined,
          })

          state.currentTask = editedTask
          return false
        } else {
          return true
        }
      })

      state.tasksList = list

      //   if (taskToEdit) currentTask = taskToEdit
    },
  },
})

// export const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState: tasksAdapter.getInitialState(additionalState),
//   reducers: {
//     addTask(state, { payload }: PayloadAction<Task>) {
//       tasksAdapter.addOne(state, payload)
//       state.current = payload.id
//     },
//     stopTask(state, { payload }: PayloadAction<{ id: string; end: number }>) {
//       const newPayload = { id: payload.id, changes: { prevTime: new Date().getTime() } }
//       tasksAdapter.updateOne(state, newPayload)
//       state.current = undefined
//     },
//     addItem: tasksAdapter.addOne,
//     removeItem: tasksAdapter.removeOne,
//     updateItem: tasksAdapter.updateOne,
//     removeAll: tasksAdapter.removeAll,
//   },
// })

export const { addTask, stopTask, continueTask } = tasksSlice.actions
// export const { addItem, removeItem, updateItem, removeAll, addTask } = tasksSlice.actions
export default tasksSlice.reducer
