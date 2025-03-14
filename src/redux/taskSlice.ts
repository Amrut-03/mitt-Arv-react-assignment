import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Import UUID

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface ColumnType {
  id: string;
  name: string;
}

interface TaskState {
  tasks: TaskType[];
  columns: ColumnType[];
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  columns: [
    { id: "todo", name: "To Do" },
    { id: "inprogress", name: "In Progress" },
    { id: "peerreview", name: "Peer Review" },
    { id: "done", name: "Done" },
  ],
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<TaskType, "id">>) => {
      const newTask: TaskType = { id: uuidv4(), ...action.payload };
      state.tasks.push(newTask);
    },
    addColumn: (state, action: PayloadAction<{ name: string }>) => {
      const newColumn: ColumnType = { id: uuidv4(), name: action.payload.name };
      state.columns.push(newColumn);
    },
    updateTask: (state, action: PayloadAction<{ id: string; title: string; description: string }>) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, addColumn, updateTask, updateTaskStatus, deleteTask, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
