import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

const app : Application = express();

app.use(cors({
    origin : config.app_url,
    credentials : true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser())

app.get("/", async(req: Request, res: Response) => {
    res.send("Hello from Prisma Press")
})

app.get("/api/users/register", async(req: Request, res: Response) => {
    const { name, email, password, profilePhoto } = req.body;

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExist) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

})

export default app;