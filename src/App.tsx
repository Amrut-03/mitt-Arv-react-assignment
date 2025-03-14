import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Board from './components/Board';
import './App.css';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './redux/taskSlice';

function App() {
  const [searchQuery, setSearchQueryState] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQueryState(query);
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="App">
      <div className="search-bar">
        <TextField
          label="Search tasks..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by task title..."
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          }}
        />
      </div>
      <Board />
    </div>
  );
}

export default App;
