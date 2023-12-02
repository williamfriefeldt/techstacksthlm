import { PageServerLoad } from '@analogjs/router';
import { Company } from '../shared/entities';

export const load = async ({ fetch }: PageServerLoad): Promise<Company[]> => {
  return await fetch('/api/v1/companies', { cache: 'no-store' });
};
