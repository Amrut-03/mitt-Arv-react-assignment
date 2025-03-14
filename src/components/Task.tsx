import React, { useState } from "react";
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
import { updateTask, deleteTask } from "../redux/taskSlice";

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      updateTask({
        id: task.id,
        title,
        description,
      })
    );
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      className="task"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
      }}
      onDrag={(e) => {
        e.currentTarget.classList.add("dragging");
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove("dragging");
      }}
      onMouseOver={(e) => {
        const target = e.currentTarget;
        if (target) {
          const deleteButton = target.querySelector(".delete-button") as HTMLElement;
          const editButton = target.querySelector(".edit-button") as HTMLElement;
          if (deleteButton) deleteButton.style.display = "block";
          if (editButton) editButton.style.display = "block";
        }
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget;
        if (target) {
          const deleteButton = target.querySelector(".delete-button") as HTMLElement;
          const editButton = target.querySelector(".edit-button") as HTMLElement;
          if (deleteButton) deleteButton.style.display = "none";
          if (editButton) editButton.style.display = "none";
        }
      }}
    >
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>
          {task.description.length > 50
            ? `${task.description.substring(0, 50)}...`
            : task.description}
        </p>
      </div>
      <div className="task-actions">
        <button
          className="edit-button"
          onClick={() => setOpen(true)}
          style={{ display: 'none' }}
          type="button"
        >
          Edit
        </button>
        <button
          className="delete-button"
          onClick={handleDelete}
          style={{ display: 'none' }}
        >
          Delete
        </button>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Task</DialogTitle>
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
            onClick={handleEdit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Task;
