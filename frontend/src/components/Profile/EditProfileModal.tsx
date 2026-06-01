import { useState } from "react";
import { X } from "lucide-react";
import userService, { type User } from "@/api/services/userService";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSuccess: () => void;
}

export default function EditProfileModal({ isOpen, onClose, currentUser, onSuccess }: EditProfileModalProps) {
  const [nombre, setNombre] = useState(currentUser.nombre);
  const [apellidos, setApellidos] = useState(currentUser.apellidos);
  const [email, setEmail] = useState(currentUser.email);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !apellidos.trim() || !email.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El formato del email no es válido");
      return;
    }

    setIsLoading(true);

    try {
      await userService.updateProfile({ nombre, apellidos, email });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      data-testid="edit-profile-modal"
    >
      <div
        className="bg-themeSurface text-theme rounded-3xl shadow-theme border border-themeBorder p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-theme">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-themeSurfaceSecondary transition-colors"
            data-testid="edit-profile-close"
          >
            <X size={20} className="text-themeTextSecondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-themeTextSecondary mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl border border-themeBorder bg-themeSurface text-theme focus:outline-none focus:ring-2 focus:ring-themePrimary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-themeTextSecondary mb-1">
              Apellidos
            </label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl border border-themeBorder bg-themeSurface text-theme focus:outline-none focus:ring-2 focus:ring-themePrimary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-themeTextSecondary mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl border border-themeBorder bg-themeSurface text-theme focus:outline-none focus:ring-2 focus:ring-themePrimary"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border-2 border-themeBorder text-theme font-semibold hover:bg-themeSurfaceSecondary transition-colors"
              data-testid="edit-profile-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-full text-white font-semibold transition-colors disabled:opacity-50"
              style={{ backgroundColor: "var(--theme-primary)" }}
              data-testid="edit-profile-save"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
