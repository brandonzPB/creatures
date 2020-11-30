import axios from 'axios';
const baseUrl = '/dashboard/user';

// CREATE creature
const createCreature = (userId, creatureObject) => {
  const req = axios.post(`${baseUrl}/${userId}/creature`, creatureObject);
  return req.then(res => res.data);
};

// READ creature
const readCreature = (userId, creatureId) => {
  const req = axios.get(`${baseUrl}/${userId}/creature/${creatureId}`);
  return req.then(res => res.data);
};

// UPDATE creature stats
const updateCreatureStats = (userId, creatureId, creatureObject) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}`, creatureObject);
  return req.then(res => res.data);
};

// UPDATE creature objectives
const updateCreatureObjectves = (userId, creatureId, creatureObject) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}/objectives`, creatureObject);
  return req.then(res => res.data);
};

// UPDATE creature info
const updateCreatureInfo = (userId, creatureId, creatureObject) => {
  const req = axios.put(`${baseUrl}/${userId}/creature/${creatureId}/info`, creatureObject);
  return req.then(res => res.data);
};

// DELETE creature
const deleteCreature = (userId, creatureId, creatureObject) => {
  const req = axios.delete(`${baseUrl}/${userId}/creature/${creatureId}`, creatureObject);
  return req.then(res => res.data);
};

export default {
  createCreature,
  readCreature,
  updateCreatureStats,
  updateCreatureObjectves,
  updateCreatureInfo,
  deleteCreature,
};
