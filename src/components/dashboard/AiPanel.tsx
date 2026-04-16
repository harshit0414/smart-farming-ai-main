import { Sparkles, AlertTriangle, Info, CheckCircle2, ArrowRight } from "lucide-react";
import { aiRecommendations } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

const iconMap = {
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", ring: "ring-warning/20" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10", ring: "ring-info/20" },
  success: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", ring: "ring-primary/20" },
};

const AiPanel = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-soft p-7 animate-fade-in h-full transition-smooth hover:shadow-elevated">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold leading-tight">AI Insights</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Smart recommendations · Live</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Live
        </span>
      </div>

      <ul className="relative space-y-3">
        {aiRecommendations.map((r) => {
          const cfg = iconMap[r.severity];
          const Icon = cfg.icon;
          return (
            <li
              key={r.id}
              className="group flex gap-3 p-4 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-soft transition-smooth cursor-pointer"
            >
              <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${cfg.bg} ring-4 ${cfg.ring}`}>
                <Icon className={`h-4 w-4 ${cfg.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.message}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all self-center shrink-0" />
            </li>
          );
        })}
      </ul>

      <Button
        variant="ghost"
        size="sm"
        className="relative w-full mt-4 text-primary hover:text-primary hover:bg-primary/10 rounded-xl"
      >
        View all insights <ArrowRight className="h-3.5 w-3.5 ml-1" />
      </Button>
    </div>
  );
};

export default AiPanel;
