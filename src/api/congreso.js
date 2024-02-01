import axios from './axios'

export const getCongresosRequest = () => axios.get('/congreso');

export const getCongresoRequest = (id) => axios.get(`/congreso/${id}`);

export const createCongresoRequest = (congreso) => axios.post('/congreso', congreso);

export const deleteCongreso = (id) => axios.delete(`/congreso/${id}`);

export const updateCongreso = (id, congreso) => axios.put(`/congreso/${id}`, congreso);