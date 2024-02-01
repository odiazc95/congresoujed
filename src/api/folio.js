import axios from './axios'

export const getFoliosRequest = (idUser) => axios.get('/folio');

export const getFolioRequest = (id) => axios.get(`/folio/${id}`);

export const createFolioRequest = (folio) => axios.post(`/folio`, folio)

export const deleteFolioRequest = (id) => axios.delete(`/folio/${id}`);

export const updateFolioRequest = (id, folio) => axios.put(`/folio/${id}`, folio);