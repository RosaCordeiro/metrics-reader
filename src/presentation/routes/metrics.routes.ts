import { metricsHandler } from './../../shared/providers/metrics/instrumentation';
import { ItsAliveController } from "@/presentation/controllers/ItsAliveController";
import { Router } from "express";
import { MetricsController } from '../controllers/MetricsController';

const metricsRouter = Router();

const metricsController =
    new MetricsController();
metricsRouter.get(
    "/listMetrics",
    metricsController.listMetrics
);

export { metricsRouter };