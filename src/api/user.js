import axios from './axios'

export const getUsers = () => axios.get('/users');

export const getUser = () => axios.get('/user');

export const updateUser = (id, user) => axios.put(`/user/${id}`, user);