import { useState } from 'react';

import FilterTasks from './FilterTasks.js';
import TaskItem from './TaskItem.js';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

const TaskList = (props) => {
  const [filtered, setFiltered] = useState(props.tasks);

  const filterHandler = (selected) => {
    let filtered;

    if(selected === 'completed'){
      filtered = props.tasks.filter(prop => prop.isCompleted === true);
    } else if (selected === 'not-completed'){
      filtered = props.tasks.filter(prop => prop.isCompleted === false);
    } else {
      filtered = props.tasks;
    }
    setFiltered(filtered);
  };

  const refreshTasks = async () => {
    await props.onChangedTask();
  }

  return (
    <div>
      <FilterTasks selected={filtered} onChangeFilter={filterHandler} />

      <Typography variant='h6' component='div' sx={{ flexGrow: 1, mb: 1 }}>
        Tasks
      </Typography>

      <List>
        {filtered.map(task => 
        <TaskItem key={task._id} _id={task._id} title={task.title} isCompleted={task.isCompleted} onChangedTask={refreshTasks}/>
        )}
      </List>
    </div> 
  )
}

export default TaskList;