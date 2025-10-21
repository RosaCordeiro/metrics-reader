import { Router } from "express";
import { outrosRouter } from "./outros.routes";
import { metricsRouter } from "./metrics.routes";

const router = Router();

router.use('/', outrosRouter);
router.use('/metrics', metricsRouter);

export { router };