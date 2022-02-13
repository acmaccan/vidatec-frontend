import { useState } from 'react';

import TaskForm from './TaskForm.js';
import { create } from '../services/tasks.js';

const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveTaskHandler = async(enteredTask) => {
    setIsLoading(true);
    setError(null);
    try{
      const data = create(enteredTask);
      props.onAddTask(data);
      
    } catch (error) {
      setError('Something went wrong');
    }
    setIsLoading(false);
  }

  return(
    <div>
      <TaskForm onSaveTaskData={saveTaskHandler} loading={isLoading}/>
      {error && <p>{error}</p>}
    </div>
  )
}

export default NewTask;