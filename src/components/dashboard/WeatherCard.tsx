import { useEffect, useState } from "react";
import { Clock, CloudRain, Droplets, MapPin, RefreshCw, Sun, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { weather as initial } from "@/lib/mockData";
import { toast } from "sonner";

interface WeatherCardProps {
  rainChance: number;
  onRainChange: (value: number) => void;
}

const WeatherCard = ({ rainChance, onRainChange }: WeatherCardProps) => {
  const [data, setData] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const period =
    now.getHours() < 12 ? "Morning" : now.getHours() < 17 ? "Afternoon" : now.getHours() < 20 ? "Evening" : "Night";
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newRain = Math.round(Math.random() * 100);
      setData({
        ...initial,
        temperature: Math.round(initial.temperature + (Math.random() * 4 - 2)),
        humidity: Math.round(initial.humidity + (Math.random() * 8 - 4)),
        windSpeed: Math.round(initial.windSpeed + (Math.random() * 4 - 2)),
        rainChance: newRain,
      });
      onRainChange(newRain);
      setRefreshing(false);
      toast.success("Weather updated");
    }, 700);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl text-white shadow-card transition-smooth hover:shadow-elevated hover:-translate-y-0.5 animate-fade-in h-full">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.25),transparent_50%)]" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

      {/* Floating sun */}
      <div className="absolute right-6 top-6 animate-float">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-300 blur-2xl opacity-60 rounded-full" />
          <Sun className="relative h-20 w-20 sm:h-24 sm:w-24 text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" strokeWidth={1.5} />
        </div>
      </div>

      <div className="relative p-7 sm:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-[11px] font-medium uppercase tracking-wider">
              <MapPin className="h-3 w-3" />
              {data.location}
            </span>
            <p className="text-white/80 text-sm mt-3">Current conditions · {period}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold tabular-nums">
              <Clock className="h-3 w-3" />
              {timeStr}
            </div>
          </div>
        </div>

        {/* Hero temperature */}
        <div className="mt-6 flex items-end gap-3">
          <span className="text-7xl sm:text-8xl font-extrabold tracking-tighter leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {data.temperature}°
          </span>
          <div className="pb-3">
            <p className="text-2xl font-semibold leading-tight">{data.condition}</p>
            <p className="text-white/70 text-sm">Feels like {data.temperature + 2}°C</p>
          </div>
        </div>

        {/* Glass mini-cards */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          <GlassStat icon={<Droplets className="h-4 w-4" />} label="Humidity" value={`${data.humidity}%`} />
          <GlassStat icon={<Wind className="h-4 w-4" />} label="Wind" value={`${data.windSpeed} km/h`} />
          <GlassStat icon={<CloudRain className="h-4 w-4" />} label="Rain 6h" value={`${rainChance}%`} />
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <p className="text-xs text-white/70">Updated · just now</p>
          <Button
            onClick={refresh}
            disabled={refreshing}
            size="sm"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur transition-smooth"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

const GlassStat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl bg-white/15 backdrop-blur-md border border-white/20 p-3 transition-smooth hover:bg-white/25">
    <div className="flex items-center gap-1.5 text-white/85 text-[11px] uppercase tracking-wider font-medium">
      {icon} {label}
    </div>
    <div className="text-xl font-bold mt-1.5">{value}</div>
  </div>
);

export default WeatherCard;
