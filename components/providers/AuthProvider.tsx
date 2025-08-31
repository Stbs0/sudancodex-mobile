import { AuthContext } from "@/hooks/useAuth";
import { auth } from "@/lib/firebaseConfig";
import { getUser } from "@/services/usersServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
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

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext
      value={{ user, userLoading, isLoading, isError, error, refetch }}>
      {children}
    </AuthContext>
  );
};
