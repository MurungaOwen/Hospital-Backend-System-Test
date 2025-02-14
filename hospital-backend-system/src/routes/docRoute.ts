import { Router } from "express";
import swaggerJSDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOption } from "../swagger";

const swaggerSpec = swaggerJSDocs(swaggerOption);
const docsRouter = Router();

docsRouter.use("/", swaggerUi.serve);
docsRouter.get("/", swaggerUi.setup(swaggerSpec));

export default docsRouter;