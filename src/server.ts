import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";
import "dotenv/config";

const PORT = config.port;

async function main () {
    try {
        await prisma.$connect();
        console.log("connected to db");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        process.exit(1);
    }
}

main();