import { ProviderType } from './provider.interface';
import { WorkingDayType } from './workingDays.interface';

export interface ProviderStaffType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  provider: ProviderType | null;
  working_days: WorkingDayType | null;
  job_title: string;
  photo: string;
  vip: number;
  discard: number;
  landline: string;
  line_1: string;
  line_2: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
  lat: string;
  long: string;
}
