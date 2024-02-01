import { Router } from "express";
import upload from "../libs/storageDocx.js";
import { createReporte, deleteReporte, getReporte, getReportes, updateReporte } from "../controllers/reporte.controller.js";

const router = Router();

router.get("/reporte", getReportes);
router.get("/reporte/:id", getReporte);
router.post("/reporte", upload.single('archivo'), createReporte);
router.delete("/reporte/:id", deleteReporte);
router.put("/reporte/:id", updateReporte);

export default router;