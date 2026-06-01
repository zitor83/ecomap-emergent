import AppRouter from "@/routes/AppRouter"

function App() {
  // El sistema multi-tema (light · dark · malagueño) se gestiona
  // íntegramente desde ThemeContext.tsx (localStorage + prefers-color-scheme).
  return <AppRouter />
}

export default App
