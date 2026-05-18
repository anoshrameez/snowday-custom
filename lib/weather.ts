type WeatherResult = {
  temperature: number;
  windSpeed: number;
  snowfall: number;
  hourlySnowfall: {
    time: string;
    snow: number;
  }[];
};

export async function getWeatherData(
  lat: number,
  lon: number
): Promise<WeatherResult> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=temperature_2m,wind_speed_10m` +
    `&hourly=snowfall,temperature_2m,wind_speed_10m` +
    `&forecast_days=1` +
    `&timezone=auto`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 1800,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    const temperature = Number(data?.current?.temperature_2m ?? 0);
    const windSpeed = Number(data?.current?.wind_speed_10m ?? 0);

    const snowArray: number[] = data?.hourly?.snowfall ?? [];
    const timeArray: string[] = data?.hourly?.time ?? [];

    const next12Snow = snowArray.slice(0, 12);

    const totalSnowfall = next12Snow.reduce(
      (sum: number, value: number) => sum + Number(value || 0),
      0
    );

    const hourlySnowfall = timeArray.slice(0, 12).map((time, index) => {
      const date = new Date(time);

      return {
        time: date.toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        }),
        snow: Number((snowArray[index] ?? 0).toFixed(2)),
      };
    });

    return {
      temperature,
      windSpeed,
      snowfall: Number(totalSnowfall.toFixed(2)),
      hourlySnowfall,
    };
  } catch (error) {
    console.error("Weather API Error:", error);

    return {
      temperature: 0,
      windSpeed: 0,
      snowfall: 0,
      hourlySnowfall: Array.from({ length: 12 }).map((_, index) => ({
        time: `${index + 1}h`,
        snow: 0,
      })),
    };
  }
}
