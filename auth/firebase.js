import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.apiKey,
    projectId: process.env.apiKey,
    storageBucket: process.env.apiKey,
    messagingSenderId: process.env.apiKey,
    appId: process.env.apiKey,
};
export const userId = 'your-user-id-value';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage(app);


export { app, db, auth, storage };