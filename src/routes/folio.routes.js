import { Router } from "express";
import { createFolio, deleteFolio, getFolios, getFolio, updateFolio } from "../controllers/folio.controller.js";

const router = Router();

router.get("/folio", getFolios);
router.get("/folio/:id", getFolio);
router.post("/folio", createFolio);
router.delete("/folio/:id", deleteFolio);
router.put("/folio/:id", updateFolio);

export default router;