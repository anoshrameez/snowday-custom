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
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      `&current=temperature_2m,wind_speed_10m` +
      `&hourly=snowfall` +
      `&forecast_days=1` +
      `&timezone=auto`;

    const response = await fetch(url, {
      next: {
        revalidate: 1800,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    const temperature =
      data?.current?.temperature_2m ?? 0;

    const windSpeed =
      data?.current?.wind_speed_10m ?? 0;

    const snowfallArray =
      data?.hourly?.snowfall ?? [];

    const timeArray =
      data?.hourly?.time ?? [];

    const totalSnowfall = snowfallArray.reduce(
      (sum: number, value: number) => sum + value,
      0
    );

    const hourlySnowfall = timeArray
      .slice(0, 12)
      .map((time: string, index: number) => ({
        time: new Date(time).toLocaleTimeString([], {
          hour: "numeric",
        }),
        snow: snowfallArray[index] ?? 0,
      }));

    return {
      temperature,
      windSpeed,
      snowfall: Number(totalSnowfall.toFixed(1)),
      hourlySnowfall,
    };
  } catch (error) {
    console.error("Weather API Error:", error);

    return {
      temperature: 0,
      windSpeed: 0,
      snowfall: 0,
      hourlySnowfall: [],
    };
  }
}