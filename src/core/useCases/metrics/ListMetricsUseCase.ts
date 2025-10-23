import axios from "axios";

type PrometheusMetric = {
  metric: Record<string, string>;
  value: [number, string];
};

function aggregateMetrics(data: PrometheusMetric[]) {
  const aggregated: Record<string, any> = {};

  data.forEach(item => {
    const key = `${item.metric.service_name}|${item.metric.job}|${item.metric.instance}|${item.metric.environment}`;

    if (!aggregated[key]) {
      aggregated[key] = {
        service_name: item.metric.service_name,
        job: item.metric.job,
        instance: item.metric.instance,
        environment: item.metric.environment,
      };
    }

    aggregated[key][item.metric.__name__] = isNaN(Number(item.value[1])) 
      ? item.value[1] 
      : Number(item.value[1]);
  });

  // Retorna como array
  return Object.values(aggregated);
}

export class ListMetricsUseCase {
    async execute(serviceName: string, environment: string): Promise<any> {
        const prometheusProtocol = process.env.PROMETHEUS_PROTOCOL
        const prometheusHost = process.env.PROMETHEUS_HOST
        const prometheusPort = process.env.PROMETHEUS_PORT

        if (!prometheusProtocol || !prometheusHost || !prometheusPort) {
            throw new Error('Configuração do Prometheus está incompleta.');
        }
        
        const prometheusData: any = await axios.get<any>(`${process.env.PROMETHEUS_PROTOCOL}://${process.env.PROMETHEUS_HOST}:${process.env.PROMETHEUS_PORT}/api/v1/query`, {
            params: {
                query: `{__name__=~"^custom_telemetry.*"}`
            }
        }).then(response => {
            return response;
        }).catch(error => {
            throw new Error(`Erro ao buscar métricas do Prometheus: ${error.message}`);
        });

        if (prometheusData.data.status !== 'success' || !prometheusData.data.data) {
            return null;
        }

        // Filter metrics based on serviceName and environment if provided
        let filteredMetrics = prometheusData.data.data.result;

        if (serviceName) {
            filteredMetrics = filteredMetrics.filter((metric: any) =>
                metric.metric.service_name === serviceName
            );
        }

        if (environment) {
            filteredMetrics = filteredMetrics.filter((metric: any) =>
                metric.metric.environment === environment
            );
        }

        return aggregateMetrics(filteredMetrics);
    }
}