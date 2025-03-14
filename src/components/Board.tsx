import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import { RootState } from "../redux/store";
import { addColumn } from "../redux/taskSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const Board: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const columns = useSelector((state: RootState) => state.tasks.columns);
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState("");

  const handleAddColumn = () => {
    if (columnName.trim()) {
      dispatch(addColumn({ name: columnName }));
      setOpen(false);
      setColumnName("");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="board">
      {columns.map((column, index) => (
        <React.Fragment key={column.id}>
          <Column
            columnId={column.id}
            columnName={column.name}
            tasks={filteredTasks.filter((task) => task.status === column.id)}
          />
          {index === columns.length - 1 && (
            <div className="add-column-container">
              <button
                className="add-column-button"
                onClick={() => setOpen(true)}
                type="button"
              >
                + Add Column
              </button>
            </div>
          )}
        </React.Fragment>
      ))}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Column</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Column Name"
            fullWidth
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
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
            onClick={handleAddColumn}
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

export default Board;
