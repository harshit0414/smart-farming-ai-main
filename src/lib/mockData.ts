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
];
