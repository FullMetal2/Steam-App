import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../features/auth/useAuth";

export default function Delete() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Es-tu sûr de vouloir supprimé ton compte ? Cette action est irréversible."
    );
    if (!confirmed) return;

    if (!token) {
      setError("Aucun token trouvé, tu dois être connecté.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playtrack/auth/deleteAccount`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || " Erreur lors de la suppression du compte."
        );
      }
      logout();
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Paramètres</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-red-400">Zone dangereuse</h2>
        <p className="text-sm text-slate-400">
          La suppression de ton compte supprimera définitivement toutes tes
          données PlayTrack.
        </p>

        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Suppression en cours..." : "Supprimer mon compte"}
        </button>
      </div>
    </div>
  );
}
