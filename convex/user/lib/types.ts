type KeyDataType = {
  label: string;
  usage: number;
  isFreeTier: boolean;
  isProvisioningKey: boolean;
  limit: number | null;
  limit_remaining: number | null;
  rate_limit: {
    requests: number;
    interval: string;
  };
};

export type { KeyDataType };
