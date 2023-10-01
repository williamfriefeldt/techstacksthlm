import admin from 'firebase-admin';
import { type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app: App = admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env['FIREBASE_SERVICE_ACCOUNT_KEY_JSON'] as string)
  ),
});

export const dataBase = getFirestore(app);
