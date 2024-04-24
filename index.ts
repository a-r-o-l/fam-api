import express, { Express, Response, Request } from "express";
import morgan from "morgan";
import pg from "pg";
import { config } from "dotenv";
import cors from "cors";
import { sequelize } from "./src/database/database";
import cron from "node-cron";
import buildingsRoutes from "./src/routes/buildings.route";
import rentersRoutes from "./src/routes/renters.route";
import paymentsRoutes from "./src/routes/payments.route";
import analitycsRoutes from "./src/routes/analitycs.route";
import apartmentsRoutes from "./src/routes/apartments.route";
import contractsRoutes from "./src/routes/contracts.route";
import "./src/models/Building";
import "./src/models/Renter";
import {
  cleanExpiredContracts,
  createAutomaticPayments,
} from "./src/controllers/cron/POST";
import dayjs from "dayjs";

config();
cron.schedule("*/40 * * * * *", async () => {
  console.log("se dispara cron");
  console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  await cleanExpiredContracts();
  await createAutomaticPayments();
});

const app: Express = express();
app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(buildingsRoutes);
app.use(rentersRoutes);
app.use(paymentsRoutes);
app.use(analitycsRoutes);
app.use(apartmentsRoutes);
app.use(contractsRoutes);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
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
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log(`Database running on port ${process.env.DATABASE_PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
