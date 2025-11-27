import { ItsAliveController } from "@/presentation/controllers/its-alive.controller";
import { Router } from "express";
import { metricsHandler } from "light-node-metrics"

const outrosRouter = Router();

const itsAliveController =
    new ItsAliveController();
outrosRouter.get(
    "/itsAlive",
    itsAliveController.handle
);

outrosRouter.get(
    "/metrics",
    metricsHandler
)

export { outrosRouter };