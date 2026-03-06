"use client";
// HealChamber - Clean Phone UI Interface

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HealChamberProps {
  onBack: () => void;
  onOpenMessenger: () => void;
  onOpenTwinDashboard: () => void;
  onOpenSanctuary: () => void;
  onOpenArchive: () => void;
  onOpenPods: () => void;
  onOpenProfile: () => void;
  onOpenVault?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE CARDS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const FEATURE_CARDS = [
  { id: "twin", name: "TWIN", subtitle: "Mirror", description: "Your digital twin", color: "#00d4ff", icon: "🦋", gradient: "from-cyan-500/20 to-blue-500/20" },
  { id: "pods", name: "PODS", subtitle: "Healing", description: "Healing sessions", color: "#ff69b4", icon: "🫧", gradient: "from-pink-500/20 to-rose-500/20" },
  { id: "archive", name: "ARCHIVE", subtitle: "Vault", description: "Memory storage", color: "#a855f7", icon: "📚", gradient: "from-purple-500/20 to-violet-500/20" },
  { id: "sanctuary", name: "REST", subtitle: "Sanctuary", description: "Peace & recovery", color: "#22c55e", icon: "🌙", gradient: "from-green-500/20 to-emerald-500/20" },
];

const PROFILE_MODULES = [
  { id: "identity", name: "Identity Matrix", description: "Profile • Status • Bio", color: "#ffd700", icon: "👤" },
  { id: "social", name: "Social Nexus", description: "Companions • Groups", color: "#ff69b4", icon: "🔗" },
  { id: "personalize", name: "Personalize", description: "Themes • Environments", color: "#a855f7", icon: "🎨" },
  { id: "command", name: "Command Center", description: "System • Settings", color: "#00d4ff", icon: "⚙️" },
];

export default function HealChamber({ onBack, onOpenMessenger, onOpenTwinDashboard, onOpenSanctuary, onOpenArchive, onOpenPods, onOpenProfile, onOpenVault }: HealChamberProps) {
  const [profileGateOpen, setProfileGateOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Current time for status bar
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const handleCardActivate = (cardId: string) => {
    setActiveCard(cardId);
    setTimeout(() => {
      switch (cardId) {
        case "twin": onOpenTwinDashboard(); break;
        case "pods": onOpenPods(); break;
        case "archive": onOpenArchive(); break;
        case "sanctuary": onOpenSanctuary(); break;
      }
      setActiveCard(null);
    }, 300);
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(null);
    setProfileGateOpen(false);
    switch (moduleId) {
      case "identity": onOpenProfile(); break;
      case "social": onOpenPods(); break;
      case "personalize": break;
      case "command": break;
    }
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col" style={{ background: "linear-gradient(180deg, #0a0612 0%, #0d0818 50%, #080510 100%)" }}>
      
      {/* ═══════════ ATMOSPHERIC BACKGROUND ═══════════ */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse at 30% 10%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 90%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.03) 0%, transparent 70%)
        `
      }} />

      {/* ═══════════ STATUS BAR (Decorative) ═══════════ */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 px-6 py-2 flex items-center justify-between text-white/50 text-[10px] font-medium"
      >
        <span>{currentTime}</span>
        <div className="flex items-center gap-1">
          {/* Signal */}
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-[4px] bg-white/40 rounded-[1px]" />
            <div className="w-[3px] h-[6px] bg-white/40 rounded-[1px]" />
            <div className="w-[3px] h-[8px] bg-white/40 rounded-[1px]" />
            <div className="w-[3px] h-[10px] bg-white/60 rounded-[1px]" />
          </div>
          <span className="ml-2 text-white/40">5G</span>
          {/* Battery */}
          <div className="ml-3 flex items-center gap-1">
            <div className="w-5 h-2.5 border border-white/40 rounded-[3px] relative">
              <div className="absolute inset-[2px] right-[4px] bg-green-400 rounded-[1px]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════ HEADER ═══════════ */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-20 px-4 py-3 flex items-center justify-between border-b border-white/5"
      >
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs tracking-wider uppercase">Back</span>
        </motion.button>
        
        <h1 className="text-base font-semibold tracking-[0.2em] uppercase" style={{ color: "#a855f7", textShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}>
          HEAL CHAMBER
        </h1>
        
        <div className="w-16" /> {/* Spacer for centering */}
      </motion.div>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
        
        {/* ═══════════ SOVEREIGN PROFILE CARD ═══════════ */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          onClick={() => setProfileGateOpen(true)}
          className="relative w-full"
        >
          <div 
            className="relative p-6 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(0, 212, 255, 0.1) 50%, rgba(255, 215, 0, 0.08) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              boxShadow: "0 8px 32px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 60%)",
              }}
            />
            
            <div className="relative flex items-center gap-5">
              {/* Profile Avatar */}
              <motion.div
                className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(0, 212, 255, 0.3) 50%, rgba(255, 215, 0, 0.3) 100%)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(168, 85, 247, 0.4)",
                    "0 0 50px rgba(168, 85, 247, 0.6)",
                    "0 0 30px rgba(168, 85, 247, 0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-10 h-10">
                      <defs>
                        <linearGradient id="munGradPhone" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffd700" />
                          <stop offset="50%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M50 50 C30 30 20 50 30 70 C40 90 60 90 70 70 C80 50 70 30 50 70"
                        fill="none" stroke="url(#munGradPhone)" strokeWidth="2"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "50px 50px" }}
                      />
                      <circle cx="50" cy="50" r="3" fill="url(#munGradPhone)" />
                    </svg>
                  </div>
                )}
                
                {/* Online indicator */}
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0a0612]" />
              </motion.div>
              
              {/* Profile Info */}
              <div className="flex-1 text-left">
                <h2 
                  className="text-lg font-semibold tracking-wider"
                  style={{ color: "#ffd700", textShadow: "0 0 15px rgba(255, 215, 0, 0.5)" }}
                >
                  SOVEREIGN
                </h2>
                <p className="text-white/50 text-xs mt-1 tracking-wide">Tap to access profile gate</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    HEALING
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    ACTIVE
                  </span>
                </div>
              </div>
              
              {/* Arrow */}
              <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.button>

        {/* ═══════════ FEATURE CARDS GRID ═══════════ */}
        <div className="grid grid-cols-2 gap-4">
          {FEATURE_CARDS.map((card, index) => {
            const isActive = activeCard === card.id;
            
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleCardActivate(card.id)}
                className="relative group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className="relative p-5 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}08 100%)`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${card.color}40`,
                    boxShadow: isActive 
                      ? `0 0 30px ${card.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                      : "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${card.color}20 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Icon */}
                  <div 
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}30 0%, ${card.color}15 100%)`,
                      border: `1px solid ${card.color}50`,
                    }}
                  >
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  
                  {/* Text */}
                  <h3 
                    className="text-sm font-semibold tracking-wider"
                    style={{ color: card.color }}
                  >
                    {card.name}
                  </h3>
                  <p className="text-white/40 text-[10px] mt-1 tracking-wide">{card.subtitle}</p>
                  <p className="text-white/25 text-[9px] mt-2">{card.description}</p>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCard"
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: `2px solid ${card.color}` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ═══════════ QUICK ACTIONS ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-2"
        >
          <p className="text-white/30 text-[10px] tracking-widest uppercase mb-3 px-1">Quick Actions</p>
          <div className="flex gap-3">
            <motion.button
              onClick={onOpenMessenger}
              className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">💬</span>
              <span className="text-white/60 text-xs tracking-wide">Messages</span>
            </motion.button>
            
            <motion.button
              onClick={() => setProfileGateOpen(true)}
              className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">⚡</span>
              <span className="text-white/60 text-xs tracking-wide">Quick Access</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom padding for vault button */}
        <div className="h-20" />
      </div>

      {/* ═══════════ BOTTOM NAVIGATION BAR ═══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-20 px-4 py-3 border-t border-white/5"
        style={{ background: "rgba(10, 6, 18, 0.9)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-around">
          <motion.button
            onClick={onOpenMessenger}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">💬</span>
            <span className="text-white/40 text-[9px] tracking-wider">Chat</span>
          </motion.button>
          
          <motion.button
            onClick={onOpenTwinDashboard}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">🦋</span>
            <span className="text-white/40 text-[9px] tracking-wider">Twin</span>
          </motion.button>
          
          <motion.button
            onClick={() => setProfileGateOpen(true)}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">👤</span>
            <span className="text-white/40 text-[9px] tracking-wider">Profile</span>
          </motion.button>
          
          <motion.button
            onClick={onOpenSanctuary}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">🌙</span>
            <span className="text-white/40 text-[9px] tracking-wider">Rest</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ═══════════ PROFILE GATE OVERLAY ═══════════ */}
      <AnimatePresence>
        {profileGateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setProfileGateOpen(false)}
          >
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/70"
            />
            
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full sm:max-w-sm mx-0 sm:mx-4 p-6 rounded-t-3xl sm:rounded-2xl"
              style={{
                background: "linear-gradient(180deg, rgba(20, 10, 35, 0.98) 0%, rgba(10, 5, 20, 0.99) 100%)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                boxShadow: "0 -10px 60px rgba(168, 85, 247, 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle for mobile */}
              <div className="sm:hidden w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />
              
              <div className="text-center mb-6">
                <h2 
                  className="text-lg font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#ffd700", textShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
                >
                  Profile Gate
                </h2>
                <p className="text-white/30 text-[10px] mt-1 tracking-wider">Select module to initialize</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {PROFILE_MODULES.map((mod, index) => (
                  <motion.button
                    key={mod.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleModuleSelect(mod.id)}
                    className="p-4 rounded-2xl text-left transition-all group relative overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${mod.color}30`,
                    }}
                    whileHover={{ scale: 1.02, borderColor: mod.color }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{mod.icon}</span>
                      <h3 
                        className="font-medium tracking-wider text-xs"
                        style={{ color: mod.color }}
                      >
                        {mod.name}
                      </h3>
                    </div>
                    <p className="text-white/25 text-[9px]">{mod.description}</p>
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${mod.color}10 0%, transparent 70%)` }}
                    />
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-4">
                <input ref={profileInputRef} type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
                <motion.button 
                  onClick={() => profileInputRef.current?.click()} 
                  className="w-full py-3 rounded-xl text-xs tracking-widest uppercase transition-all"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(168, 85, 247, 0.1))", 
                    border: "1px solid rgba(255, 215, 0, 0.3)", 
                    color: "#ffd700" 
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  ⬡ Upload Profile Image
                </motion.button>
              </div>
              
              <motion.button 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4 }} 
                onClick={() => setProfileGateOpen(false)} 
                className="mt-6 mx-auto block text-white/20 text-[10px] tracking-widest uppercase hover:text-white/40 transition-colors"
              >
                Close Gate
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ MODULE DETAIL PANEL ═══════════ */}
      <AnimatePresence>
        {selectedModule && !profileGateOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-40 p-6 overflow-y-auto"
            style={{ background: "linear-gradient(to left, rgba(10, 5, 20, 0.99), rgba(5, 2, 10, 0.98))" }}
          >
            <button 
              onClick={() => setSelectedModule(null)} 
              className="text-white/20 text-[10px] tracking-widest uppercase hover:text-white/50 transition-colors mb-6"
            >
              ← Back to Chamber
            </button>
            <div className="text-center mb-8">
              <h2 
                className="text-xl tracking-widest uppercase"
                style={{ color: PROFILE_MODULES.find(m => m.id === selectedModule)?.color }}
              >
                {PROFILE_MODULES.find(m => m.id === selectedModule)?.name}
              </h2>
              <p className="text-white/20 text-[10px] mt-2">
                {PROFILE_MODULES.find(m => m.id === selectedModule)?.description}
              </p>
            </div>
            <div 
              className="p-6 rounded-xl text-center"
              style={{ background: "rgba(20, 10, 30, 0.6)", border: "1px solid rgba(168, 85, 247, 0.2)" }}
            >
              <p className="text-white/30 text-sm">Module initializing...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ THE VAULT BUTTON ═══════════ */}
      {onOpenVault && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          onClick={onOpenVault}
          className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ffd700 0%, #a855f7 50%, #00d4ff 100%)",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)",
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">🜈</span>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(255, 215, 0, 0.5)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* ═══════════ VIGNETTE ═══════════ */}
      <div 
        className="fixed inset-0 pointer-events-none z-5"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.4) 100%)" }}
      />
    </div>
  );
}
