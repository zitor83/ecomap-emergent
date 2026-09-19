import { useCallback, useEffect, useMemo, useState } from "react";
import userService, { type User } from "@/api/services/userService";
import { AuthContext, type UserProfile } from "./AuthContextValue";
const STORAGE_KEY = "gogomap_auth_token";
const REFRESH_STORAGE_KEY = "gogomap_refresh_token";

function safeDecodeJwt(token: string): UserProfile | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + (4 - (normalized.length % 4)) % 4, "=");
    const decoded = atob(padded);
    const parsed = JSON.parse(decoded);

    const roles = parsed.roles
      ? typeof parsed.roles === "string"
        ? parsed.roles.split(" ").filter(Boolean)
        : Array.isArray(parsed.roles)
        ? parsed.roles
        : []
      : [];

    return {
      sub: parsed.sub || "",
      email: parsed.email || parsed.sub || "",
      roles,
      exp: typeof parsed.exp === "number" ? parsed.exp : undefined,
      iat: typeof parsed.iat === "number" ? parsed.iat : undefined,
      ...parsed,
    };
  } catch {
    return null;
  }
}

function tokenIsValid(token: string): boolean {
  const decoded = safeDecodeJwt(token);
  return !!decoded && typeof decoded.exp === "number" && decoded.exp * 1000 > Date.now();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialAuth = (() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (!storedToken) {
      return { token: null, user: null };
    }

    if (!tokenIsValid(storedToken)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REFRESH_STORAGE_KEY);
      return { token: null, user: null };
    }

    return { token: storedToken, user: safeDecodeJwt(storedToken) };
  })();

  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [user, setUser] = useState<UserProfile | null>(initialAuth.user);
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(initialAuth.token));
  const [hasSpunWheelToday, setHasSpunWheelToday] = useState(false);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userService.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error("No se pudo cargar el perfil del usuario", error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadWheelSpinStatus = useCallback(async () => {
    if (!token) {
      setHasSpunWheelToday(false);
      return;
    }

    try {
      const response = await userService.getWheelSpinStatus();
      setHasSpunWheelToday(response.data.hasSpunToday);
    } catch (error) {
      console.error("No se pudo comprobar el estado de la ruleta", error);
      setHasSpunWheelToday(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    queueMicrotask(() => void loadWheelSpinStatus());
  }, [token, loadWheelSpinStatus]);

  useEffect(() => {
    if (!token || profile) return;
    queueMicrotask(() => void loadProfile());
  }, [token, profile, loadProfile]);

  const login = useCallback(async (newToken: string, refreshToken?: string) => {
    const decoded = safeDecodeJwt(newToken);
    if (!decoded) return;

    localStorage.setItem(STORAGE_KEY, newToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_STORAGE_KEY, refreshToken);
    }

    setToken(newToken);
    setUser(decoded);
    await loadProfile();
    await loadWheelSpinStatus();
  }, [loadProfile, loadWheelSpinStatus]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REFRESH_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setProfile(null);
    setIsLoading(false);
    setHasSpunWheelToday(false);
  }, []);

  const refreshWheelSpinStatus = useCallback(async () => {
    await loadWheelSpinStatus();
  }, [loadWheelSpinStatus]);

  const refreshProfile = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  const markWheelSpinDone = useCallback(() => {
    setHasSpunWheelToday(true);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      profile,
      isAuth: Boolean(token && user),
      isAuthenticated: Boolean(token && user),
      isLoading,
      hasSpunWheelToday,
      login,
      logout,
      refreshWheelSpinStatus,
      refreshProfile,
      markWheelSpinDone,
    }),
    [token, user, profile, isLoading, hasSpunWheelToday, login, logout, refreshWheelSpinStatus, refreshProfile, markWheelSpinDone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
