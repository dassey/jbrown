/** Theme store: applies a theme's CSS variables to <html> and persists the choice. */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_THEME, getTheme, type Theme } from './themes'

function applyVars(theme: Theme) {
  const root = document.documentElement
  for (const [k, v] of Object.entries(theme.vars)) root.style.setProperty(k, v)
  root.style.colorScheme = 'light'
}

interface ThemeState {
  themeId: string
  setTheme: (id: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeId: DEFAULT_THEME,
      setTheme: (id) => {
        applyVars(getTheme(id))
        set({ themeId: id })
      },
    }),
    { name: 'jbrown-theme' },
  ),
)

/** Apply the persisted theme once at startup (call before first render). */
export function initTheme() {
  applyVars(getTheme(useThemeStore.getState().themeId))
}

/** Hook returning the active resolved theme (re-renders on change). */
export function useActiveTheme(): Theme {
  return getTheme(useThemeStore((s) => s.themeId))
}
