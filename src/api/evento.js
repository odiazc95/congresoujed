import axios from './axios'

export const getEventosRequest = () => axios.get('/evento');

export const getEventoRequest = (id) => axios.get(`/evento/${id}`);

export const createEventoRequest = (evento) => axios.post(`/evento/${evento}`)

export const deleteEventoRequest = (id) => axios.delete(`/evento/${id}`);

export const updateEventoRequest = (id, evento) => axios.put(`/evento/${id}`, evento);