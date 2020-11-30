import axios from 'axios';
const baseUrl = '/dashboard/user';

// GET all users
const getAll = () => {
  const req = axios.get('/dashboard/users');
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// CREATE user
const createUser = (userObject) => {
  const req = axios.post(`${baseUrl}/create`, userObject);
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// LOGIN
const login = (credentials) => {
  const req = axios.post(`${baseUrl}/login`, credentials);
  return req.then(res => res.data)
    .catch(err => console.error(err));
}

// READ user
const readUser = (userId) => {
  const req = axios.get(`${baseUrl}/${userId}`);
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// UPDATE user
const updateUser = (userId, userObject) => {
  const req = axios.put(`${baseUrl}/${userId}/update`, userObject);
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// DELETE user
const deleteUser = (userId, userObject) => {
  const req = axios.delete(`${baseUrl}/${userId}/delete`, userObject);
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

export default { getAll, createUser, login, readUser, updateUser, deleteUser };
