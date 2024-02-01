import axios from './axios'

export const getReportesRequest = () => axios.get('/reporte');

export const getReporteRequest = (id) => axios.get(`/reporte/${id}`);

export const createReporteRequest = (reporte) => axios.post('/reporte', reporte);

export const deleteReporteRequest = (id) => axios.delete(`/reporte/${id}`);

export const updateReporteRequest = (id, reporte) => axios.put(`/reporte/${id}`, reporte);