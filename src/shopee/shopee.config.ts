export type ShopeeConfig = {
  partnerId: string;
  partnerKey: string;
  redirectUrl: string;
  baseUrl: string;
  onSyncOrders?: (orders: any[]) => Promise<void>;
};
