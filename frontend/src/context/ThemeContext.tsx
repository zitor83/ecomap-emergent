import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/**
 * Tipos del sistema multi-tema.
 * - light: tema claro por defecto
 * - dark: tema oscuro
 * - malagueno: tema inspirado en la Biznaga (verde oscuro + morado)
 */
export type Theme = "light" | "dark" | "malagueno";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "gogomap-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Determina el tema inicial:
 * 1. Valor guardado en localStorage (prioritario)
 * 2. Preferencia del sistema (prefers-color-scheme)
 * 3. Fallback: "light"
 */
const resolveInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "malagueno") {
      return stored;
    }
  } catch {
    // localStorage no disponible (modo privado/SSR): continuamos al fallback
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);

  // Aplica el atributo data-theme al <html> y persiste en localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    // Sincroniza con la clase "dark" de Tailwind para compatibilidad
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Silencioso: localStorage puede no estar disponible
    }
  }, [theme]);

  // Si el usuario no ha elegido manualmente, refleja cambios del sistema en vivo
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const handler = (event: MediaQueryListEvent) => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) return; // el usuario ya eligió: no sobrescribimos
      } catch {
        return;
      }
      setThemeState(event.matches ? "dark" : "light");
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme: setThemeState }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook de acceso al tema actual y al setter.
 * Lanza un error si se usa fuera del ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de un <ThemeProvider />");
  }
  return ctx;
}
