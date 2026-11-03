export type GoogleAdsMetrics = {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  /** Fração: 0,05 corresponde a 5%. */
  ctr: number | null;
  averageCpc: number | null;
  costPerConversion: number | null;
};

export type GoogleAdsCampaign = GoogleAdsMetrics & { id: string; name: string; status: string };

export type GoogleAdsReport =
  | {
      status: "ready";
      customer: { id: string; name: string; currencyCode: string; timeZone: string };
      from: string;
      to: string;
      totals: GoogleAdsMetrics;
      campaigns: GoogleAdsCampaign[];
      fetchedAt: string;
    }
  | { status: "not_configured" | "error"; message: string };

export type Ga4Totals = {
  sessions: number;
  users: number;
  newUsers: number;
  engagementRate: number;
  averageSessionDuration: number;
  keyEvents: number;
  keyEventRate: number | null;
};

export type Ga4Breakdown = { key: string; sessions: number; users: number; keyEvents: number };

export type Ga4Report =
  | {
      status: "ready";
      propertyId: string;
      from: string;
      to: string;
      timeZone: string | null;
      thresholded: boolean;
      totals: Ga4Totals;
      previous: Ga4Totals;
      daily: Array<{ date: string; sessions: number; keyEvents: number }>;
      channels: Ga4Breakdown[];
      landingPages: Ga4Breakdown[];
      events: Array<{ name: string; count: number; previous: number }>;
      fetchedAt: string;
    }
  | { status: "not_configured" | "error"; message: string };
