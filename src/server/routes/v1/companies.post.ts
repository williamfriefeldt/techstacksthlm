import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { defineEventHandler, readBody } from 'h3';
import { Company } from '../../../app/shared/entities';
import { dataBase } from '../../database/init';
import { getAllCompanies } from './companies.get';

export default defineEventHandler(async (event): Promise<Company[]> => {
  const body: Company = await readBody(event);

  const companyExists: QuerySnapshot<DocumentData> = await dataBase
    .collection('companies')
    .where('name', '==', body.name)
    .get();

  if (companyExists.docs[0]) {
    const docsId: string = companyExists.docs[0].id;
    await dataBase.collection('companies').doc(docsId).set(body);
    return await getAllCompanies();
  }

  await dataBase.collection('companies').add(body);

  return await getAllCompanies();
});
