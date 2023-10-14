import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { defineEventHandler } from 'h3';
import { Company } from '../../../app/shared/entities';
import { sortCompanies } from '../../../app/shared/sort';
import { dataBase } from '../../database/init';

export async function getAllCompanies(): Promise<Company[]> {
  const companiesDocs: QuerySnapshot<DocumentData> = await dataBase
    .collection('companies')
    .get();

  const companies: Company[] = companiesDocs.docs.map(
    (entry) => <Company>entry.data()
  );
  sortCompanies(companies);

  return companies;
}

export default defineEventHandler(
  async (): Promise<Company[]> => await getAllCompanies()
);
