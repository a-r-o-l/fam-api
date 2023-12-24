import express,{Express, Response, Request} from 'express';
import pg from "pg"
import {config  } from "dotenv";

config()

const app: Express = express();

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
 
app.listen(3000, () => {
    console.log('Server running on port 3000');
})