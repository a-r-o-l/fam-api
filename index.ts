import express, { Express, Response, Request } from "express";
import morgan from "morgan";
import pg from "pg";
import { config } from "dotenv";
import cors from "cors";
import { sequelize } from "./src/database/database";
import cron from "node-cron";
import buildingsRoutes from "./src/routes/new-fam/buildings.route";
import rentersRoutes from "./src/routes/new-fam/renters.route";
import { createAutomaticPayment } from "./src/controllers/new-fam/payments.controller";
import paymentsRoutes from "./src/routes/new-fam/payments.route";
import "./src/models/new-fam/Building";
import "./src/models/new-fam/Renter";
import { automaticFunctions } from "./src/cron/automaticFunctions";

config();
cron.schedule("* */30 * * * *", async () => {
  automaticFunctions.createAutomaticPayment();
  // await createAutomaticPayment();
});
const app: Express = express();
app.use(morgan("tiny"));

app.use(cors());

app.use(express.json());
app.use(buildingsRoutes);
app.use(rentersRoutes);
app.use(paymentsRoutes);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true,
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
      console.log(`Server running on port ${process.env.DATABASE_PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
