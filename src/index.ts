import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import cors from "cors"
import { db } from './db';
import { User } from './models/user';
import { USER_ROLES } from './constants/user';
import UserRoutes from './routes/user';
import NewsRoutes from './routes/poses';
import { authenticateToken } from './middlewares/auth';
import dotenv from "dotenv";

dotenv.config()

const app: Application = express();
const { PORT = 8000 } = process.env;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json())
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/poses", NewsRoutes);

app.use(
    "/api/v1/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
)

app.get("*", (req, res) => {
    res.status(505).json({ message: "Bad Request" });
});

app.listen(PORT, async () => {
    await db.sync().then(() => {
    })
    await User.findOrCreate({
        where: { login: "admin" },
        defaults: {
            age: 20,
            fullname: "Super Admin",
            inn: "00000000000000",
            login: "admin",
            password: "admin",
            role: USER_ROLES.SUPER_ADMIN,
            sex: true,
        }
    });
})
