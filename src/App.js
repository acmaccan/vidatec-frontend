import { useState, useEffect } from 'react';

import NewTask from './components/NewTask.js';
import TaskList from './components/TasksList.js';

import loginService from './services/login.js';
import { getAll } from './services/tasks.js';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loggedUserStorage = window.localStorage.getItem('loggedUser');
    if(loggedUserStorage) {
      const token = JSON.parse(loggedUserStorage)
      setUser(token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const token = await loginService(new FormData(event.currentTarget));
      window.localStorage.setItem('loggedUser', JSON.stringify(token))

      setUser(token);
      fetchTasks();

    } catch (error) {
      setError('Wrong credentials');
    }
  };

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => {
      fetchTasks();
      return [task, ...prevTasks];
    });
  }

  const fetchTasks = async() => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await getAll();

      setTasks(fetchedTasks);
      setIsLoading(false);

    } catch (error) {
      setError('Something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      { user ?
      <Container maxWidth='sm' sx={{ bgcolor: 'white', marginTop: 8 }}>
        <NewTask onAddTask={addTaskHandler} />

        {!isLoading && <TaskList tasks={tasks} onChangedTask={addTaskHandler} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>Something went wrong</p>}
      </Container>
      :
      <Container component='main' maxWidth='xs'>
      <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>Sign in</Typography>
          <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' required fullWidth id='email' label='Email: test@test.com' name='email' autoComplete='email' autoFocus />
            <TextField margin='normal' required fullWidth name='password' label='Password: pass123' type='password' id='password' autoComplete='current-password' />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Sign In</Button>
          </Box>
        </Box>
      </Container>
      }
    </div>
  );
};

export default App;
