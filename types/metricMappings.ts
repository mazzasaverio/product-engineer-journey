// metricMappings.ts

export const METRIC_MAPPINGS = {
  avgSalePerSqM: { label: "Vendita Immobile", unit: "€/m²" },
  avgRentPerSqM: { label: "Affitto Immobile", unit: "€/m²" },
  pollutionScore: { label: "Inquinamento", unit: "pm2.5" },
} as const;

export type MetricKey = keyof typeof METRIC_MAPPINGS;

export function getMetricLabel(key: MetricKey): string {
  return METRIC_MAPPINGS[key].label;
}

export function getMetricUnit(key: MetricKey): string {
  return METRIC_MAPPINGS[key].unit;
}

export function getFullMetricLabel(key: MetricKey): string {
  return `${METRIC_MAPPINGS[key].label} (${METRIC_MAPPINGS[key].unit})`;
}

// Aggiungi questa funzione per la sicurezza del tipo
export function isValidMetricKey(key: string): key is MetricKey {
  return key in METRIC_MAPPINGS;
}
