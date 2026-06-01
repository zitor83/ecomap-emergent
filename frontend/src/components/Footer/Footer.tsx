import { NavLink, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const publicRoutes = ["/", "/login", "/register", "/error", "/about"];

  if (publicRoutes.includes(location.pathname) || location.pathname.startsWith("/error")) {
    return null;
  }

  return (
<<<<<<< HEAD
    <footer className="bg-themeSurface border-t border-themeBorder" data-testid="app-footer">
=======
    <footer className="bg-app-bg border-t">
>>>>>>> develop
      <div className="max-w-screen-xl mx-auto flex justify-around p-4">
        <NavLink to="/map" data-testid="footer-map-link">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200">
              <img
                src="/assets/icons/mapa.svg"
                alt="Mapa"
                className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              />
              <span
                className={`text-xs transition-all duration-200 ${
                  isActive ? "text-themePrimary font-bold" : "text-themeTextSecondary font-medium"
                }`}
              >
                Mapa
              </span>
            </div>
          )}
        </NavLink>

        <NavLink to="/favorites" data-testid="footer-favorites-link">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200">
              <img
                src="/assets/icons/favoritos.svg"
                alt="Favoritos"
                className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              />
              <span
                className={`text-xs transition-all duration-200 ${
                  isActive ? "text-themePrimary font-bold" : "text-themeTextSecondary font-medium"
                }`}
              >
                Favoritos
              </span>
            </div>
          )}
        </NavLink>

        <NavLink to="/user" data-testid="footer-user-link">
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200">
              <img
                src="/assets/icons/perfil.svg"
                alt="Perfil"
                className={`h-8 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              />
              <span
                className={`text-xs transition-all duration-200 ${
                  isActive ? "text-themePrimary font-bold" : "text-themeTextSecondary font-medium"
                }`}
              >
                Perfil
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </footer>
  );
}