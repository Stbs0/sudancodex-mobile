import { AuthContext } from "@/hooks/useAuth";
import { getUser } from "@/services/usersServices";
import {
  type FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { type ReactNode, useEffect, useState } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [userAuth, setUserAuth] = useState<null | FirebaseAuthTypes.User>(null);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userAuth?.uid],
    queryFn: async () => await getUser(userAuth?.uid!),
    staleTime: 5 * 60 * 1000,
    enabled: !!userAuth?.uid,
  });
  useEffect(() => {
    setAuthLoading(true);

    const unsubscribe = onAuthStateChanged(getAuth(), async (fireBaseUser) => {
      if (fireBaseUser) {
        queryClient.prefetchQuery({
          queryKey: ["user", fireBaseUser.uid],
          queryFn: async () => await getUser(fireBaseUser.uid),
        });
        setUserAuth(fireBaseUser);
      } else {
        queryClient.removeQueries({ queryKey: ["user"] });

        setUserAuth(null);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, [queryClient]);
  const userLoading = isLoading || authLoading;

  return (
    <AuthContext value={{ user, userLoading, isError, error, refetch }}>
      {children}
    </AuthContext>
  );
};
