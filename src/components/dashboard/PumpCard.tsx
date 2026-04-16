import { useEffect, useRef, useState } from "react";
import { Droplet, Power, Waves, Sparkles, Bot } from "lucide-react";
import { toast } from "sonner";

interface PumpCardProps {
  rainChance: number;
}

const PumpCard = ({ rainChance }: PumpCardProps) => {
  const [on, setOn] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [autoControlled, setAutoControlled] = useState(false);
  const prevAutoOff = useRef(false);

  // Auto-control logic: shut off pump when rain > 60%
  useEffect(() => {
    if (autoMode && rainChance > 60) {
      if (on || !prevAutoOff.current) {
        setOn(false);
        setAutoControlled(true);
        prevAutoOff.current = true;
        toast.info("🌧️ Pump turned OFF due to rain prediction", {
          description: `Rain probability ${rainChance}% — conserving water.`,
        });
      }
    } else {
      prevAutoOff.current = false;
      if (autoControlled) setAutoControlled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rainChance, autoMode]);

  const toggle = () => {
    if (autoMode && rainChance > 60) {
      toast.warning("Auto Mode is preventing manual start during rain forecast");
      return;
    }
    const next = !on;
    setOn(next);
    setAutoControlled(false);
    toast.success(next ? "💧 Irrigation pump started" : "Pump stopped");
  };

  const toggleAuto = () => {
    const next = !autoMode;
    setAutoMode(next);
    if (!next) setAutoControlled(false);
    toast.success(next ? "🤖 Auto Mode enabled" : "Manual control enabled");
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-7 animate-fade-in transition-smooth hover:-translate-y-0.5 h-full flex flex-col ${
        on
          ? "bg-gradient-to-br from-primary via-primary to-primary-deep text-primary-foreground border-transparent shadow-glow"
          : "bg-card text-card-foreground border-border/60 shadow-soft hover:shadow-elevated"
      }`}
    >
      {on && (
        <>
          <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-primary-glow/40 blur-3xl animate-pulse" />
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <Waves className="absolute right-6 bottom-6 h-24 w-24 text-white/10" strokeWidth={1} />
        </>
      )}

      {/* Header */}
      <div className="relative flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-xl flex items-center justify-center transition-smooth ${
              on ? "bg-white/20 group-hover:scale-110" : "bg-accent group-hover:scale-110"
            }`}
          >
            <Droplet
              className={`h-5 w-5 ${on ? "text-white animate-pulse" : "text-primary"}`}
              strokeWidth={2.5}
            />
          </div>
          <div>
            <p className="font-semibold leading-tight">Irrigation Pump</p>
            <p className={`text-xs mt-0.5 ${on ? "text-white/80" : "text-muted-foreground"}`}>
              Zone A · Drip system
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
              on ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {on ? "Active" : "Idle"}
          </span>
          {autoControlled && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 text-[10px] font-semibold uppercase tracking-wider animate-fade-in">
              <Sparkles className="h-2.5 w-2.5" />
              AI Controlled
            </span>
          )}
        </div>
      </div>

      {/* Status hero */}
      <div className="relative flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <p className={`text-[11px] uppercase tracking-wider font-medium ${on ? "text-white/70" : "text-muted-foreground"}`}>
            Pump Status
          </p>
          {autoControlled && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-300">
              Auto Mode
            </span>
          )}
        </div>
        <p className="text-4xl sm:text-5xl font-extrabold tracking-tighter mt-1 transition-smooth">
          {on ? "RUNNING" : "OFFLINE"}
        </p>
        <p className={`text-sm mt-2 ${on ? "text-white/85" : "text-muted-foreground"}`}>
          {on
            ? "Flow rate · 4.2 L/min · 12 PSI"
            : autoControlled
            ? "Stopped automatically — rain forecast detected"
            : "Tap toggle below to start watering"}
        </p>
      </div>

      {/* Manual toggle */}
      <div className="relative mt-6 flex items-center justify-between">
        <div className={`flex items-center gap-2 text-sm font-medium ${on ? "text-white/90" : "text-muted-foreground"}`}>
          <Power className="h-4 w-4" />
          {on ? "Pump is ON" : "Pump is OFF"}
        </div>

        <button
          onClick={toggle}
          role="switch"
          aria-checked={on}
          className={`relative h-9 w-[72px] rounded-full transition-all duration-300 cursor-pointer ${
            on
              ? "bg-white/25 backdrop-blur shadow-inner"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          <span
            className={`absolute top-1 h-7 w-7 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
              on ? "left-[40px] bg-white" : "left-1 bg-card"
            }`}
          >
            <Power className={`h-3.5 w-3.5 ${on ? "text-primary" : "text-muted-foreground"}`} strokeWidth={3} />
          </span>
        </button>
      </div>

      {/* Auto mode toggle */}
      <div
        className={`relative mt-3 flex items-center justify-between px-3 py-2.5 rounded-xl border transition-smooth ${
          on
            ? "bg-white/10 border-white/15"
            : "bg-accent/40 border-border/60"
        }`}
      >
        <div className="flex items-center gap-2">
          <Bot className={`h-4 w-4 ${on ? "text-white/90" : "text-primary"}`} />
          <div>
            <p className={`text-xs font-semibold ${on ? "text-white" : "text-foreground"}`}>
              Enable Auto Mode
            </p>
            <p className={`text-[10px] ${on ? "text-white/70" : "text-muted-foreground"}`}>
              AI controls pump based on weather
            </p>
          </div>
        </div>

        <button
          onClick={toggleAuto}
          role="switch"
          aria-checked={autoMode}
          className={`relative h-6 w-11 rounded-full transition-all duration-300 cursor-pointer ${
            autoMode
              ? on ? "bg-white/30" : "bg-primary"
              : on ? "bg-white/15" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full shadow-md transition-all duration-300 ${
              autoMode ? "left-[22px] bg-white" : "left-0.5 bg-card"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default PumpCard;
