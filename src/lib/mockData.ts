export const weather = {
  temperature: 28,
  condition: "Partly Cloudy",
  humidity: 64,
  windSpeed: 12,
  rainChance: 22,
  location: "Gorakhpur, IN",
};

const hours = Array.from({ length: 24 }, (_, i) => {
  const h = (new Date().getHours() - 23 + i + 24) % 24;
  return `${String(h).padStart(2, "0")}:00`;
});

export const sensorHistory = hours.map((time, i) => ({
  time,
  moisture: Math.round(45 + Math.sin(i / 3) * 12 + Math.random() * 5),
  temperature: Math.round((26 + Math.sin(i / 4) * 4 + Math.random() * 1.5) * 10) / 10,
  humidity: Math.round(60 + Math.cos(i / 3) * 10 + Math.random() * 4),
}));

export const esp32 = {
  connected: false,
  ssid: "FarmNet_5G",
  ip: "192.168.1.42",
  signal: -58,
  lastSeen: "2 min ago",
};

export const aiRecommendations = [
  {
    id: 1,
    type: "irrigation",
    title: "Soil moisture is low",
    message: "Run irrigation pump for 15 minutes to reach optimal moisture (60%).",
    severity: "warning" as const,
  },
  {
    id: 2,
    type: "weather",
    title: "No rain expected today",
    message: "Schedule watering in the evening (6–7 PM) to reduce evaporation.",
    severity: "info" as const,
  },
  {
    id: 3,
    type: "energy",
    title: "Solar output peaking",
    message: "Battery is 92% charged. Safe to run high-load devices now.",
    severity: "success" as const,
  },
  {
    id: 4,
    type: "temperature",
    title: "High temperature detected",
    message: "Activate cooling system or shade nets to protect crops.",
    severity: "warning" as const,
  },
  {
    id: 5,
    type: "humidity",
    title: "Low humidity levels",
    message: "Consider mist irrigation to maintain optimal humidity.",
    severity: "info" as const,
  },
  {
    id: 6,
    type: "soil",
    title: "Nutrient deficiency detected",
    message: "Apply nitrogen-based fertilizer to improve soil health.",
    severity: "warning" as const,
  },
  {
    id: 7,
    type: "pest",
    title: "Pest activity detected",
    message: "Inspect crops and apply organic pesticide if necessary.",
    severity: "error" as const,
  },
  {
    id: 8,
    type: "energy",
    title: "Low battery level",
    message: "Battery dropped below 30%. Limit non-essential energy usage.",
    severity: "warning" as const,
  },
  {
    id: 9,
    type: "weather",
    title: "Rain expected tomorrow",
    message: "Delay irrigation to conserve water.",
    severity: "info" as const,
  },
  {
    id: 10,
    type: "irrigation",
    title: "Over-irrigation detected",
    message: "Reduce watering duration to prevent waterlogging.",
    severity: "warning" as const,
  },
  {
    id: 11,
    type: "system",
    title: "Sensor offline",
    message: "Moisture sensor #2 is not responding. Check connectivity.",
    severity: "error" as const,
  },
  {
    id: 12,
    type: "crop",
    title: "Growth rate optimal",
    message: "Crop growth is on track. Maintain current conditions.",
    severity: "success" as const,
  },
];
