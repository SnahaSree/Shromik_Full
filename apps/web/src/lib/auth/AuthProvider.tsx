"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginRequest,
  logout as logoutRequest,
  refreshAccessToken,
  register as registerRequest,
} from "@/lib/api/auth";

import type {
  AuthUser,
  RegisterPayload,
} from "@/types/auth";

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    credentials: LoginCredentials,
  ) => Promise<AuthUser>;
  register: (
    payload: RegisterPayload,
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const restoreSession =
    useCallback(async () => {
      try {
        const response =
          await refreshAccessToken();

        setUser(response.user);
        setAccessToken(response.accessToken);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
    ): Promise<AuthUser> => {
      const response =
        await loginRequest(credentials);

      setUser(response.user);
      setAccessToken(response.accessToken);

      return response.user;
    },
    [],
  );

  const register = useCallback(
    async (
      payload: RegisterPayload,
    ): Promise<AuthUser> => {
      const response =
        await registerRequest(payload);

      setUser(response.user);
      setAccessToken(response.accessToken);

      return response.user;
    },
    [],
  );

  const logout = useCallback(async () => {
    if (accessToken) {
      try {
        await logoutRequest(accessToken);
      } finally {
        setUser(null);
        setAccessToken(null);
      }

      return;
    }

    setUser(null);
    setAccessToken(null);
  }, [accessToken]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated:
        user !== null &&
        accessToken !== null,
      isLoading,
      login,
      register,
      logout,
    }),
    [
      user,
      accessToken,
      isLoading,
      login,
      register,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
}