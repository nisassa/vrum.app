import { string } from 'yup';
import { ProviderType } from './provider.interface';

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  provider: ProviderType | null;
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
