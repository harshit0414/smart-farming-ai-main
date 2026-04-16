import { Cpu, Wifi, WifiOff } from "lucide-react";
import { esp32 } from "@/lib/mockData";

const Esp32Card = () => {
  const d = esp32;
  const bars = d.signal > -55 ? 4 : d.signal > -65 ? 3 : d.signal > -75 ? 2 : 1;

  return (
    <div className="group relative rounded-2xl bg-card border border-border/60 shadow-soft p-7 animate-fade-in transition-smooth hover:shadow-elevated hover:-translate-y-0.5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center transition-smooth group-hover:scale-110">
            <Cpu className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold leading-tight">ESP32 Device</p>
            <p className="text-xs text-muted-foreground mt-0.5">Field Controller · v2.1</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
            d.connected ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {d.connected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                d.connected ? "bg-primary" : "bg-destructive"
              }`}
            />
          </span>
          {d.connected ? "Connected" : "Offline"}
        </div>
      </div>

      {/* Big signal visual */}
      <div className="rounded-xl bg-secondary/50 p-4 mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
            Signal Strength
          </p>
          <p className="text-2xl font-bold mt-1">
            {d.signal} <span className="text-sm font-normal text-muted-foreground">dBm</span>
          </p>
          <p className="text-xs text-primary font-medium mt-0.5">Excellent</p>
        </div>
        <div className="flex items-end gap-1 h-12">
          {[1, 2, 3, 4].map((b) => (
            <div
              key={b}
              className={`w-2.5 rounded-md transition-smooth ${
                b <= bars ? "bg-gradient-to-t from-primary to-primary-glow shadow-sm" : "bg-muted"
              }`}
              style={{ height: `${b * 25}%` }}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm mt-auto">
        <Row icon={<Wifi className="h-3 w-3" />} label="WiFi SSID" value={d.ssid} />
        <Row label="IP Address" value={d.ip} mono />
        <Row label="Last Seen" value={d.lastSeen} />
        <Row label="Uptime" value="14d 6h" />
      </dl>
    </div>
  );
};

const Row = ({
  label,
  value,
  mono,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  icon?: React.ReactNode;
}) => (
  <div>
    <dt className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium flex items-center gap-1">
      {icon} {label}
    </dt>
    <dd className={`mt-1 font-semibold text-foreground ${mono ? "font-mono text-sm" : ""}`}>
      {value}
    </dd>
  </div>
);

export default Esp32Card;
