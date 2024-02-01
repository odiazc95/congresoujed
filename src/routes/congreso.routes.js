import { Router } from "express";
import upload from "../libs/storageImg.js";
import { createCongreso, deleteCongreso, getCongresos, getCongreso, updateCongreso } from "../controllers/congreso.controller.js";

const router = Router();

router.get("/congreso", getCongresos);
router.get("/congreso/:id", getCongreso);
router.post("/congreso", upload.single('img'), createCongreso);
router.delete("/congreso/:id", deleteCongreso);
router.put("/congreso/:id", updateCongreso);

export default router;