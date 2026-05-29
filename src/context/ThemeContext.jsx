import { createContext, useContext, useState, useEffect } from 'react'
import { THEMES } from '../themes'

const ThemeContext = createContext({ theme: THEMES.default, themeId: 'default', setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('default')
  const theme = THEMES[themeId] ?? THEMES.default

  useEffect(() => {
    document.body.style.fontFamily = theme.fontBody
  }, [theme.fontBody])

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
