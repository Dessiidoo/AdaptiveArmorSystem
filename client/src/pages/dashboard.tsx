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
  Anchor,
  Car,
  Plane,
  Bot,
  Cpu,
  User
} from "lucide-react";
import { TacticalFrame, StatBar } from "@/components/tactical/frame";
import helmetTactical from "@assets/generated_images/futuristic_tactical_helmet_schematic.png";
import helmetSpace from "@assets/generated_images/futuristic_eva_astronaut_helmet_schematic.png";
import helmetDeepSea from "@assets/generated_images/futuristic_deep_sea_diver_helmet_schematic.png";
import helmetPolice from "@assets/generated_images/futuristic_police_riot_helmet_schematic.png";
import helmetFire from "@assets/generated_images/futuristic_firefighter_rescue_helmet_schematic.png";

// New Asset Imports (Placeholders until generation completes)
import vehicleTank from "@assets/generated_images/futuristic_armored_tank_schematic.png";
import vehicleJet from "@assets/generated_images/futuristic_aerospace_fighter_jet_schematic.png";
import vehicleMech from "@assets/generated_images/futuristic_combat_mech_robot_schematic.png";
import vehicleSub from "@assets/generated_images/futuristic_tactical_submarine_schematic.png";

import { cn } from "@/lib/utils";

type UnitCategory = "human" | "vehicle" | "aircraft" | "marine" | "robotics";

interface AegisUnit {
  id: string;
  category: UnitCategory;
  name: string;
  role: string;
  color: string;
  borderColor: string;
  bgGlow: string;
  icon: any;
  image: string;
  features: string[];
  stats: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
    desc: string;
  };
}

