import express, { Express, Response, Request } from "express";
import morgan from "morgan";
import pg from "pg";
import { config } from "dotenv";
import cors from "cors";
import { sequelize } from "./src/database/database";
import LoginRoutes from "./src/routes/login.route";
import accountRoutes from "./src/routes/accounts.route";
import webHookRoutes from "./src/routes/webHook.route";
import PropertyRoutes from "./src/routes/property.route";
import ContractRoutes from "./src/routes/contract.route";
import ApartmentRoutes from "./src/routes/apartments.route";
import PaymentRoutes from "./src/routes/payment.route";
import authenticateToken from "./src/middlewares/authMiddleware";
import "./src/models/Property";
import "./src/models/Renter";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import swaggerDocs from "./src/swagger/swaggerConfig";
config();

const app: Express = express();
const volumeMountPath = process.env.RAILWAY_VOLUME_MOUNT_PATH || "/app/images";

app.use(morgan("dev"));

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(volumeMountPath, express.static(volumeMountPath));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(LoginRoutes);
app.use(accountRoutes);
app.use(webHookRoutes);
app.use(authenticateToken, PropertyRoutes);
app.use(authenticateToken, ContractRoutes);
app.use(authenticateToken, ApartmentRoutes);
app.use(authenticateToken, PaymentRoutes);
// app.use(authenticateToken, uploadsRoutes);

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
    await sequelize.sync({ force: false });
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
