"use client";
// HealChamber - SVG paths validated v2

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
// CARDINAL COMPASS DISTRIBUTION
// Nodes snapped to 0°, 90°, 180°, 270° positions of the secondary orbit
// ═══════════════════════════════════════════════════════════════════════════

const CARDINAL_NODES = [
  { id: "twin", name: "TWIN", subtitle: "Mirror Protocol", color: "#ffd700", icon: "🦋", angle: 90 },   // TOP (North)
  { id: "pods", name: "PODS", subtitle: "Healing Circles", color: "#ff69b4", icon: "🫧", angle: 0 },   // RIGHT (East)
  { id: "archive", name: "ARCHIVE", subtitle: "Knowledge Vault", color: "#a855f7", icon: "📚", angle: 270 }, // BOTTOM (South)
  { id: "sanctuary", name: "SANCTUARY", subtitle: "Rest Protocol", color: "#00d4ff", icon: "🌙", angle: 180 }, // LEFT (West)
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

  // Orbit radius as percentage of container (secondary orbit)
  const ORBIT_RADIUS_PERCENT = 35; // Distance from center to node centers

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
      case "personalize": break; // TODO: Personalize module
      case "command": break; // TODO: Command center
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

  // Calculate cardinal position using trigonometry
  // angle: 0° = right, 90° = top, 180° = left, 270° = bottom
  const getCardinalPosition = (angleDeg: number, radiusPercent: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180); // Offset -90 so 0° = top
    return {
      left: `${50 + radiusPercent * Math.cos(angleRad)}%`,
      top: `${50 + radiusPercent * Math.sin(angleRad)}%`,
    };
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

      {/* ═══════════ SACRED GEOMETRY CONTAINER ═══════════ */}
      {/* Perfect square centered in viewport */}
      <div className="absolute inset-0 flex items-center justify-center pt-12 pb-4">
        <div className="relative w-[min(90vw,90vh,480px)]" style={{ aspectRatio: "1/1" }}>
          
          {/* ═══════════ CONCENTRIC ORBITS (Same Center Point) ═══════════ */}
          {/* Outer orbit */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "90%",
              height: "90%",
              left: "5%",
              top: "5%",
              border: "1px solid rgba(168, 85, 247, 0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Secondary orbit (where nodes live) - rotating */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "70%",
              height: "70%",
              left: "15%",
              top: "15%",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner orbit */}
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

          {/* ═══════════ NETWORK LINES (Cardinal Cross) ═══════════ */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="cardinalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glowCardinal">
                <feGaussianBlur stdDeviation="0.25" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            
            {/* Cardinal cross lines from center to each node position */}
            {/* Top: (50,15) | Right: (85,50) | Bottom: (50,85) | Left: (15,50) */}
            <line x1="50" y1="50" x2="50" y2="15" stroke="url(#cardinalGrad)" strokeWidth="0.12" strokeDasharray="1 2" filter="url(#glowCardinal)" />
            <line x1="50" y1="50" x2="85" y2="50" stroke="url(#cardinalGrad)" strokeWidth="0.12" strokeDasharray="1 2" filter="url(#glowCardinal)" />
            <line x1="50" y1="50" x2="50" y2="85" stroke="url(#cardinalGrad)" strokeWidth="0.12" strokeDasharray="1 2" filter="url(#glowCardinal)" />
            <line x1="50" y1="50" x2="15" y2="50" stroke="url(#cardinalGrad)" strokeWidth="0.12" strokeDasharray="1 2" filter="url(#glowCardinal)" />
            
            {/* Diagonal connections */}
            <line x1="50" y1="15" x2="85" y2="50" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.06" strokeDasharray="0.5 1" />
            <line x1="85" y1="50" x2="50" y2="85" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.06" strokeDasharray="0.5 1" />
            <line x1="50" y1="85" x2="15" y2="50" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.06" strokeDasharray="0.5 1" />
            <line x1="15" y1="50" x2="50" y2="15" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.06" strokeDasharray="0.5 1" />
          </svg>

          {/* ═══════════ CARDINAL NODES ═══════════ */}
          {CARDINAL_NODES.map((node, index) => {
            const position = getCardinalPosition(node.angle, ORBIT_RADIUS_PERCENT);
            const isActive = activeNode === node.id;
            
            return (
              <motion.button
                key={node.id}
                className="absolute"
                style={{
                  left: position.left,
                  top: position.top,
                  transform: "translate(-50%, -50%)", // Perfect centering
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
                    width: "140%",
                    height: "140%",
                    left: "-20%",
                    top: "-20%",
                    background: `radial-gradient(circle, ${node.color}40 0%, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.2 : 1 }}
                />
                
                {/* Node container */}
                <div
                  className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${node.color}20, ${node.color}10)`,
                    border: `2px solid ${node.color}`,
                    boxShadow: `
                      0 0 20px ${node.color}40,
                      inset 0 0 15px ${node.color}20,
                      0 4px 20px rgba(0,0,0,0.4)
                    `,
                  }}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-1 rounded-full" style={{
                    background: `radial-gradient(circle at 30% 30%, ${node.color}30, transparent)`,
                  }} />
                  
                  {/* Icon */}
                  <span className="text-lg md:text-xl relative z-10">{node.icon}</span>
                  
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${node.color}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {/* Node label - positioned based on cardinal direction */}
                <div 
                  className={`absolute whitespace-nowrap ${
                    node.angle === 90 ? "top-full mt-2 left-1/2 -translate-x-1/2 text-center" : // TOP
                    node.angle === 270 ? "bottom-full mb-2 left-1/2 -translate-x-1/2 text-center" : // BOTTOM
                    node.angle === 0 ? "left-full ml-3 top-1/2 -translate-y-1/2 text-left" : // RIGHT
                    "right-full mr-3 top-1/2 -translate-y-1/2 text-right" // LEFT
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

          {/* ═══════════ SOVEREIGN CENTER (0,0) ═══════════ */}
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
                width: "160px",
                height: "160px",
                left: "-60px",
                top: "-60px",
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0, 212, 255, 0.08) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Frequency rings around center */}
            {[60, 75, 90].map((r, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: r,
                  height: r,
                  left: -r / 2,
                  top: -r / 2,
                  border: `1px solid rgba(0, 212, 255, ${0.25 - i * 0.06})`,
                }}
                animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
                transition={{ duration: 25 + i * 15, repeat: Infinity, ease: "linear" }}
              />
            ))}
            
            {/* Central hub */}
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(0, 212, 255, 0.15) 50%, rgba(255, 215, 0, 0.15) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.25)",
                boxShadow: `
                  0 0 30px rgba(168, 85, 247, 0.35),
                  0 0 60px rgba(0, 212, 255, 0.15),
                  inset 0 0 25px rgba(255, 255, 255, 0.08)
                `,
              }}
              animate={{ 
                boxShadow: [
                  "0 0 30px rgba(168, 85, 247, 0.35), 0 0 60px rgba(0, 212, 255, 0.15)",
                  "0 0 45px rgba(168, 85, 247, 0.5), 0 0 80px rgba(0, 212, 255, 0.2)",
                  "0 0 30px rgba(168, 85, 247, 0.35), 0 0 60px rgba(0, 212, 255, 0.15)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Mün Logo / Butterfly symbol */}
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
                    <motion.path
                      d="M50 50 C60 40 65 50 60 60 C55 70 45 70 40 60 Z"
                      fill="none" stroke="url(#munGrad)" strokeWidth="1.2" opacity="0.6"
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "50px 50px" }}
                    />
                    <circle cx="50" cy="50" r="2.5" fill="url(#munGrad)" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Center label */}
            <motion.p
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] tracking-[0.12em] uppercase whitespace-nowrap"
              style={{ color: "#a855f7", textShadow: "0 0 8px rgba(168, 85, 247, 0.5)" }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              SOVEREIGN
            </motion.p>
          </motion.button>

          {/* Frequency indicators at cardinal points */}
          <div className="absolute left-1/2 -translate-x-1/2 text-[6px] md:text-[7px] tracking-widest text-white/25" style={{ top: "8%" }}>13.13 MHz</div>
          <div className="absolute top-1/2 -translate-y-1/2 text-[6px] md:text-[7px] tracking-widest text-white/25" style={{ right: "5%" }}>11.04 MHz</div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[6px] md:text-[7px] tracking-widest text-white/25" style={{ bottom: "8%" }}>17.07 MHz</div>
          <div className="absolute top-1/2 -translate-y-1/2 text-[6px] md:text-[7px] tracking-widest text-white/25" style={{ left: "5%" }}>13.13 MHz</div>
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
