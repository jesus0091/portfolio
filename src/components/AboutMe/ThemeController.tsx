"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Mode = "light" | "dark" | "system";

type Ctx = {
  mounted: boolean;
  mode: Mode;
  isDark: boolean;
  setMode: (m: Mode) => void;
  quickToggle: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

type ProviderProps = {
  children: ReactNode;
  colors?: { light: string; dark: string };
  storageKey?: string;
  defaultMode?: Mode;
};

export function ThemeProvider({
  children,
  colors = { light: "#ffffff", dark: "#0b0b0f" },
  storageKey = "theme",
  defaultMode = "system",
}: ProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>(defaultMode);

  useEffect(() => {
    setMounted(true);
    try {
      const saved =
        (localStorage.getItem(storageKey) as Mode | null) ?? defaultMode;
      setMode(saved);
    } catch {
      setMode(defaultMode);
    }
  }, [defaultMode, storageKey]);

  const isDark = useMemo(() => {
    if (!mounted) return false;
    if (mode === "dark") return true;
    if (mode === "light") return false;
    return (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, [mode, mounted]);

  const applyTheme = useRef((dark: boolean) => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";

    let meta = document.getElementById("theme-color") as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.id = "theme-color";
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", dark ? colors.dark : colors.light);
  });

  useEffect(() => {
    if (!mounted) return;
    applyTheme.current(isDark);
  }, [isDark, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (mode === "system") applyTheme.current(mq.matches);
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, [mode, mounted]);

  const setModePersist = useCallback(
    (next: Mode) => {
      setMode(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {}
    },
    [storageKey]
  );

  const quickToggle = useCallback(() => {
    const next =
      mode === "dark"
        ? "light"
        : mode === "light"
        ? "dark"
        : isDark
        ? "light"
        : "dark";
    setModePersist(next);
  }, [mode, isDark, setModePersist]);

  const value = useMemo<Ctx>(
    () => ({ mounted, mode, isDark, setMode: setModePersist, quickToggle }),
    [mounted, mode, isDark, setModePersist, quickToggle]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/** Botón opcional listo para usar (si no quieres hacerlo en el Navbar) */
export function ThemeToggleButton() {
  const { mounted, mode, quickToggle } = useTheme();
  return (
    <button
      type="button"
      onClick={quickToggle}
      aria-label="Toggle theme"
      className="fixed z-50 right-4 bottom-4 h-11 px-4 rounded-full bg-black text-white dark:bg-white dark:text-black"
      style={{
        opacity: mounted ? 1 : 0,
        pointerEvents: mounted ? ("auto" as const) : "none",
      }}
    >
      {mounted ? mode.toUpperCase() : "TOGGLE"}
    </button>
  );
}
