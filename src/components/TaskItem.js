import { useState } from 'react';

import { complete, remove } from '../services/tasks.js';

import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TaskItem = (props) => {
  const [error, setError] = useState(null);
  const [checkedTask, setCheckedTask] = useState(props.isCompleted);

  const refreshHandler = async () => {
    await props.onChangedTask();
  }

  const checkHandler = async () => {
    if(checkedTask === true){
      setCheckedTask(false);
    } else {
      setCheckedTask(true);
    };

    const url = `http://localhost:5000/tasks/${props._id}`;
    const isCompleted = !checkedTask;

    try{
    const data = complete(url, isCompleted);

    setTimeout(() => {
      refreshHandler();
    }, 100);
    
    return data;

    } catch (error) {
      setError('Something went wrong');
    }
  }

  const deleteHandler = async() => {
    const url = `http://localhost:5000/tasks/${props._id}`;
    
    const task = {
      isDeleted: true,
    }

    try{
      const data = remove(url, task);

      setTimeout(() => {
        refreshHandler();
      }, 100);

      return data;
      
    } catch (error) {
      setError('Something went wrong');
    }
  }

  return (
    <div>
      <ListItem disablePadding>
        <ListItemIcon>
          <Checkbox edge='start' key={props._id} value={props.isCompleted} color='primary' checked={checkedTask} onClick={checkHandler} />
        </ListItemIcon>

        <ListItemText key={props._id} _id={props._id} primary={props.title}></ListItemText>
      
        <IconButton edge='end' aria-label='delete' onClick={deleteHandler}>
          <DeleteOutlinedIcon />
        </IconButton>

    </ListItem>
    </div>
  );
};

export default TaskItem;
