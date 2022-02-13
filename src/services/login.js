const loginService = async (currentTarget) => {
  const userInput = {
    email: currentTarget.get('email'),
    password: currentTarget.get('password'),
  };

  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    body: JSON.stringify(userInput),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const token = await response.json();
  return token;
};

export default loginService;
