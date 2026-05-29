import { createContext, useContext, useState, useEffect } from 'react'
import { THEMES } from '../themes'

const ThemeContext = createContext({ theme: THEMES.default, themeId: 'default', setTheme: () => {} })

const STORAGE_KEY = 'aotax_direction'

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return (saved && THEMES[saved]) ? saved : 'default'
    } catch { return 'default' }
  })

  const theme = THEMES[themeId] ?? THEMES.default

  function setTheme(id) {
    setThemeId(id)
    try { localStorage.setItem(STORAGE_KEY, id) } catch {}
  }

  useEffect(() => {
    document.body.style.fontFamily = theme.fontBody
    // Grain texture overlay (Loft direction)
    if (theme.pageGrain) {
      document.documentElement.classList.add('loft-grain')
    } else {
      document.documentElement.classList.remove('loft-grain')
    }
    // Direction class for motion defaults
    document.documentElement.classList.toggle('loft-page', themeId === 'loft')
  }, [theme.fontBody, theme.pageGrain, themeId])

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
