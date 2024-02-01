import { Router } from "express";
import { createEvento, deleteEvento, getEventos, getEvento, updateEvento } from "../controllers/evento.controller.js";

const router = Router();

router.get("/evento", getEventos);
router.get("/evento/:id", getEvento);
router.post("/evento", createEvento);
router.delete("/evento/:id", deleteEvento);
router.put("/evento/:id", updateEvento);

export default router;