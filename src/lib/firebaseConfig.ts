import { connectAuthEmulator, getAuth } from "@react-native-firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "@react-native-firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_APIKEY,
//   authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.EXPO_PUBLIC_PROJECTID,
//   storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.EXPO_PUBLIC_APPID,
//   measurementId: process.env.EXPO_PUBLIC_MEASUREMENTID,
// };

export const auth = getAuth();
export const db = getFirestore();
if (__DEV__) {
  connectAuthEmulator(auth, "http://192.168.1.100:9099");
  connectFirestoreEmulator(db, "192.168.1.100", 8080);
}
