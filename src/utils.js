export const formatCurrency = v => Number.isNaN(v) ? 0 : Number(v).toFixed(2);
export const ensureFutureCurrency = v => v ? (v.toString().match(/0*(\d+\.?\d{0,2})/)[1] || undefined) : undefined;
