// userRoutes.ts
import express, { Request, Response } from "express";
import { catchAsync } from "../middlewares";
import { UserController } from "../controllers/user";

const router = express.Router()

router.post("/register", catchAsync(async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.register(req.body);
    res.status(201).json(response);
}));

router.post("/login", catchAsync(async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.authorize(req.body);
    res.json(response);
}));

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Success" })
});

export default router