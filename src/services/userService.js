import axios from 'axios';
const baseUrl = '/dashboard/user';

// CREATE user
const createUser = (userObject) => {
  const req = axios.post(`${baseUrl}/create`, userObject);
  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// LOGIN
const login = (type, credentials) => {
  let reqUser = { password: credentials.password, type };

  type === 'username'
    ? reqUser.username = credentials.username
    : reqUser.email = credentials.email;

  const req = axios.post(`${baseUrl}/login`, reqUser);

  return req.then(res => {
    console.log('res', res.data);

    return res.data;
  })
    .catch(err => console.error(err));
}

// POST reset request
const postResetRequest = (email) => {
  const reqUser = { email };

  const req = axios.post(`${baseUrl}/reset`, reqUser);

  return req.then(res => {
    console.log('res', res.data);

    return res.data;
  })
    .catch(err => console.error(err));
}

// GET reset code (POST email)
const getResetCode = (email) => {
  const reqUser = { email };

  const req = axios.post(`${baseUrl}/reset_code_email`, reqUser);

  return req.then(res => res.data)
    .catch(err => console.error(err));
}

// POST reset code
const postResetCode = (code, token) => {
  const reqUser = { reset_code: code };

  const req = axios.post(`${baseUrl}/reset_code`, reqUser, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
}

// PUT password resest
const putPasswordReset = (userObject, token) => {
  const req = axios.put(`${baseUrl}/reset_password`, userObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => {
    console.log('res.data', res.data);
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

// GET USERNAMES
const checkUsername = (type, input, userObject, token) => {
  // returns if request is available
  let thisUser;

  type === 'username'
    ? thisUser = {
      ...userObject,
      username: input,
      type: 'username',
    }
    : thisUser = {
      ...userObject,
      email: input,
      type: 'email',
    };

  const req = axios.post(`${baseUrl}/usernames`, thisUser, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => {
    console.log('res', res.data);
    return res.data;
  })
    .catch(err => console.error(err));
}

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
const updateUser = (type = 'none', userId, userObject, token) => {
  const thisUser = {
    ...userObject,
    type
  };

  const req = axios.put(`${baseUrl}/${userId}/update`, thisUser, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
};

// DELETE user
const deleteUser = (userId, userObject, token) => {
  const req = axios.delete(`${baseUrl}/${userId}`, {
    params: userObject,
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
  postResetRequest,
  getResetCode,
  postResetCode,
  putPasswordReset,
  readUser,
  checkUsername,
  storeLocalCreatures,
  updateUser,
  deleteUser 
};
