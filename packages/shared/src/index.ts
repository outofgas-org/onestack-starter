export type HealthResponse = {
  ok: boolean;
  service: string;
};

export const healthResponse = (service: string): HealthResponse => ({
  ok: true,
  service,
});
