import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase-admin/firestore';
import { defineEventHandler, readBody } from 'h3';
import { Company } from '../../../app/components/companies/companies.component';
import { dataBase } from '../../database/init';

export default defineEventHandler(async (event): Promise<Company> => {
  const body: Company = await readBody(event);

  const companyExists: QuerySnapshot<DocumentData> = await dataBase
    .collection('companies')
    .where('name', '==', body.name)
    .get();

  if (companyExists.docs[0]) {
    const docsId: string = companyExists.docs[0].id;
    await dataBase.collection('companies').doc(docsId).set(body);
    return body;
  }

  const addCompanyRef: DocumentReference<DocumentData> = await dataBase
    .collection('companies')
    .add(body);

  const company: DocumentSnapshot<DocumentData> = await addCompanyRef.get();

  return <Company>company.data();
});
