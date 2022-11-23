export interface ProviderType {
  id: number;
  name: string;
  live_api_key: string;
  test_api_key: string;
  invoice_email: string;
  vip: number;
  booking_by_specialist: number;
  booking_approved_by_provider: number;
  discard: number;
  line_1: string;
  line_2: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
  lat: string;
  long: string;
}
