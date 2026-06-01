import { Link } from "react-router-dom"
import { Info, Sun, Moon, Flower2 } from "lucide-react"
import { useTheme, type Theme } from "@/context/ThemeContext"

const header =
  "w-full px-4 sm:px-6 py-3 flex items-center justify-between bg-themeSurface text-themeText border-b border-themeBorder shadow-theme transition-colors duration-300"
const logoBase = "flex items-center gap-2 font-bold text-xl"
const logoImg = "h-12 sm:h-14"
const texto = "h-5"

const rightCluster = "flex items-center gap-2 sm:gap-3"
const themeSwitcher =
  "flex items-center gap-1 p-1 rounded-full bg-themeSurfaceSecondary border border-themeBorder"
const themeButtonBase =
  "p-2 rounded-full transition-all duration-200 flex items-center justify-center"
const themeButtonActive = "bg-themePrimary text-white shadow-sm scale-110 ring-2 ring-themePrimary ring-offset-2 ring-offset-themeSurface"
const themeButtonInactive = "text-themeTextSecondary hover:text-themeText hover:bg-themeSurface"
const infoButton =
  "p-2 rounded-full text-themeTextSecondary hover:text-themePrimary hover:bg-themeSurfaceSecondary transition-colors duration-200"

interface ThemeOption {
  value: Theme
  label: string
  Icon: typeof Sun
  testId: string
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Tema claro", Icon: Sun, testId: "theme-light-btn" },
  { value: "dark", label: "Tema oscuro", Icon: Moon, testId: "theme-dark-btn" },
  { value: "malagueno", label: "Tema malagueño", Icon: Flower2, testId: "theme-malagueno-btn" },
]

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className={header} data-testid="app-header">
      {/* Izquierda: Logo */}
      <Link to="/map" className={logoBase} data-testid="header-logo-link">
        <img src="/assets/SoloLogo-removebg.svg" alt="Logo GoGoMap" className={logoImg} />
        <img src="/assets/SoloLetras-removebg.svg" alt="GoGoMap" className={texto} />
      </Link>

      {/* Derecha: Selector de tema + Info */}
      <div className={rightCluster}>
        <div
          role="radiogroup"
          aria-label="Selector de tema"
          className={themeSwitcher}
          data-testid="theme-switcher"
        >
          {themeOptions.map(({ value, label, Icon, testId }) => {
            const isActive = theme === value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={label}
                title={label}
                onClick={() => setTheme(value)}
                className={`${themeButtonBase} ${isActive ? themeButtonActive : themeButtonInactive}`}
                data-testid={testId}
              >
                <Icon size={18} strokeWidth={isActive ? 2.75 : 2.1} />
              </button>
            )
          })}
        </div>

        <Link
          to="/about"
          aria-label="Acerca de GoGoMap"
          title="Acerca de GoGoMap"
          className={infoButton}
          data-testid="header-info-link"
        >
          <Info size={24} />
        </Link>
      </div>
    </header>
  )
}
