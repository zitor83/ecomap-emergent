import Footer from "@/components/Footer/Footer";
import { Gift, LogOut, Mail, User, Info, ShoppingBag } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Weal from "@/components/Points/Weal";
import Leaderboard from "@/components/Profile/Leaderboard";
import KarmaShopModal from "@/components/Profile/KarmaShopModal";
import { useAuth } from "@/context/AuthContext";

export default function UserPage() {
  const navigate = useNavigate();
  const { logout, profile, refreshProfile } = useAuth();
  const [showWeal, setShowWeal] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const userData = {
    name: profile ? `${profile.nombre} ${profile.apellidos}` : "Cargando...",
    email: profile ? profile.email : "",
    createDate: profile ? profile.createdAt : new Date().toISOString(),
    karmaPoints: profile ? profile.karmaPoints : 0,
  };

  const memberSince = new Date(userData.createDate).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const initial = userData.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-screen bg-themeBg text-theme" data-testid="user-page">
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-4 gap-5 overflow-y-auto">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-theme"
            style={{ backgroundColor: "var(--theme-primary)" }}
          >
            {initial}
          </div>
          <h1 className="text-2xl font-bold text-theme tracking-tight">
            {userData.name}
          </h1>
          <p className="text-sm text-themeTextSecondary">
            Miembro desde {memberSince}
          </p>
        </div>

        {/* Karma Points Card */}
        <div
          className="w-full rounded-2xl p-5 flex justify-between items-center shadow-theme text-white"
          style={{ backgroundColor: "var(--theme-primary)" }}
        >
          <div>
            <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
              Total Impacto
            </p>
            <p className="text-3xl font-bold tracking-tight">
              {userData.karmaPoints} Karma Points
            </p>
          </div>
        </div>

        {/* Nombre */}
        <div className="w-full bg-themeSurface border border-themeBorder rounded-2xl px-5 py-4 shadow-theme">
          <p className="text-xs font-semibold text-themePrimary uppercase tracking-widest mb-2">
            Nombre De usuario
          </p>
          <div className="flex items-center gap-3 text-theme font-medium">
            <User size={18} className="text-themePrimary opacity-70" />
            {userData.name}
          </div>
        </div>

        {/* Email */}
        <div className="w-full bg-themeSurface border border-themeBorder rounded-2xl px-5 py-4 shadow-theme">
          <p className="text-xs font-semibold text-themePrimary uppercase tracking-widest mb-2">
            Correo Electrónico
          </p>
          <div className="flex items-center gap-3 text-theme font-medium">
            <Mail size={18} className="text-themePrimary opacity-70" />
            {userData.email}
          </div>
        </div>

        {/* Leaderboard */}
        <Leaderboard />

        <button
          onClick={() => setShowWeal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white font-semibold text-base shadow-theme transition-all duration-200 active:scale-95"
          style={{ backgroundColor: "var(--app-orange)" }}
          data-testid="open-wheel-btn"
        >
          <Gift size={18} />
          Girar la ruleta
        </button>

        {/* Tienda de Karma */}
        <button
          onClick={() => setShowShop(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white font-semibold text-base shadow-theme transition-all duration-200 active:scale-95 hover-bg-theme-primary"
          style={{ backgroundColor: "var(--theme-primary)" }}
          data-testid="open-shop-btn"
        >
          <ShoppingBag size={18} />
          Tienda de Karma
        </button>

        {/* Acerca de GoGoMap */}
        <Link
          to="/about"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full border-2 border-themeBorder text-theme font-semibold text-base hover:bg-themeSurfaceSecondary transition-all duration-200"
          data-testid="user-about-link"
        >
          <Info size={18} />
          Acerca de GoGoMap
        </Link>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full border-2 border-red-500 text-red-500 font-semibold text-base hover:bg-red-500 hover:text-white transition-all duration-200 mt-1"
          data-testid="logout-btn"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>

      </div>

      <Footer />

      {showWeal && <Weal onClose={() => setShowWeal(false)} />}
      <KarmaShopModal
        isOpen={showShop}
        onClose={() => setShowShop(false)}
        userKarma={userData.karmaPoints}
        onPurchaseSuccess={refreshProfile}
      />
    </div>
  );
}
