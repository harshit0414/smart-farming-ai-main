import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/dashboard/Navbar";
import WeatherCard from "@/components/dashboard/WeatherCard";
import Esp32Card from "@/components/dashboard/Esp32Card";
import PumpCard from "@/components/dashboard/PumpCard";
import SensorCharts from "@/components/dashboard/SensorCharts";
import AiPanel from "@/components/dashboard/AiPanel";
import RainAlert from "@/components/dashboard/RainAlert";
import { weather as initialWeather } from "@/lib/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [rainChance, setRainChance] = useState(initialWeather.rainChance);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const u = localStorage.getItem("smartfarm_user");
    if (!u) navigate("/");
    else setEmail(u);
  }, [navigate]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar email={email} />
      <main className="container py-8 sm:py-10 space-y-8">
        {/* Greeting */}
        <div className="animate-fade-in flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{today}</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
              Good day, Farmer 🌱
            </h1>
            <p className="text-muted-foreground mt-1.5">
              Here's a real-time overview of your smart farm.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tabular-nums">{currentTime}</span>
          </div>
        </div>

        {/* Rain alert (auto-shown when rainChance > 60) */}
        <RainAlert rainChance={rainChance} />

        {/* Top row: Weather (wider) + ESP32 + Pump */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-7">
          <div className="lg:col-span-2">
            <WeatherCard rainChance={rainChance} onRainChange={setRainChance} />
          </div>
          <div className="lg:col-span-1">
            <Esp32Card />
          </div>
          <div className="lg:col-span-1">
            <PumpCard rainChance={rainChance} />
          </div>
        </div>

        {/* Charts + AI */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-7">
          <div className="xl:col-span-2">
            <SensorCharts />
          </div>
          <div className="xl:col-span-1">
            <AiPanel />
          </div>
        </div>

        <footer className="pt-4 pb-2 text-center text-xs text-muted-foreground">
          SmartFarm · Self-Optimizing Solar IoT System · © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
