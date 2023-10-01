import { defineEventHandler } from 'h3';
import { Company } from '../../../app/components/companies/companies.component';
import { dataBase } from '../../database/init';

export default defineEventHandler(async (): Promise<Company[]> => {
  const companiesDocs = await dataBase.collection('companies').get();

  return companiesDocs.docs
    .map((entry) => {
      return entry.data() as Company;
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));
});
