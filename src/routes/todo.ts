import express, { Request, Response } from "express";
import { catchAsync } from "../middlewares";
import { TodoController } from "../controllers/todo";
import { TodoCreationAttributes } from "../models/todos";

const router = express.Router();

router.post("/create", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const createData: TodoCreationAttributes = req.body
    if (createData) {
        const response = await controller.create(createData);
        res.status(200).json(response);
    } else {
        res.status(400).json("Fields are required")
    }
}));

router.post("/update/:id", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const id = parseInt(`${req.query.id}`);
    const response = await controller.update(id, req.body);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}));

router.get("/:id", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const id = parseInt(`${req.query.id}`);
    const response = await controller.getById(id);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}));


router.post("/did", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const id = parseInt(`${req.query.id}`);
    const response = await controller.did(id);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}));

router.delete("/disable", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const id = parseInt(`${req.query.id}`);
    const response = await controller.disable(id);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}));


router.post("/enable", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const id = parseInt(`${req.query.id}`);
    const response = await controller.enable(id);
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}));


router.get("/", catchAsync(async (req: Request, res: Response) => {
    const controller = new TodoController();
    const response = await controller.getAll();
    if (response) {
        res.status(200).json(response);
    } else {
        res.status(404).json({ message: "Not found" });
    }
}));




export default router;
