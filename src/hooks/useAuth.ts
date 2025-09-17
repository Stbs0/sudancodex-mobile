import { type SaveUserReturnTypes } from "@/types";
import {
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: SaveUserReturnTypes | undefined;
  userLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  error: null | Error;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<SaveUserReturnTypes | undefined, Error>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
