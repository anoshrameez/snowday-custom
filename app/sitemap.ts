import cities from "@/data/cities.json";

export default function sitemap() {
  const baseUrl = "https://snowdayspredictorr.com";

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/prediction/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...cityPages,
  ];
}