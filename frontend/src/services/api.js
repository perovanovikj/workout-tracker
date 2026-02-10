import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (user) => api.post('/users', user),
  update: (id, user) => api.put(`/users/${id}`, user),
  delete: (id) => api.delete(`/users/${id}`),
};

// Muscle Group API
export const muscleGroupAPI = {
  getAll: () => api.get('/muscle-groups'),
  getById: (id) => api.get(`/muscle-groups/${id}`),
  create: (muscleGroup) => api.post('/muscle-groups', muscleGroup),
  update: (id, muscleGroup) => api.put(`/muscle-groups/${id}`, muscleGroup),
  delete: (id) => api.delete(`/muscle-groups/${id}`),
};

// Exercise API
export const exerciseAPI = {
  getAll: () => api.get('/exercises'),
  getById: (id) => api.get(`/exercises/${id}`),
  getByMuscleGroup: (muscleGroupId) => api.get(`/exercises/muscle-group/${muscleGroupId}`),
  create: (exercise) => api.post('/exercises', exercise),
  update: (id, exercise) => api.put(`/exercises/${id}`, exercise),
  delete: (id) => api.delete(`/exercises/${id}`),
};

// Workout API
export const workoutAPI = {
  getAll: () => api.get('/workouts'),
  getById: (id) => api.get(`/workouts/${id}`),
  getByUser: (userId) => api.get(`/workouts/user/${userId}`),
  create: (workout) => api.post('/workouts', workout),
  update: (id, workout) => api.put(`/workouts/${id}`, workout),
  delete: (id) => api.delete(`/workouts/${id}`),
};

export default api;
