import React, { useState } from "react";
import Task from "./Task";
import { TaskType } from "../redux/taskSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, updateTaskStatus } from "../redux/taskSlice";

interface ColumnProps {
  columnId: string;
  columnName: string;
  tasks: TaskType[];
}

const Column: React.FC<ColumnProps> = ({ columnId, columnName, tasks }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(addTask({
        title,
        description,
        status: columnId,
      }));
      setOpen(false);
      setTitle("");
      setDescription("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      dispatch(updateTaskStatus({ id: taskId, status: columnId }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="column"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>{columnName}</h2>
      <button
        className="add-task-button"
        onClick={() => setOpen(true)}
        type="button"
      >
        Add Task
      </button>
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <Task key={task.id} task={task} index={index} />
        ))}
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
              },
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Column;
