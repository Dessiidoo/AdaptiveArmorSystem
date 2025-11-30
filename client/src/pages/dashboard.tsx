import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Ear, 
  Activity, 
  Wifi, 
  Battery, 
  Target, 
  Wind, 
  Zap, 
  Ghost,
  Mic,
  Waves,
  Settings,
  Power
} from "lucide-react";
import { TacticalFrame, StatBar } from "@/components/tactical/frame";
import helmetImage from "@assets/generated_images/futuristic_tactical_helmet_schematic.png";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMode, setActiveMode] = useState<"stealth" | "combat" | "recon">("combat");
  
  // Simulated Data States
  const [integrity, setIntegrity] = useState(98);
  const [battery, setBattery] = useState(87);
  const [noiseLevel, setNoiseLevel] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simulate noise fluctuations
    const noiseTimer = setInterval(() => {
      setNoiseLevel(prev => Math.max(10, Math.min(90, prev + (Math.random() * 20 - 10))));
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(noiseTimer);
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 font-sans overflow-hidden relative flex flex-col">
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-20" />

      {/* HEADER */}
      <header className="flex justify-between items-end border-b border-border/50 pb-4 mb-6 relative z-10">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tighter text-primary uppercase text-glow">
            AEGIS <span className="text-muted-foreground text-2xl">OS v2.4</span>
          </h1>
          <div className="text-xs font-mono text-muted-foreground tracking-[0.2em]">
            ADAPTIVE ENHANCED GUARDIAN INTERFACE SYSTEM
          </div>
        </div>
        
        <div className="flex items-center gap-8 font-mono text-sm">
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground text-[10px] uppercase">Operator Status</span>
            <span className="text-emerald-400 flex items-center gap-2">
              <Activity className="w-3 h-3 animate-pulse" /> VITAL SIGNS NORMAL
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground text-[10px] uppercase">Network</span>
            <span className="text-primary flex items-center gap-2">
              <Wifi className="w-3 h-3" /> SECURE LINK EST
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold leading-none">
              {currentTime.toLocaleTimeString([], { hour12: false })}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 relative z-10">
        
        {/* LEFT COLUMN - SENSORS & ENVIRONMENT */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          <TacticalFrame title="Environment Analysis" className="flex-1" corner="tr">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Waves className="text-primary w-5 h-5" />
                  <span className="font-mono text-sm">Acoustic Dampening</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_cyan]" />
              </div>
              
              {/* Sound Wave Visualization (Mock) */}
              <div className="h-24 flex items-end justify-between gap-1 p-2 border-b border-border/30">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-primary/50"
                    animate={{ height: `${Math.max(10, Math.random() * noiseLevel)}%` }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block">Ext. Noise</span>
                  <span className="text-lg">{Math.floor(noiseLevel)} dB</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Reduction</span>
                  <span className="text-lg text-emerald-400">-18 dB</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase text-muted-foreground">Silicone Ear Seals</span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">ENGAGED</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Environmental protection active. Thermal regulation normal.
                </p>
              </div>
            </div>
          </TacticalFrame>

          <TacticalFrame title="Vision Systems" className="h-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="text-amber-400 w-5 h-5" />
                <span className="font-mono text-sm">Optics Array</span>
              </div>
              
              <StatBar label="Auto-Tint Opacity" value={35} color="bg-amber-400" />
              <StatBar label="Prescription Focus" value={100} color="bg-emerald-400" />
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="text-[10px] border border-primary/30 hover:bg-primary/10 p-2 text-left transition-colors group">
                  <div className="text-primary mb-1 group-hover:text-white">CLARITY</div>
                  <div className="text-muted-foreground">Standard</div>
                </button>
                <button className="text-[10px] border border-border hover:border-amber-400/50 p-2 text-left transition-colors group">
                  <div className="text-muted-foreground mb-1 group-hover:text-amber-400">THERMAL</div>
                  <div className="text-muted-foreground/50">Standby</div>
                </button>
              </div>
            </div>
          </TacticalFrame>
        </div>

        {/* CENTER COLUMN - ARMOR STATUS */}
        <div className="lg:col-span-6 flex flex-col gap-6 relative">
          {/* Central Helmet Display */}
          <div className="flex-1 relative flex items-center justify-center min-h-[400px]">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]" />
              
              {/* Rotating Rings */}
              <div className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-[350px] h-[350px] border border-dashed border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Scanning Beam */}
              <motion.div 
                 className="absolute w-full h-2 bg-primary/30 blur-sm z-20"
                 animate={{ top: ["0%", "100%", "0%"] }}
                 transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              />

              <img 
                src={helmetImage} 
                alt="Tactical Helmet" 
                className="relative z-10 max-h-[80%] object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.3)] mix-blend-screen"
              />

              {/* Floating Hotspots */}
              <motion.div 
                className="absolute top-1/4 left-1/4 flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                <div className="bg-black/80 border border-primary/50 p-1.5 text-[10px] text-primary font-mono backdrop-blur-md">
                  VISOR: CLEAR
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-1/3 right-1/4 flex items-center flex-row-reverse gap-2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                <div className="bg-black/80 border border-amber-400/50 p-1.5 text-[10px] text-amber-400 font-mono backdrop-blur-md">
                  KEVLAR: ACTIVE
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Central Status Bar */}
          <TacticalFrame className="h-auto" glowing>
             <div className="grid grid-cols-4 gap-4 text-center divide-x divide-border/30">
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Battery</div>
                   <div className="text-xl font-display text-primary flex justify-center items-center gap-2">
                      <Battery className="w-4 h-4" /> {battery}%
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Integrity</div>
                   <div className="text-xl font-display text-emerald-400 flex justify-center items-center gap-2">
                      <Shield className="w-4 h-4" /> {integrity}%
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Temp</div>
                   <div className="text-xl font-display text-white">
                      21°C
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Oxygen</div>
                   <div className="text-xl font-display text-white">
                      99%
                   </div>
                </div>
             </div>
          </TacticalFrame>
        </div>

        {/* RIGHT COLUMN - ACTIVE SYSTEMS */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          
          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "stealth", icon: Ghost, label: "STEALTH" },
              { id: "combat", icon: Target, label: "COMBAT" },
              { id: "recon", icon: Eye, label: "RECON" }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id as any)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 border transition-all duration-300",
                  activeMode === mode.id 
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,240,255,0.2)]" 
                    : "bg-card/30 border-border text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <mode.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold tracking-wider">{mode.label}</span>
              </button>
            ))}
          </div>

          <TacticalFrame title="Defensive Systems" className="flex-1" corner="bl">
             <div className="space-y-6">
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-sm flex items-center gap-2">
                         <Shield className="w-4 h-4 text-primary" /> Reactive Kevlar
                      </span>
                      <span className="text-xs text-emerald-400">OPTIMAL</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-sm flex items-center gap-2">
                         <Zap className="w-4 h-4 text-amber-400" /> Shape Memory
                      </span>
                      <span className="text-xs text-emerald-400">READY</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-sm flex items-center gap-2">
                         <Wind className="w-4 h-4 text-sky-400" /> Snap-Deploy
                      </span>
                      <span className="text-xs text-muted-foreground">STOWED</span>
                   </div>
                </div>

                <div className="p-3 bg-primary/5 border border-primary/10 rounded mt-4">
                   <div className="text-[10px] uppercase text-primary mb-2 font-bold flex items-center gap-2">
                      <Ghost className="w-3 h-3" /> Micro-Mirror Cloaking
                   </div>
                   <p className="text-xs text-muted-foreground mb-3">
                      Camera-based camouflage system is currently in standby mode. 
                      Reflective armor dispersion ready.
                   </p>
                   <button className="w-full py-1.5 bg-primary/10 border border-primary/50 text-primary text-xs hover:bg-primary/20 transition-colors uppercase font-mono tracking-widest cursor-pointer">
                      Engage Cloak
                   </button>
                </div>
             </div>
          </TacticalFrame>

           <TacticalFrame title="Diagnostic Log" className="h-48 overflow-hidden relative">
              <div className="space-y-2 font-mono text-[10px] text-muted-foreground h-full overflow-hidden">
                 <div className="flex gap-2">
                    <span className="text-primary">14:02:22</span>
                    <span>System initialized sequence complete.</span>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-primary">14:02:23</span>
                    <span>Biometric scan confirmed. Operator ID: #492-A.</span>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-primary">14:02:25</span>
                    <span>Audio dampening calibrated to ambient levels.</span>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-primary">14:02:28</span>
                    <span>Visual cortex interface synchronized.</span>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-primary">14:03:01</span>
                    <span className="text-amber-400">Warning: Minor pressure fluctuation detected.</span>
                 </div>
                 <div className="flex gap-2">
                    <span className="text-primary">14:03:02</span>
                    <span className="text-emerald-400">Pressure stabilized by shape-memory polymer.</span>
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />
           </TacticalFrame>
        </div>

      </div>
      
      {/* FOOTER */}
      <footer className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest">
        <div>Reflective Armor Dispersion Module: READY</div>
        <div className="flex gap-4">
           <span>Sys: OK</span>
           <span>Net: OK</span>
           <span>Enc: AES-256</span>
        </div>
      </footer>
    </div>
  );
}
