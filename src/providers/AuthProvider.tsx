import { AuthContext } from "@/hooks/useAuth";
import {
  type FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import React, { type ReactNode, useEffect, useState } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<undefined | FirebaseAuthTypes.User>(
    undefined,
  );

  // TODO: the problem of user doesnt have profile in firestore!! add a comlete profile step

  // const {
  //   isLoading,
  //   isError,
  //   data: user,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["user", userId],
  //   queryFn: async () => await getUser(userId!),

  //   enabled: !!userId,
  // });
  useEffect(() => {
    setUserLoading(true);

    const unsubscribe = onAuthStateChanged(getAuth(), async (fireBaseUser) => {
      if (fireBaseUser) {
        // TODO: the problem of user doesnt have profile in firestore!! add a comlete profile step
        // queryClient.prefetchQuery({
        //   queryKey: ["user", fireBaseUser.uid],
        //   queryFn: async () => await getUser(fireBaseUser.uid),
        // });
        setUser(fireBaseUser);
      } else {
        setUser(undefined);
      }

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);
  // useEffect(() => {
  //   GoogleSignin.signInSilently()
  //     .then((userInfo) => {
  //       console.log("User is already signed in:", userInfo);
  //     })
  //     .catch((error) => {
  //       console.error("Error signing in silently:", error);
  //     });
  // }, []);

  return <AuthContext value={{ user, userLoading }}>{children}</AuthContext>;
};
