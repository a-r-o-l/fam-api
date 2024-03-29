import express, { Express, Response, Request } from "express";
import morgan from "morgan";
import pg from "pg";
import { config } from "dotenv";
import { sequelize } from "./src/database/database";
import apartmentsRoutes from "./src/routes/apartments.route";
import buildsRoutes from "./src/routes/builds.route";
import rentersRoutes from "./src/routes/renters.route";
import paymentsRoutes from "./src/routes/payments.route";
import uploadRoutes from "./src/routes/upload.route";
import "./src/models/Apartment";
import "./src/models/Build";
import "./src/models/Renter";
import "./src/models/Payment";

config();

const app: Express = express();
app.use(morgan("combined"));

app.use(express.json());
app.use(apartmentsRoutes);
app.use(buildsRoutes);
app.use(rentersRoutes);
app.use(paymentsRoutes);
app.use(uploadRoutes);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl:true
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/ping", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
