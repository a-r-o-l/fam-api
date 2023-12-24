import express,{Express, Response, Request} from 'express';
import pg from "pg"
import {config  } from "dotenv";
import {sequelize  } from "./src/database/database";
import projectsRoutes from "./src/routes/projects.route";
import tasksRoutes from "./src/routes/tasks.route";
import "./src/models/Project";
import "./src/models/Task";

config()

const app: Express = express();

app.use(express.json());
app.use(projectsRoutes);
app.use(tasksRoutes);

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl:true
})

app.get('/', (req:Request, res: Response) => {
    res.send('Hello World');
});

app.get('/ping', async(req:Request, res: Response) => {
    const result = await pool.query("SELECT NOW()")
    return res.json(result.rows[0])
});

async function main() {
    try {
        await sequelize.sync({ force: false });
        console.log("Connection has been established successfully.");
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } 
}
main()