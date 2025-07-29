// src/api.js
import axios from 'axios';

const BASE = "http://localhost:8080/api/tasks";

export const getTasks = () => axios.get(BASE);

export const createTask = (task) => axios.post(BASE, task);

export const deleteTask = (id) => axios.delete(`${BASE}/${id}`);

export const updateTask = (id, task) => axios.put(`${BASE}/${id}`, task);
