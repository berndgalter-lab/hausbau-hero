"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EmailCapture({ rechnerSlug }: { rechnerSlug: string }) {
  const [email, setEmail] = useState("");
  const [gesendet, setGesendet] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setFehler(null);
    setLoading(true);

    try {
      const { error } = await supabase.from("email_captures").insert({
        email,
        rechner_slug: rechnerSlug,
      });

      if (error) {
        console.error("[EmailCapture] Insert error:", error.message);
        setFehler("Speichern fehlgeschlagen. Bitte versuche es erneut.");
        setLoading(false);
        return;
      }
      setGesendet(true);
    } catch (e) {
      console.error("[EmailCapture] Submit error:", e);
      setFehler("Verbindungsfehler. Bitte versuche es erneut.");
    }
    setLoading(false);
  }

  if (gesendet) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center">
        <div className="text-green-800 font-semibold mb-1">PDF wird vorbereitet! 📧</div>
        <div className="text-sm text-green-700">
          Du erhältst deine Materialliste in Kürze per E-Mail.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-bold mb-1">📧 Materialliste als PDF</h3>
      <p className="text-sm text-stone-600 mb-4">
        Erhalte deine berechnete Materialliste als PDF per E-Mail — kostenlos.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-stone-300 rounded-lg px-4 py-2 text-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {loading ? "Sende..." : "PDF senden"}
        </button>
      </form>
      {fehler && <p className="text-red-600 text-sm mt-2">{fehler}</p>}
      <p className="text-xs text-stone-400 mt-2">Kein Spam. Du kannst dich jederzeit abmelden.</p>
    </div>
  );
}
