export const getAll = async () => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser'));

  const response = await fetch('http://localhost:5000/tasks', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const tasks = await response.json();

  const fetchedTasks = tasks.map((taskData) => taskData);
  return fetchedTasks;
};

export const create = async(task) => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser'));

  const response = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    body: JSON.stringify({
        title: task,
        isCompleted: false,
        isDeleted: false,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
};

export const complete = async(url, isCompleted) => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser'));

  const response = await fetch (url, {
    method: 'PUT',
    body: JSON.stringify({isCompleted}),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;  
}

export const remove = async(url, task) => {
  const token = JSON.parse(window.localStorage.getItem('loggedUser'));

  const response = await fetch (url, {
    method: 'DELETE',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
};
