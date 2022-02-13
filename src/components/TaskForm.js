import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TaskForm = (props) => {
  const [enteredTask, setEnteredTask] = useState('');

  const newTaskInput = (event) => {
    setEnteredTask(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    props.onSaveTaskData(enteredTask);
    setEnteredTask('');
  }

  return (
    <div>
      <Box component="form" sx={{ mx: 'auto', maxWidth: '100%', mb: 4}} autoComplete="off" onSubmit={submitHandler}>
        <TextField label="Insert New Task" variant='standard' margin="normal" fullWidth value={enteredTask} onChange={newTaskInput} />
        <Button type='submit' variant="outlined" sx={{ justifyContent: 'flex-center' }} fullWidth >Create</Button>
      </Box>
    </div>
  )
}

export default TaskForm;