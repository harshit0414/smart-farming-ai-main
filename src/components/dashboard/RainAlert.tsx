import { CloudRain, AlertTriangle } from "lucide-react";

interface RainAlertProps {
  rainChance: number;
}

const RainAlert = ({ rainChance }: RainAlertProps) => {
  if (rainChance <= 60) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-300/40 bg-gradient-to-r from-sky-50 via-blue-50 to-sky-100 dark:from-sky-950/40 dark:via-blue-950/40 dark:to-sky-900/40 p-5 sm:p-6 shadow-soft animate-fade-in">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-sky-400/30 blur-xl rounded-full" />
          <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
            <CloudRain className="h-6 w-6 text-white animate-float" strokeWidth={2.2} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 text-[11px] font-semibold uppercase tracking-wider">
              <AlertTriangle className="h-3 w-3" />
              Rain Alert
            </span>
            <span className="text-[11px] font-medium text-sky-700/80 dark:text-sky-300/80">
              {rainChance}% probability · next 6h
            </span>
          </div>
          <h3 className="mt-1.5 text-base sm:text-lg font-bold text-sky-900 dark:text-sky-100">
            🌧️ Rain expected soon
          </h3>
          <p className="text-sm text-sky-800/80 dark:text-sky-200/80 mt-0.5">
            Irrigation will be stopped automatically to conserve water and protect your crops.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RainAlert;
