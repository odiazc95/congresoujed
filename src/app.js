import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import congresoRoutes from './routes/congreso.routes.js';
import eventoRoutes from './routes/evento.routes.js';
import userRoutes from './routes/user.routes.js';
import reporteRoutes from './routes/reporte.routes.js';
import folioRoutes from './routes/folio.routes.js';


const app = express();
app.set('view', 'jade');

const corsOptions = {
    origin: ['https://secretariatecnica.ujed.mx', 'http://localhost:5173'], 
    credentials: true,
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

const currentDir = path.dirname(new URL(import.meta.url).pathname);

app.use('/public', express.static(path.join(currentDir, 'storages/imgs')));

app.use("/api", authRoutes);
app.use("/api", folioRoutes);
app.use("/api", congresoRoutes);
app.use("/api", eventoRoutes);
app.use("/api", userRoutes);
app.use("/api", reporteRoutes);

export default app;
