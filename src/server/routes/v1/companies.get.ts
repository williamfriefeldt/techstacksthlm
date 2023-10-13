import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { defineEventHandler } from 'h3';
import { Company } from '../../../app/shared/entities';
import { dataBase } from '../../database/init';

export async function getAllCompanies(): Promise<Company[]> {
  const companiesDocs: QuerySnapshot<DocumentData> = await dataBase
    .collection('companies')
    .get();

  return companiesDocs.docs
    .map((entry) => {
      return <Company>entry.data();
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

export default defineEventHandler(
  async (): Promise<Company[]> => await getAllCompanies()
);
