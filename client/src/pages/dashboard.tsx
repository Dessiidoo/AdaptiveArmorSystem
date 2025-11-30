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
  Power,
  Thermometer,
  Heart,
  Droplets,
  Flame,
  Siren,
  Rocket,
  Anchor
} from "lucide-react";
import { TacticalFrame, StatBar } from "@/components/tactical/frame";
import helmetTactical from "@assets/generated_images/futuristic_tactical_helmet_schematic.png";
import helmetSpace from "@assets/generated_images/futuristic_eva_astronaut_helmet_schematic.png";
import helmetDeepSea from "@assets/generated_images/futuristic_deep_sea_diver_helmet_schematic.png";
import helmetPolice from "@assets/generated_images/futuristic_police_riot_helmet_schematic.png";
import helmetFire from "@assets/generated_images/futuristic_firefighter_rescue_helmet_schematic.png";

import { cn } from "@/lib/utils";

type SuitVariant = "tactical" | "space" | "ocean" | "urban" | "rescue";

const SUIT_CONFIGS = {
  tactical: {
    name: "SpecOps Mark IV",
    role: "Tactical Infiltration",
    color: "text-primary",
    borderColor: "border-primary",
    bgGlow: "shadow-[0_0_15px_rgba(0,240,255,0.1)]",
    icon: Target,
    image: helmetTactical,
    features: ["Active Camouflage", "Ballistic Weave", "Thermal Vision"]
  },
  space: {
    name: "Aether EVA-7",
    role: "Orbital Operations",
    color: "text-amber-200",
    borderColor: "border-amber-200",
    bgGlow: "shadow-[0_0_15px_rgba(253,230,138,0.1)]",
    icon: Rocket,
    image: helmetSpace,
    features: ["Rad-Shielding", "O2 Recycler", "Vacuum Seal"]
  },
  ocean: {
    name: "Abyssal X-9",
    role: "Deep Sea Expl.",
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
    bgGlow: "shadow-[0_0_15px_rgba(34,211,238,0.1)]",
    icon: Anchor,
    image: helmetDeepSea,
    features: ["Pressure Hull", "Sonar Array", "Rebreather"]
  },
  urban: {
    name: "Enforcer Sentinel",
    role: "Law Enforcement",
    color: "text-blue-500",
    borderColor: "border-blue-500",
    bgGlow: "shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    icon: Siren,
    image: helmetPolice,
    features: ["Impact Dampening", "Face Recog.", "Comms Link"]
  },
  rescue: {
    name: "Inferno Guard",
    role: "Hazard Response",
    color: "text-orange-500",
    borderColor: "border-orange-500",
    bgGlow: "shadow-[0_0_15px_rgba(249,115,22,0.1)]",
    icon: Flame,
    image: helmetFire,
    features: ["Heat Shielding", "Toxin Filter", "Struct. Scanner"]
  }
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMode, setActiveMode] = useState<"stealth" | "combat" | "recon">("combat");
  const [currentVariant, setCurrentVariant] = useState<SuitVariant>("tactical");
  
  // Simulated Data States
  const [integrity, setIntegrity] = useState(98);
  const [battery, setBattery] = useState(87);
  const [noiseLevel, setNoiseLevel] = useState(24);

  const activeConfig = SUIT_CONFIGS[currentVariant];

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
          <h1 className={cn("text-4xl font-display font-bold tracking-tighter uppercase text-glow transition-colors duration-500", activeConfig.color)}>
            AEGIS <span className="text-muted-foreground text-2xl">OS v2.4</span>
          </h1>
          <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] flex items-center gap-2">
            ADAPTIVE ENHANCED GUARDIAN INTERFACE SYSTEM
            <span className="text-border">|</span>
            <span className={activeConfig.color}>{activeConfig.name}</span>
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
            <span className={cn("flex items-center gap-2", activeConfig.color)}>
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
          
          {/* NEW: BIO-SENSORY FEEDBACK (UX SECTION) */}
          <TacticalFrame title="Sensory Feedback" className="flex-1" corner="tr">
            <div className="space-y-4">
               <div className="flex items-center gap-3 mb-2">
                  <Heart className="text-rose-400 w-5 h-5" />
                  <span className="font-mono text-sm">Bio-Haptics</span>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card/50 p-2 border border-border/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase mb-1 flex items-center gap-1">
                      <Thermometer className="w-3 h-3" /> Internal Temp
                    </div>
                    <div className="text-lg font-mono text-emerald-400">22.5°C</div>
                    <div className="text-[9px] text-muted-foreground">OPTIMAL COMFORT</div>
                  </div>
                  <div className="bg-card/50 p-2 border border-border/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase mb-1 flex items-center gap-1">
                       <Wind className="w-3 h-3" /> Airflow
                    </div>
                    <div className="text-lg font-mono text-emerald-400">98%</div>
                    <div className="text-[9px] text-muted-foreground">PURIFIED</div>
                  </div>
               </div>

               <div className="space-y-2 pt-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">Haptic Lining</span>
                   <span className="text-primary">ACTIVE</span>
                 </div>
                 <p className="text-[10px] text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-2">
                   "Smart-fabric lining adapts to body temperature and movement. Pressure points eliminated. Sensation: Weightless."
                 </p>
               </div>
               
               <div className="flex gap-2 mt-2">
                 <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-500/20">SAFE</span>
                 <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] rounded border border-amber-500/20">SECURE</span>
                 <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded border border-blue-500/20">SILENT</span>
               </div>
            </div>
          </TacticalFrame>

          <TacticalFrame title="Environment Analysis" className="h-auto" corner="none">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Waves className={cn("w-5 h-5", activeConfig.color)} />
                  <span className="font-mono text-sm">Acoustic Dampening</span>
                </div>
                <div className={cn("h-2 w-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]", activeConfig.color)} />
              </div>
              
              {/* Sound Wave Visualization (Mock) */}
              <div className="h-16 flex items-end justify-between gap-1 p-2 border-b border-border/30">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn("w-full opacity-50", activeConfig.color.replace('text-', 'bg-'))}
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
            </div>
          </TacticalFrame>
        </div>

        {/* CENTER COLUMN - ARMOR STATUS */}
        <div className="lg:col-span-6 flex flex-col gap-6 relative">
          {/* Central Helmet Display */}
          <div className="flex-1 relative flex items-center justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentVariant}
                initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className={cn("absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_0%,transparent_70%)] opacity-10", activeConfig.color)} />
                
                {/* Rotating Rings */}
                <div className={cn("absolute w-[400px] h-[400px] border opacity-20 rounded-full animate-[spin_10s_linear_infinite]", activeConfig.borderColor)} />
                <div className={cn("absolute w-[350px] h-[350px] border border-dashed opacity-30 rounded-full animate-[spin_15s_linear_infinite_reverse]", activeConfig.borderColor)} />
                
                {/* Scanning Beam */}
                <motion.div 
                   className={cn("absolute w-full h-2 blur-sm z-20 opacity-30", activeConfig.color.replace('text-', 'bg-'))}
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                />

                <img 
                  src={activeConfig.image} 
                  alt={activeConfig.name} 
                  className={cn("relative z-10 max-h-[80%] object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]")}
                />

                {/* Floating Hotspots */}
                <motion.div 
                  className="absolute top-1/4 left-1/4 flex items-center gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className={cn("w-2 h-2 rounded-full animate-ping", activeConfig.color.replace('text-', 'bg-'))} />
                  <div className={cn("bg-black/80 border p-1.5 text-[10px] font-mono backdrop-blur-md", activeConfig.borderColor, activeConfig.color)}>
                    VISOR: CLEAR
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Central Status Bar */}
          <TacticalFrame className="h-auto" glowing>
             <div className="grid grid-cols-4 gap-4 text-center divide-x divide-border/30">
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Battery</div>
                   <div className={cn("text-xl font-display flex justify-center items-center gap-2", activeConfig.color)}>
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
          
          {/* NEW: ECOSYSTEM SELECTOR */}
          <TacticalFrame title="Aegis Ecosystem" className="h-auto" corner="bl">
             <div className="grid grid-cols-1 gap-2">
                {(Object.keys(SUIT_CONFIGS) as SuitVariant[]).map((variant) => {
                   const config = SUIT_CONFIGS[variant];
                   const isActive = currentVariant === variant;
                   return (
                      <button
                        key={variant}
                        onClick={() => setCurrentVariant(variant)}
                        className={cn(
                           "flex items-center justify-between p-2 border rounded transition-all duration-300",
                           isActive 
                              ? cn("bg-primary/10", config.borderColor, config.color)
                              : "border-border/50 hover:border-border hover:bg-white/5 text-muted-foreground"
                        )}
                      >
                         <div className="flex items-center gap-3">
                            <config.icon className="w-4 h-4" />
                            <div className="text-left">
                               <div className="text-[10px] font-bold uppercase tracking-wider">{config.role}</div>
                               <div className="text-[8px] opacity-70">{config.name}</div>
                            </div>
                         </div>
                         {isActive && <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                      </button>
                   );
                })}
             </div>
          </TacticalFrame>

          <TacticalFrame title="Active Modules" className="flex-1">
             <div className="space-y-4">
                {activeConfig.features.map((feature, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-mono text-sm flex items-center gap-2">
                         <Zap className={cn("w-4 h-4", activeConfig.color)} /> {feature}
                      </span>
                      <span className="text-xs text-emerald-400">ONLINE</span>
                   </div>
                ))}
                
                <div className={cn("p-3 bg-opacity-5 border bg-card rounded mt-4", activeConfig.borderColor)}>
                   <div className={cn("text-[10px] uppercase mb-2 font-bold flex items-center gap-2", activeConfig.color)}>
                      <Ghost className="w-3 h-3" /> Micro-Mirror Cloaking
                   </div>
                   <p className="text-xs text-muted-foreground mb-3">
                      Camera-based camouflage system is currently in standby mode. 
                      Reflective armor dispersion ready.
                   </p>
                   <button className={cn("w-full py-1.5 bg-opacity-10 border text-xs hover:bg-opacity-20 transition-colors uppercase font-mono tracking-widest cursor-pointer", activeConfig.borderColor, activeConfig.color, activeConfig.color.replace('text-', 'bg-'))}>
                      Engage Cloak
                   </button>
                </div>
             </div>
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
