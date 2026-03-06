"use client";
// HealChamber - Clean orbital system v3

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
// ORBITAL NODE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const ORBITAL_NODES = [
  { id: "twin", name: "TWIN", subtitle: "Mirror", color: "#00d4ff", icon: "🦋", position: "top" },
  { id: "pods", name: "PODS", subtitle: "Healing", color: "#ff69b4", icon: "🫧", position: "right" },
  { id: "archive", name: "ARCHIVE", subtitle: "Vault", color: "#a855f7", icon: "📚", position: "bottom" },
  { id: "sanctuary", name: "REST", subtitle: "Sanctuary", color: "#22c55e", icon: "🌙", position: "left" },
];

const PROFILE_MODULES = [
  { id: "identity", name: "Identity Matrix", description: "Profile • Status • Bio", color: "#ffd700" },
  { id: "social", name: "Social Nexus", description: "Companions • Groups", color: "#ff69b4" },
  { id: "personalize", name: "Personalize", description: "Themes • Environments", color: "#a855f7" },
  { id: "command", name: "Command Center", description: "System • Settings", color: "#00d4ff" },
];

export default function HealChamber({ onBack, onOpenMessenger, onOpenTwinDashboard, onOpenSanctuary, onOpenArchive, onOpenPods, onOpenProfile, onOpenVault }: HealChamberProps) {
  const [profileGateOpen, setProfileGateOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleNodeActivate = (nodeId: string) => {
    setActiveNode(nodeId);
    setTimeout(() => {
      switch (nodeId) {
        case "twin": onOpenTwinDashboard(); break;
        case "pods": onOpenPods(); break;
        case "archive": onOpenArchive(); break;
        case "sanctuary": onOpenSanctuary(); break;
      }
      setActiveNode(null);
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

  // Node positions - placed directly on the orbit ring (35% radius from center)
  // Ring is 70% diameter, so edge is at 15% from edge of container
  const nodePositions: Record<string, { left: string; top: string }> = {
    top: { left: "50%", top: "15%" },
    right: { left: "85%", top: "50%" },
    bottom: { left: "50%", top: "85%" },
    left: { left: "15%", top: "50%" },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ═══════════ DEEP VOID BACKGROUND ═══════════ */}
      <div className="absolute inset-0" style={{ 
        background: "radial-gradient(ellipse at 50% 50%, #0d0a1a 0%, #080510 50%, #030208 100%)" 
      }} />
      
      {/* Atmospheric nebula */}
      <div className="absolute inset-0 opacity-30" style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 60%)
        `
      }} />

      {/* ═══════════ HEADER ═══════════ */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="absolute top-4 md:top-6 left-0 right-0 text-center z-20"
      >
        <h1 className="text-lg md:text-2xl font-light tracking-[0.4em] uppercase" 
          style={{ color: "#a855f7", textShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}>
          HEAL CHAMBER
        </h1>
        <p className="text-white/20 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-1">Sovereign Restoration Interface</p>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onBack} 
        className="absolute top-4 md:top-6 left-4 md:left-6 z-20 text-white/25 text-[9px] md:text-[10px] tracking-widest uppercase hover:text-white/50 transition-colors"
      >
        ← Return
      </motion.button>

      {/* ═══════════ ORBITAL SYSTEM - FIXED CENTER ═══════════ */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <div 
          className="relative pointer-events-auto"
          style={{ 
            width: "min(80vw, 80vh, 400px)", 
            height: "min(80vw, 80vh, 400px)",
          }}
        >
          
          {/* ═══════════ CONCENTRIC ORBIT RINGS ═══════════ */}
          {/* Outer ring - 90% diameter */}
          <div
            className="absolute rounded-full"
            style={{
              width: "90%",
              height: "90%",
              left: "5%",
              top: "5%",
              border: "1px solid rgba(168, 85, 247, 0.2)",
            }}
          />
          
          {/* Main orbit ring - 70% diameter - THIS IS WHERE NODES SIT */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "70%",
              height: "70%",
              left: "15%",
              top: "15%",
              border: "1px solid rgba(0, 212, 255, 0.25)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner ring - 45% diameter */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "45%",
              height: "45%",
              left: "27.5%",
              top: "27.5%",
              border: "1px solid rgba(255, 215, 0, 0.12)",
            }}
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />

          {/* ═══════════ NETWORK LINES ═══════════ */}
          <svg 
            viewBox="0 0 100 100" 
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Lines from center (50,50) to orbit ring edge (35% radius = 15 or 85 in viewBox) */}
            <line x1="50" y1="50" x2="50" y2="15" stroke="url(#lineGrad)" strokeWidth="0.15" strokeDasharray="1 2" />
            <line x1="50" y1="50" x2="85" y2="50" stroke="url(#lineGrad)" strokeWidth="0.15" strokeDasharray="1 2" />
            <line x1="50" y1="50" x2="50" y2="85" stroke="url(#lineGrad)" strokeWidth="0.15" strokeDasharray="1 2" />
            <line x1="50" y1="50" x2="15" y2="50" stroke="url(#lineGrad)" strokeWidth="0.15" strokeDasharray="1 2" />
            
            {/* Diagonal connections around the ring */}
            <line x1="50" y1="15" x2="85" y2="50" stroke="rgba(0, 212, 255, 0.08)" strokeWidth="0.08" />
            <line x1="85" y1="50" x2="50" y2="85" stroke="rgba(0, 212, 255, 0.08)" strokeWidth="0.08" />
            <line x1="50" y1="85" x2="15" y2="50" stroke="rgba(0, 212, 255, 0.08)" strokeWidth="0.08" />
            <line x1="15" y1="50" x2="50" y2="15" stroke="rgba(0, 212, 255, 0.08)" strokeWidth="0.08" />
          </svg>

          {/* ═══════════ SOVEREIGN CENTER NODE ═══════════ */}
          <motion.button
            className="absolute cursor-pointer"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            onClick={() => setProfileGateOpen(true)}
          >
            {/* Outer aura */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "140px",
                height: "140px",
                left: "-70px",
                top: "-70px",
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0, 212, 255, 0.08) 50%, transparent 70%)",
                filter: "blur(15px)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Frequency rings */}
            {[50, 65, 80].map((r, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: r,
                  height: r,
                  left: -r / 2,
                  top: -r / 2,
                  border: `1px solid rgba(0, 212, 255, ${0.2 - i * 0.05})`,
                }}
                animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
              />
            ))}
            
            {/* Central hub */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(0, 212, 255, 0.2) 50%, rgba(255, 215, 0, 0.2) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                boxShadow: `
                  0 0 30px rgba(168, 85, 247, 0.4),
                  0 0 60px rgba(0, 212, 255, 0.2),
                  inset 0 0 20px rgba(255, 255, 255, 0.1)
                `,
              }}
              animate={{ 
                boxShadow: [
                  "0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)",
                  "0 0 50px rgba(168, 85, 247, 0.6), 0 0 80px rgba(0, 212, 255, 0.3)",
                  "0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12">
                    <defs>
                      <linearGradient id="munGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M50 50 C30 30 20 50 30 70 C40 90 60 90 70 70 C80 50 70 30 50 70"
                      fill="none" stroke="url(#munGrad)" strokeWidth="2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "50px 50px" }}
                    />
                    <circle cx="50" cy="50" r="3" fill="url(#munGrad)" />
                  </svg>
                </div>
              )}
            </motion.div>
            
            {/* Center label */}
            <motion.p
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] tracking-[0.15em] uppercase whitespace-nowrap font-medium"
              style={{ color: "#ffd700", textShadow: "0 0 10px rgba(255, 215, 0, 0.6)" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SOVEREIGN
            </motion.p>
          </motion.button>

          {/* ═══════════ ORBITAL NODES ═══════════ */}
          {ORBITAL_NODES.map((node, index) => {
            const pos = nodePositions[node.position];
            const isActive = activeNode === node.id;
            
            return (
              <motion.button
                key={node.id}
                className="absolute"
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                onClick={() => handleNodeActivate(node.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Node glow */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: "150%",
                    height: "150%",
                    left: "-25%",
                    top: "-25%",
                    background: `radial-gradient(circle, ${node.color}50 0%, transparent 70%)`,
                    filter: "blur(6px)",
                  }}
                  animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1.3 : 1 }}
                />
                
                {/* Node container */}
                <div
                  className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${node.color}25, ${node.color}10)`,
                    border: `2px solid ${node.color}`,
                    boxShadow: `
                      0 0 20px ${node.color}50,
                      inset 0 0 12px ${node.color}20
                    `,
                  }}
                >
                  <span className="text-lg md:text-xl relative z-10">{node.icon}</span>
                  
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${node.color}60` }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {/* Node label */}
                <div 
                  className={`absolute whitespace-nowrap ${
                    node.position === "top" ? "top-full mt-2 left-1/2 -translate-x-1/2 text-center" :
                    node.position === "bottom" ? "bottom-full mb-2 left-1/2 -translate-x-1/2 text-center" :
                    node.position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2 text-left" :
                    "right-full mr-2 top-1/2 -translate-y-1/2 text-right"
                  }`}
                >
                  <p className="text-[9px] md:text-[10px] tracking-widest font-medium" style={{ color: node.color }}>
                    {node.name}
                  </p>
                  <p className="text-[7px] md:text-[8px] text-white/30 tracking-wider">{node.subtitle}</p>
                </div>
              </motion.button>
            );
          })}

          {/* Frequency labels */}
          <div className="absolute left-1/2 -translate-x-1/2 text-[6px] tracking-widest text-white/20" style={{ top: "3%" }}>13.13 MHz</div>
          <div className="absolute top-1/2 -translate-y-1/2 text-[6px] tracking-widest text-white/20" style={{ right: "3%" }}>11.04 MHz</div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[6px] tracking-widest text-white/20" style={{ bottom: "3%" }}>17.07 MHz</div>
          <div className="absolute top-1/2 -translate-y-1/2 text-[6px] tracking-widest text-white/20" style={{ left: "3%" }}>13.13 MHz</div>
        </div>
      </div>

      {/* ═══════════ PROFILE GATE OVERLAY ═══════════ */}
      <AnimatePresence>
        {profileGateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setProfileGateOpen(false)}
          >
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(15px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/80"
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-sm mx-4 p-6 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(20, 10, 35, 0.95), rgba(10, 5, 20, 0.98))",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                boxShadow: "0 0 60px rgba(168, 85, 247, 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-lg tracking-[0.3em] uppercase" style={{ color: "#ffd700", textShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}>
                  Sovereign Profile Gate
                </h2>
                <p className="text-white/20 text-[10px] mt-1 tracking-wider">Select module to initialize</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {PROFILE_MODULES.map((mod, index) => (
                  <motion.button
                    key={mod.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleModuleSelect(mod.id)}
                    className="p-4 rounded-xl text-left transition-all group relative overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${mod.color}30`,
                    }}
                    whileHover={{ scale: 1.02, borderColor: mod.color }}
                  >
                    <h3 className="font-medium tracking-wider text-xs" style={{ color: mod.color }}>{mod.name}</h3>
                    <p className="text-white/20 text-[9px] mt-1">{mod.description}</p>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `radial-gradient(circle, ${mod.color}10 0%, transparent 70%)` }} />
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-4">
                <input ref={profileInputRef} type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
                <button 
                  onClick={() => profileInputRef.current?.click()} 
                  className="w-full py-3 rounded-xl text-xs tracking-widest uppercase transition-all hover:opacity-80"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(168, 85, 247, 0.1))", 
                    border: "1px solid rgba(255, 215, 0, 0.3)", 
                    color: "#ffd700" 
                  }}
                >
                  ⬡ Upload Profile Image
                </button>
              </div>
              
              <motion.button 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4 }} 
                onClick={() => setProfileGateOpen(false)} 
                className="mt-6 mx-auto block text-white/15 text-[10px] tracking-widest uppercase hover:text-white/40 transition-colors"
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
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-40 p-6 overflow-y-auto"
            style={{ background: "linear-gradient(to left, rgba(10, 5, 20, 0.98), rgba(5, 2, 10, 0.95))" }}
          >
            <button onClick={() => setSelectedModule(null)} className="text-white/20 text-[10px] tracking-widest uppercase hover:text-white/50 transition-colors mb-6">
              ← Back to Chamber
            </button>
            <div className="text-center mb-8">
              <h2 className="text-xl tracking-widest uppercase" style={{ color: PROFILE_MODULES.find(m => m.id === selectedModule)?.color }}>
                {PROFILE_MODULES.find(m => m.id === selectedModule)?.name}
              </h2>
              <p className="text-white/20 text-[10px] mt-2">{PROFILE_MODULES.find(m => m.id === selectedModule)?.description}</p>
            </div>
            <div className="p-6 rounded-xl text-center" style={{ background: "rgba(20, 10, 30, 0.6)", border: "1px solid rgba(168, 85, 247, 0.2)" }}>
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
          transition={{ delay: 1.5, type: "spring" }}
          onClick={onOpenVault}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
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
            style={{
              border: "2px solid rgba(255, 215, 0, 0.5)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* ═══════════ VIGNETTE ═══════════ */}
      <div className="fixed inset-0 pointer-events-none z-5" style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.55) 100%)" }} />
    </div>
  );
}
