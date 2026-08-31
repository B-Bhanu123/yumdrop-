export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

export class Logger {
  constructor(private serviceName: string) {}

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | Meta: ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] [${this.serviceName}] ${message}${metaStr}`;
  }

  info(message: string, meta?: any): void {
    console.log(this.formatMessage(LogLevel.INFO, message, meta));
  }

  warn(message: string, meta?: any): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, meta));
  }

  error(message: string, error?: any, meta?: any): void {
    const errDetails = error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error;
    console.error(this.formatMessage(LogLevel.ERROR, message, { error: errDetails, ...meta }));
  }

  debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, meta));
    }
  }
}

export class MetricsCollector {
  private static metricsMap = new Map<string, number>();

  static incrementCounter(metricName: string, value: number = 1): void {
    const current = this.metricsMap.get(metricName) || 0;
    this.metricsMap.set(metricName, current + value);
  }

  static recordGauge(metricName: string, value: number): void {
    this.metricsMap.set(metricName, value);
  }

  static getMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    this.metricsMap.forEach((val, key) => {
      result[key] = val;
    });
    return result;
  }
}
