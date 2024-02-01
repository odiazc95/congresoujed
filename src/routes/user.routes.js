import { Router } from "express";
import { getUser, getUsers, deleteUser, createUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);

export default router;