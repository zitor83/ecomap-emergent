import { useState, useEffect } from "react";
import { X, Award, Frame, Crown, ShoppingCart } from "lucide-react";
import userService from "@/api/services/userService";
import type { Reward } from "@/api/types/index";

interface KarmaShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  userKarma: number;
  onPurchaseSuccess: () => void;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Award,
  Frame,
  Crown,
};

const rewardThemeByIcon: Record<string, { owned: string; available: string }> = {
  Award: { owned: "text-themePrimary", available: "text-themeAccent" },
  Frame: { owned: "text-themePrimary", available: "text-themeAccent" },
  Crown: { owned: "text-themePrimary", available: "text-themeAccent" },
};

export default function KarmaShopModal({ isOpen, onClose, userKarma, onPurchaseSuccess }: KarmaShopModalProps) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const loadRewards = async () => {
        try {
          const response = await userService.getRewards();
          setRewards(response.data);
        } catch (error) {
          console.error("Error al cargar recompensas:", error);
        } finally {
          setIsLoading(false);
        }
      };

      void loadRewards();
    }
  }, [isOpen]);

  const handleBuy = async (rewardId: number) => {
    setPurchasing(rewardId);
    try {
      await userService.buyReward(rewardId);
      // Actualizar estado local
      setRewards(prev => prev.map(r => 
        r.id === rewardId ? { ...r, isOwned: true } : r
      ));
      onPurchaseSuccess();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error al comprar la recompensa");
    } finally {
      setPurchasing(null);
    }
  };

  if (!isOpen) return null;

  const IconComponent = (iconName: string) => iconMap[iconName] || Award;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      data-testid="karma-shop-modal"
    >
      <div
        className="bg-themeSurface text-theme rounded-3xl shadow-theme border border-themeBorder w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-themePrimary to-themeSecondary px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingCart size={28} className="text-white" />
              <div>
                <h2 className="text-2xl font-bold">Tienda de Karma</h2>
                <p className="text-sm text-white/85">Canjea tus puntos por recompensas.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
              data-testid="karma-shop-close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Saldo de Karma */}
          <div className="mb-6 p-4 rounded-2xl bg-themeSurfaceSecondary border border-themeBorder">
            <p className="text-sm font-medium text-themeTextSecondary mb-1">Tu saldo actual</p>
            <p className="text-3xl font-bold text-themePrimary">{userKarma} pts Karma</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-themeSurfaceSecondary rounded-2xl h-40" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const Icon = IconComponent(reward.iconName);
                const canAfford = userKarma >= reward.cost;
                const isOwned = reward.isOwned;
                const isPurchasing = purchasing === reward.id;
                const palette = rewardThemeByIcon[reward.iconName] ?? rewardThemeByIcon.Award;

                return (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${
                      isOwned
                        ? "border-themePrimary/50 bg-themeSurfaceSecondary"
                        : "border-themeAccent/60 bg-themeSurface hover:border-themeAccent"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-3 rounded-xl border ${
                            isOwned
                              ? "bg-themePrimary/10 border-themePrimary/20"
                              : "bg-themeAccent/10 border-themeAccent/20"
                          }`}
                        >
                          <Icon
                            size={28}
                            className={isOwned ? palette.owned : palette.available}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-theme mb-1">{reward.name}</h3>
                          <p className="text-sm text-themeTextSecondary mb-2">{reward.description}</p>
                          <p className="text-sm font-bold text-theme">{reward.cost} pts</p>
                        </div>
                      </div>

                      {isOwned ? (
                        <button
                          disabled
                          className="w-full py-2 rounded-full text-white font-semibold text-sm"
                          style={{ backgroundColor: "var(--theme-primary)" }}
                        >
                          ✓ Adquirido
                        </button>
                      ) : !canAfford ? (
                        <button
                          disabled
                          className="w-full py-2 rounded-full bg-themeSurfaceSecondary text-themeTextSecondary font-semibold text-sm cursor-not-allowed border border-themeBorder"
                        >
                          Karma insuficiente
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuy(reward.id)}
                          disabled={isPurchasing}
                          className="w-full py-2 rounded-full text-white font-semibold text-sm transition-colors disabled:opacity-50"
                          style={{ backgroundColor: "var(--theme-primary)" }}
                          data-testid={`buy-reward-${reward.id}`}
                        >
                          {isPurchasing ? "Comprando..." : `Comprar por ${reward.cost} pts`}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
