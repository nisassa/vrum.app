import { ProviderType } from './provider.interface';
import { ProviderStaffType } from './staffMember.interface';

export interface WorkingDayType {
  id: number,
  day: string,
  start_at: string,
  end_at: string,
  provider_id: number|null,
  user_id: number|null,
  is_active: number,
  provider: ProviderType | null;
  user: ProviderStaffType | null;
}
