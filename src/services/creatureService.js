import axios from 'axios';
const baseUrl = '/dashboard/user';

// GET all creatures
const getAll = (userId, token) => {
  const req = axios.get(`${baseUrl}/${userId}/creatures`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data)
    .catch(err => console.error(err));
}

// CREATE creature
const createCreature = (userId, creatureObject, token) => {
  const req = axios.post(`${baseUrl}/${userId}/creature/create`, creatureObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return req.then(res => res.data);
};

// READ creature
const readCreature = (userId, creatureId, token) => {
  const req = axios.get(`${baseUrl}/${userId}/creature/${creatureId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return req.then(res => res.data);
};

// UPDATE creature stats
const updateCreatureStats = (userId, creatureId, creatureObject, token) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}`, creatureObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return req.then(res => res.data);
};

// UPDATE objective
const updateObjectives = (userId, creatureId, objectives, token) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}/objectives`, objectives, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return req.then(res => res.data);
};

// DELETE objective
const deleteObjective = (userId, creatureId, objectives, token) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}/objective`, objectives, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return req.then(res => res.data);
}

// UPDATE creature info
const updateCreatureInfo = (userId, creatureId, creatureObject, token) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}/info`, creatureObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return req.then(res => res.data);
};

// DELETE creature
const deleteCreature = (userId, creatureId, token) => {
  const req = axios.delete(`${baseUrl}/${userId}/creature/${creatureId}/delete`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return req.then(res => res.data);
};

export default {
  getAll,
  createCreature,
  readCreature,
  updateCreatureStats,
  updateObjectives,
  deleteObjective,
  updateCreatureInfo,
  deleteCreature,
};
