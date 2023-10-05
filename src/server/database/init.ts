import {
  cert,
  initializeApp,
  type App,
  type Credential,
} from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

const keyString = <string>process.env['FIREBASE_SERVICE_ACCOUNT_KEY_JSON'];
const key: Object = JSON.parse(keyString);
const credential: Credential = cert(key);

const app: App = initializeApp({ credential });

export const dataBase: Firestore = getFirestore(app);
