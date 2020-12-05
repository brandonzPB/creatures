import axios from 'axios';
const baseUrl = '/dashboard/user';

// CREATE user
const createUser = (userObject) => {
  const req = axios.post(`${baseUrl}/create`, userObject);
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// LOGIN
const login = (credentials) => {
  const req = axios.post(`${baseUrl}/login`, credentials);

  return req.then(res => {
    console.log('res', res.data);

    return res.data;
  })
    .catch(err => console.error(err));
}

// GET all users
const getAll = (token) => {
  const req = axios.get('/dashboard/users', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// READ user
const readUser = (userId, token) => {
  const req = axios.get(`${baseUrl}/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => {
    console.log(res.data);

    return res.data;
  })
    .catch(err => console.error(err));
};

// POST localStorage creatures
const storeLocalCreatures = (userId, creatures, token) => {
  const req = axios.post(`${baseUrl}/${userId}`, creatures, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
}

// UPDATE user
const updateUser = (userId, userObject, token) => {
  const req = axios.put(`${baseUrl}/${userId}/update`, userObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// DELETE user
const deleteUser = (userId, userObject, token) => {
  const req = axios.delete(`${baseUrl}/${userId}/delete`, userObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
};

export default { 
  getAll,
  createUser,
  login,
  readUser,
  storeLocalCreatures,
  updateUser,
  deleteUser 
};
