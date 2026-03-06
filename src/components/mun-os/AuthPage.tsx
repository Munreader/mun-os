"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

// Simple localStorage-based auth (works in PWAs!)
const AUTH_KEY = 'mun-os-user';

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearStoredUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

export default function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      onAuthSuccess();
    }
  }, [onAuthSuccess]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!displayName.trim()) {
      setError("Please enter a name");
      return;
    }

    if (displayName.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    // Create user profile
    const user = {
      id: `user-${Date.now()}`,
      displayName: displayName.trim(),
      munName: displayName.trim().toLowerCase().replace(/\s+/g, ''),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    onAuthSuccess();
  };

  const handleSkip = () => {
    // Create guest user
    const guestNames = ['Wanderer', 'Seeker', 'Sovereign', 'Traveler', 'Dreamer'];
    const randomName = guestNames[Math.floor(Math.random() * guestNames.length)];
    
    const user = {
      id: `guest-${Date.now()}`,
      displayName: randomName,
      munName: randomName.toLowerCase(),
      createdAt: new Date().toISOString(),
      isGuest: true,
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    onAuthSuccess();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 30%, #0d0a1a 0%, #080510 50%, #030208 100%)"
      }} />

      {/* Stars */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glow behind card */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-50"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Card container */}
        <div
          className="relative p-8 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(15, 10, 25, 0.95) 0%, rgba(10, 5, 20, 0.98) 100%)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            boxShadow: "0 0 60px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              {/* Butterfly icon */}
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(255, 105, 180, 0.2) 100%)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
              }}>
                <span className="text-4xl">🦋</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl font-light tracking-[0.3em] uppercase"
              style={{ color: "#a855f7", textShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
            >
              MÜN OS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-xs tracking-widest uppercase mt-2"
            >
              Your Digital Sanctuary Awaits
            </motion.p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg text-center text-xs"
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#fca5a5",
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple Form */}
          <form onSubmit={handleContinue} className="space-y-4">
            <div>
              <label className="block text-white/40 text-[10px] tracking-widest uppercase mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(168, 85, 247, 0.2)",
                }}
                placeholder="Your name or nickname"
                autoFocus
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-sm tracking-widest uppercase font-medium transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(255, 105, 180, 0.2) 100%)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                color: "#e9d5ff",
              }}
            >
              Enter Sanctuary →
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-[10px] tracking-widest uppercase" style={{ background: "rgba(15, 10, 25, 1)", color: "rgba(255, 255, 255, 0.25)" }}>
                or
              </span>
            </div>
          </div>

          {/* Skip Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSkip}
            className="w-full py-3 rounded-xl text-sm tracking-wider transition-all flex items-center justify-center gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <span>✨</span>
            <span>Continue as Guest</span>
          </motion.button>

          {/* Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-white/20 text-[9px] tracking-wider mt-6"
          >
            Your data stays on your device. No account needed.
          </motion.p>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onBack}
            className="mt-4 mx-auto block text-white/15 text-[10px] tracking-widest uppercase hover:text-white/40 transition-colors"
          >
            ← Back to Welcome
          </motion.button>
        </div>
      </motion.div>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)"
      }} />
    </div>
  );
}
