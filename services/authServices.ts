import { auth } from "@/lib/firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  browserPopupRedirectResolver,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export const logout = async () => {
  return await signOut(auth);
};

export const GoogleSignIn = async () =>
  // await signInWithPopup(auth, new GoogleAuthProvider()).catch(async (err) => {
  //   if ((err as FirebaseError).code === "auth/popup-blocked") {
  await signInWithRedirect(auth, new GoogleAuthProvider());
// }
// throw err;
// });

export const FaceBookSignIn = async () =>
  await signInWithPopup(
    auth,
    new FacebookAuthProvider(),
    browserPopupRedirectResolver,
  ).catch(async (err) => {
    if ((err as FirebaseError).code === "auth/popup-blocked") {
      return await signInWithRedirect(
        auth,
        new FacebookAuthProvider(),
        browserPopupRedirectResolver,
      );
    }
    throw err;
  });
