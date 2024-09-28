import express from "express";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router()

router.post("/", authenticateToken, (req, res) => {
    res.json("You are signed in");
});


export default router