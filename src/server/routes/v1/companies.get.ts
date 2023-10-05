import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { defineEventHandler } from 'h3';
import { Company } from '../../../app/components/companies/companies.component';
import { dataBase } from '../../database/init';

export default defineEventHandler(async (): Promise<Company[]> => {
  const companiesDocs: QuerySnapshot<DocumentData> = await dataBase
    .collection('companies')
    .get();

  return companiesDocs.docs
    .map((entry) => {
      return <Company>entry.data();
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));
});
