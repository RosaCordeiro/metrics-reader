import { Router } from "express";
import { MetricsController } from '../controllers/metrics.controller';

const metricsRouter = Router();

const metricsController =
    new MetricsController();
metricsRouter.get(
    "/listMetrics",
    metricsController.listMetrics
);

export { metricsRouter };