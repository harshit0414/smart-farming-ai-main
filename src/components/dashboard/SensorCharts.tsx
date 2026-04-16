import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Droplets, Sprout, Thermometer } from "lucide-react";
import { sensorHistory } from "@/lib/mockData";

type ChartConfig = {
  title: string;
  icon: React.ReactNode;
  dataKey: keyof typeof sensorHistory[number];
  unit: string;
  color: string;
  current: number;
};

const charts: ChartConfig[] = [
  {
    title: "Soil Moisture",
    icon: <Sprout className="h-4 w-4" />,
    dataKey: "moisture",
    unit: "%",
    color: "hsl(var(--primary))",
    current: sensorHistory[sensorHistory.length - 1].moisture,
  },
  {
    title: "Temperature",
    icon: <Thermometer className="h-4 w-4" />,
    dataKey: "temperature",
    unit: "°C",
    color: "hsl(var(--warning))",
    current: sensorHistory[sensorHistory.length - 1].temperature,
  },
  {
    title: "Humidity",
    icon: <Droplets className="h-4 w-4" />,
    dataKey: "humidity",
    unit: "%",
    color: "hsl(var(--info))",
    current: sensorHistory[sensorHistory.length - 1].humidity,
  },
];

const SensorCharts = () => {
  return (
    <div className="rounded-2xl bg-card border border-border/60 shadow-soft p-7 animate-fade-in transition-smooth hover:shadow-elevated">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Sensor Trends</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Last 24 hours · live IoT telemetry</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Streaming
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {charts.map((c) => (
          <div key={c.title} className="rounded-xl bg-secondary/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span style={{ color: c.color }}>{c.icon}</span>
                {c.title}
              </div>
              <span className="text-xl font-bold" style={{ color: c.color }}>
                {c.current}
                <span className="text-xs ml-0.5 text-muted-foreground">{c.unit}</span>
              </span>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensorHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`g-${c.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c.color} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={c.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    interval={5}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`${v}${c.unit}`, c.title]}
                  />
                  <Area
                    type="monotone"
                    dataKey={c.dataKey}
                    stroke={c.color}
                    strokeWidth={2.5}
                    fill={`url(#g-${c.dataKey})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SensorCharts;
