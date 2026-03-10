type Theme = "light" | "dark";

const storageKey = "opc_theme";

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
};

const readStoredTheme = (): Theme | null => {
  try {
    const v = localStorage.getItem(storageKey);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};

const applyThemeClass = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export default defineNuxtPlugin(() => {
  const theme = useState<Theme>("opc_theme", () => "dark");

  if (import.meta.client) {
    const initial = readStoredTheme() ?? getPreferredTheme();
    theme.value = initial;
    applyThemeClass(initial);

    watch(
      theme,
      (t) => {
        applyThemeClass(t);
        try {
          localStorage.setItem(storageKey, t);
        } catch {
          // ignore
        }
      },
      { flush: "post" }
    );
  }

  return { provide: { theme } };
});

