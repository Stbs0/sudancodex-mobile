import { AuthContext } from "@/hooks/useAuth";
import { auth } from "@/lib/firebaseConfig";
import { getUser } from "@/services/usersServices";
import { onAuthStateChanged } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { type ReactNode, useEffect, useState } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userLoading, setUserLoading] = useState(true);
  const [userId, setUserId] = useState<undefined | string>(undefined);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(userId!),

    enabled: !!userId,
  });
  useEffect(() => {
    setUserLoading(true);

const unsubscribe = onAuthStateChanged(auth, async (fireBaseUser) => {
  try {
    if (fireBaseUser) {
      queryClient.prefetchQuery({
        queryKey: ["user", fireBaseUser.uid],
        queryFn: async () => await getUser(fireBaseUser.uid),
      });
      console.log(fireBaseUser)
      setUserId(fireBaseUser.uid);
    } else {
      setUserId(undefined);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setUserLoading(false);
  }
});

    return unsubscribe;
  }, []);
  useEffect(() => {
GoogleSignin.signInSilently()
  .then((userInfo) => {
    console.log("User is already signed in:", userInfo);
  })
  .catch((error) => {
    console.error("Error signing in silently:", error);
  });

  }, [])


  return (
    <AuthContext
      value={{ user, userLoading, isLoading, isError, error, refetch }}>
      {children}
    </AuthContext>
  );
};
