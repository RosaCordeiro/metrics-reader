import { ListMetricsUseCase } from "@/core/useCases/metrics/ListMetricsUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class MetricsController {
    async listMetrics(req: Request, res: Response) {
        try {
            const listMetricsUseCase = container.resolve(
                ListMetricsUseCase
            )

            const serviceName: string = req.query.serviceName as string
            const environment: string = req.query.environment as string

            const listMetrics = await listMetricsUseCase.execute(serviceName, environment);

            if (!listMetrics) {
                return res.status(404).json({ error: "Métricas não encontradas." });
            }

            res.json(listMetrics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}