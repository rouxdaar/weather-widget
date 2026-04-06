"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  time: string;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=68.2&longitude=14.4&current=temperature_2m&timezone=Europe/Oslo"
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
          alt="Lofoten"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

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
            <div>Lofoten</div>
            <div>Norway</div>
          </div>
        </div>
      </div>
    </div>
  );
}
