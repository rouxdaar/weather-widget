"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  time: string;
};

const raindrops = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 0.6 + Math.random() * 0.6,
  opacity: 0.3 + Math.random() * 0.4,
}));

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=40.68&longitude=-73.94&current=temperature_2m&timezone=America/New_York"
        );
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setWeather({ temperature: temp, time });
      } catch {
        setError(true);
      }
    }
    fetchWeather();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#18181B" }}
      className="min-h-screen flex items-center justify-center"
    >
      <style>{`
        @keyframes rain {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(410px); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          width: 400,
          height: 400,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Background image */}
        <img
          src="/lofoten-bg.png"
          alt="Brooklyn"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Raindrops */}
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            style={{
              position: "absolute",
              top: 0,
              left: `${drop.left}%`,
              width: 1.5,
              height: 12,
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: 1,
              opacity: drop.opacity,
              animation: `rain ${drop.duration}s linear ${drop.delay}s infinite`,
            }}
          />
        ))}

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#FFFFFF",
          }}
        >
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {/* Date + time */}
            <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
              <div>Today</div>
              <div>{weather ? weather.time : "—"}</div>
            </div>

            {/* Temperature */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                letterSpacing: "-2px",
                lineHeight: 1,
              }}
            >
              {error ? "—" : weather ? `${weather.temperature}°` : "…"}
            </div>
          </div>

          {/* Bottom left: location */}
          <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
            <div>Brooklyn</div>
            <div>New York</div>
          </div>
        </div>
      </div>
    </div>
  );
}
