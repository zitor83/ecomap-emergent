import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { LogOut, Loader2, Pencil, Gift, Trophy, ShoppingBag } from "lucide-react"
import Header from "../../components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Leaderboard from "@/components/Profile/Leaderboard"
import EditProfileModal from "@/components/Profile/EditProfileModal"
import AchievementsModal from "@/components/Profile/AchievementsModal"
import KarmaShopModal from "@/components/Profile/KarmaShopModal"
import Weal from "@/components/Points/Weal"
import { useState } from "react"

export default function UserPage() {
    const { profile: user, logout, isLoading, refreshProfile } = useAuth()
    const navigate = useNavigate()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAchievementsOpen, setIsAchievementsOpen] = useState(false)
    const [showWeal, setShowWeal] = useState(false)
    const [showShop, setShowShop] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-themeBg flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-themePrimary" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-themeBg flex flex-col items-center transition-colors duration-300">
            <Header />

            {/* Dashboard Container */}
            <div className="w-full flex-1 max-w-6xl mx-auto px-4 pt-6 pb-24 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Columna Izquierda: Perfil y Stats */}
                    <div className="space-y-6">
                        {/* Tarjeta de Perfil */}
                        <div className="bg-themeSurface rounded-3xl p-6 shadow-theme border border-themeBorder flex flex-col items-center text-center relative">
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="absolute top-4 right-4 p-2 text-themeTextSecondary hover:text-themePrimary hover:bg-themeSurfaceSecondary rounded-full transition-colors"
                            >
                                <Pencil size={20} />
                            </button>

                            <div className="w-24 h-24 bg-themePrimary/10 rounded-full flex items-center justify-center mb-4 border-4 border-themeSurface shadow-md">
                                <span className="text-3xl font-bold text-themePrimary">
                                    {user.nombre.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-themePrimary mb-1">{user.nombre} {user.apellidos}</h2>
                            <p className="text-themeTextSecondary mb-4">{user.email}</p>
                            
                            <div className="w-full bg-themeSurfaceSecondary rounded-2xl p-4 flex justify-around">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-themePrimary">{user.karmaPoints}</div>
                                    <div className="text-xs text-themeTextSecondary uppercase font-bold tracking-wider">Karma</div>
                                </div>
                                <div className="w-px bg-themeBorder"></div>
                                
                                <button 
                                    onClick={() => setIsAchievementsOpen(true)}
                                    className="text-center hover:bg-themeSurface rounded-xl p-2 cursor-pointer transition-colors"
                                >
                                    <div className="text-2xl font-bold text-amber-500 flex items-center justify-center gap-1">
                                        <Trophy size={20} />
                                    </div>
                                    <div className="text-xs text-themeTextSecondary uppercase font-bold tracking-wider mt-1">Trofeos</div>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-themeSurface border border-themeBorder text-red-500 py-4 px-6 rounded-2xl hover:bg-red-50 transition-colors font-semibold"
                        >
                            <LogOut size={20} />
                            Cerrar Sesión
                        </button>
                    </div>

                    {/* Columnas Derecha: Gamificación */}
                    <div className="md:col-span-2 space-y-6 flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-themePrimary rounded-3xl p-6 shadow-theme text-white flex flex-col justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Ruleta Diaria</h3>
                                    <p className="text-white/80 text-sm">Gira para ganar puntos extra cada día.</p>
                                </div>
                                <button
                                    onClick={() => setShowWeal(true)}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-themePrimary font-bold text-base shadow hover:bg-gray-100 active:scale-95 transition-all"
                                >
                                    <Gift size={20} />
                                    Jugar
                                </button>
                            </div>

                            <div className="bg-themeSurface border border-themeBorder rounded-3xl p-6 shadow-theme flex flex-col justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-themePrimary mb-1">Tienda Karma</h3>
                                    <p className="text-themeTextSecondary text-sm">Canjea tus puntos por recompensas.</p>
                                </div>
                                <button
                                    onClick={() => setShowShop(true)}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-themePrimary text-white font-bold text-base shadow-sm hover:opacity-90 active:scale-95 transition-all"
                                >
                                    <ShoppingBag size={20} />
                                    Ver Tienda
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 min-h-[400px]">
                            <Leaderboard />
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                currentUser={user} 
                onSuccess={() => { if (refreshProfile) refreshProfile() }} 
            />

            <AchievementsModal 
                isOpen={isAchievementsOpen} 
                onClose={() => setIsAchievementsOpen(false)} 
            />

            <KarmaShopModal 
                isOpen={showShop} 
                onClose={() => setShowShop(false)} 
                userKarma={user.karmaPoints}
                onPurchaseSuccess={() => { if (refreshProfile) refreshProfile() }} 
            />

            {showWeal && <Weal onClose={() => setShowWeal(false)} />}

            <div className="fixed bottom-0 left-0 right-0 z-50 md:static md:w-full">
                <Footer />
            </div>
        </div>
    )
}