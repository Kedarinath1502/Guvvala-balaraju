import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import 'firebase/storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
const firebaseConfig = {
    apiKey: "AIzaSyB8NnRBNP3nPK9otJjW4PUDDQRlzE0Nuho",
    authDomain: "rn-guvvalabalaraju.firebaseapp.com",
    projectId: "rn-guvvalabalaraju",
    storageBucket: "rn-guvvalabalaraju.appspot.com",
    messagingSenderId: "785359537670",
    appId: "1:785359537670:web:23ff97d4470b2d93486587"
};
// Assuming this is how you define and export userId
export const userId = 'your-user-id-value';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage(app);


export { app, db, auth, storage };