const AEGIS_UNITS: Record<string, AegisUnit> = {
  // HUMANS
  tactical: {
    id: "tactical",
    category: "human",
    name: "SpecOps Mark IV",
    role: "Infantry",
    color: "text-primary",
    borderColor: "border-primary",
    bgGlow: "shadow-[0_0_15px_rgba(0,240,255,0.1)]",
    icon: User,
    image: helmetTactical,
    features: ["Active Camouflage", "Ballistic Weave", "Thermal Vision"],
    stats: { label1: "Internal Temp", val1: "36.5°C", label2: "Airflow", val2: "98%", desc: "Smart-fabric lining adapts to body temperature." }
  },
  space: {
    id: "space",
    category: "human",
    name: "Aether EVA-7",
    role: "Astronaut",
    color: "text-amber-200",
    borderColor: "border-amber-200",
    bgGlow: "shadow-[0_0_15px_rgba(253,230,138,0.1)]",
    icon: Rocket,
    image: helmetSpace,
    features: ["Rad-Shielding", "O2 Recycler", "Vacuum Seal"],
    stats: { label1: "Suit Pressure", val1: "4.3 PSI", label2: "O2 Level", val2: "99%", desc: "Radiation shielding active. Life support nominal." }
  },
  rescue: {
    id: "rescue",
    category: "human",
    name: "Inferno Guard",
    role: "Response",
    color: "text-orange-500",
    borderColor: "border-orange-500",
    bgGlow: "shadow-[0_0_15px_rgba(249,115,22,0.1)]",
    icon: Flame,
    image: helmetFire,
    features: ["Heat Shielding", "Toxin Filter", "Struct. Scanner"],
    stats: { label1: "Ext. Temp", val1: "450°C", label2: "Cooling", val2: "100%", desc: "Thermal barrier integrity at maximum." }
  },
  
  // VEHICLES
  tank: {
    id: "tank",
    category: "vehicle",
    name: "Rhino APC-9",
    role: "Armored Transport",
    color: "text-emerald-500",
    borderColor: "border-emerald-500",
    bgGlow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    icon: Car,
    image: vehicleTank,
    features: ["Reactive Plating", "Trophy System", "All-Terrain"],
    stats: { label1: "Engine Temp", val1: "89°C", label2: "Fuel Cell", val2: "92%", desc: "Chassis integrity optimized. Suspension active." }
  },
  
  // AIRCRAFT
  jet: {
    id: "jet",
    category: "aircraft",
    name: "Wraith Interceptor",
    role: "Air Superiority",
    color: "text-sky-400",
    borderColor: "border-sky-400",
    bgGlow: "shadow-[0_0_15px_rgba(56,189,248,0.1)]",
    icon: Plane,
    image: vehicleJet,
    features: ["Stealth Coating", "G-Force Comp", "Auto-Pilot"],
    stats: { label1: "Altitude", val1: "45k ft", label2: "Mach", val2: "2.4", desc: "Aerodynamic shielding engaged. Stealth active." }
  },

  // ROBOTICS
  mech: {
    id: "mech",
    category: "robotics",
    name: "Titan Walker",
    role: "Heavy Support",
    color: "text-purple-400",
    borderColor: "border-purple-400",
    bgGlow: "shadow-[0_0_15px_rgba(192,132,252,0.1)]",
    icon: Bot,
    image: vehicleMech,
    features: ["Myomer Muscles", "Auto-Loader", "Sensor Link"],
    stats: { label1: "Hydraulics", val1: "3000 PSI", label2: "Core", val2: "Stable", desc: "Neural link established. Gyros synced." }
  },

  // MARINE
  sub: {
    id: "sub",
    category: "marine",
    name: "Trident DSV",
    role: "Deep Submersible",
    color: "text-indigo-400",
    borderColor: "border-indigo-400",
    bgGlow: "shadow-[0_0_15px_rgba(129,140,248,0.1)]",
    icon: Anchor,
    image: vehicleSub,
    features: ["Pressure Hull", "Silent Drive", "Sonar Array"],
    stats: { label1: "Depth", val1: "800m", label2: "Pressure", val2: "81 atm", desc: "Hydrodynamic field active. Silent running." }
  }
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMode, setActiveMode] = useState<"stealth" | "combat" | "recon">("combat");
  const [currentUnitId, setCurrentUnitId] = useState<string>("tactical");
  
  // Simulated Data States
  const [integrity, setIntegrity] = useState(98);
  const [battery, setBattery] = useState(87);
  const [noiseLevel, setNoiseLevel] = useState(24);

  const activeConfig = AEGIS_UNITS[currentUnitId];

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

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 font-sans overflow-hidden relative flex flex-col">
      {/* Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-20" />

      {/* HEADER */}
      <header className="flex justify-between items-end border-b border-border/50 pb-4 mb-6 relative z-10">
        <div>
          <h1 className={cn("text-4xl font-display font-bold tracking-tighter uppercase text-glow transition-colors duration-500", activeConfig.color)}>
            AEGIS <span className="text-muted-foreground text-2xl">NETWORK</span>
          </h1>
          <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] flex items-center gap-2">
            UNIVERSAL PROTECTION LAYER
            <span className="text-border">|</span>
            <span className={activeConfig.color}>{activeConfig.name}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8 font-mono text-sm">
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground text-[10px] uppercase">System Status</span>
            <span className="text-emerald-400 flex items-center gap-2">
              <Activity className="w-3 h-3 animate-pulse" /> ONLINE
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground text-[10px] uppercase">Uplink</span>
            <span className={cn("flex items-center gap-2", activeConfig.color)}>
              <Wifi className="w-3 h-3" /> ENCRYPTED
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
          
          {/* TELEMETRY SECTION (ADAPTS TO UNIT TYPE) */}
          <TacticalFrame title="Unit Telemetry" className="flex-1" corner="tr">
            <div className="space-y-4">
               <div className="flex items-center gap-3 mb-2">
                  <Cpu className={cn("w-5 h-5", activeConfig.color)} />
                  <span className="font-mono text-sm">
                    {activeConfig.category === 'human' ? 'Bio-Metrics' : 'Sys-Metrics'}
                  </span>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card/50 p-2 border border-border/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase mb-1 flex items-center gap-1">
                      <Thermometer className="w-3 h-3" /> {activeConfig.stats.label1}
                    </div>
                    <div className={cn("text-lg font-mono", activeConfig.color)}>{activeConfig.stats.val1}</div>
                    <div className="text-[9px] text-muted-foreground">NOMINAL</div>
                  </div>
                  <div className="bg-card/50 p-2 border border-border/50 rounded">
                    <div className="text-[10px] text-muted-foreground uppercase mb-1 flex items-center gap-1">
                       <Wind className="w-3 h-3" /> {activeConfig.stats.label2}
                    </div>
                    <div className={cn("text-lg font-mono", activeConfig.color)}>{activeConfig.stats.val2}</div>
                    <div className="text-[9px] text-muted-foreground">STABLE</div>
                  </div>
               </div>

               <div className="space-y-2 pt-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">Aegis Layer</span>
                   <span className="text-primary">ACTIVE</span>
                 </div>
                 <p className="text-[10px] text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-2">
                   "{activeConfig.stats.desc}"
                 </p>
               </div>
               
               <div className="flex gap-2 mt-2">
                 <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-500/20">SECURE</span>
                 <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] rounded border border-blue-500/20">LINKED</span>
               </div>
            </div>
          </TacticalFrame>

          <TacticalFrame title="Environment Analysis" className="h-auto" corner="none">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Waves className={cn("w-5 h-5", activeConfig.color)} />
                  <span className="font-mono text-sm">External Scan</span>
                </div>
                <div className={cn("h-2 w-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]", activeConfig.color)} />
              </div>
              
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
            </div>
          </TacticalFrame>
        </div>

        {/* CENTER COLUMN - ARMOR STATUS */}
        <div className="lg:col-span-6 flex flex-col gap-6 relative">
          {/* Central Display */}
          <div className="flex-1 relative flex items-center justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentUnitId}
                initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className={cn("absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_0%,transparent_70%)] opacity-10", activeConfig.color)} />
                
                <div className={cn("absolute w-[450px] h-[450px] border opacity-10 rounded-full animate-[spin_30s_linear_infinite]", activeConfig.borderColor)} />
                <div className={cn("absolute w-[400px] h-[400px] border border-dashed opacity-20 rounded-full animate-[spin_20s_linear_infinite_reverse]", activeConfig.borderColor)} />
                
                <motion.div 
                   className={cn("absolute w-full h-2 blur-sm z-20 opacity-30", activeConfig.color.replace('text-', 'bg-'))}
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                />

                <img 
                  src={activeConfig.image} 
                  alt={activeConfig.name} 
                  className={cn("relative z-10 max-h-[80%] max-w-[90%] object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]")}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Central Status Bar */}
          <TacticalFrame className="h-auto" glowing>
             <div className="grid grid-cols-4 gap-4 text-center divide-x divide-border/30">
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Power</div>
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
                   <div className="text-[10px] uppercase text-muted-foreground">Shields</div>
                   <div className="text-xl font-display text-white">
                      100%
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="text-[10px] uppercase text-muted-foreground">Signal</div>
                   <div className="text-xl font-display text-white">
                      -42dB
                   </div>
                </div>
             </div>
          </TacticalFrame>
        </div>

        {/* RIGHT COLUMN - ACTIVE SYSTEMS */}
        <div className="lg:col-span-3 space-y-6 flex flex-col">
          
          {/* UNIVERSAL SELECTOR */}
          <TacticalFrame title="Unit Selector" className="h-auto max-h-[60vh] overflow-y-auto" corner="bl">
             <div className="space-y-3">
                {Object.entries(AEGIS_UNITS).map(([key, unit]) => {
                   const isActive = currentUnitId === key;
                   return (
                      <button
                        key={key}
                        onClick={() => setCurrentUnitId(key)}
                        className={cn(
                           "w-full flex items-center justify-between p-2 border rounded transition-all duration-300",
                           isActive 
                              ? cn("bg-primary/10", unit.borderColor, unit.color)
                              : "border-border/50 hover:border-border hover:bg-white/5 text-muted-foreground"
                        )}
                      >
                         <div className="flex items-center gap-3">
                            <div className={cn("p-1.5 rounded bg-card/50", isActive ? unit.color : "text-muted-foreground")}>
                               <unit.icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                               <div className="text-[10px] font-bold uppercase tracking-wider">{unit.name}</div>
                               <div className="text-[8px] opacity-70 uppercase">{unit.role}</div>
                            </div>
                         </div>
                      </button>
                   );
                })}
             </div>
          </TacticalFrame>

          <TacticalFrame title="Active Systems" className="flex-1">
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
                      <Shield className="w-3 h-3" /> Aegis Dispersion
                   </div>
                   <p className="text-xs text-muted-foreground mb-3">
                      Universal reflective armor layer is ready for deployment.
                   </p>
                   <button className={cn("w-full py-1.5 bg-opacity-10 border text-xs hover:bg-opacity-20 transition-colors uppercase font-mono tracking-widest cursor-pointer", activeConfig.borderColor, activeConfig.color, activeConfig.color.replace('text-', 'bg-'))}>
                      Deploy Armor
                   </button>
                </div>
             </div>
          </TacticalFrame>

        </div>

      </div>
      
      {/* FOOTER */}
      <footer className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest">
        <div>Aegis Universal Protocol: CONNECTED</div>
        <div className="flex gap-4">
           <span>Unit: {activeConfig.category.toUpperCase()}</span>
           <span>ID: {activeConfig.id.toUpperCase()}-8842</span>
        </div>
      </footer>
    </div>
  );
}
