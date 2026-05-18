import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import CityHero from "@/components/prediction/CityHero";
import PredictionGauge from "@/components/prediction/PredictionGauge";
import AiSummary from "@/components/prediction/AiSummary";
import WeatherStats from "@/components/prediction/WeatherStats";
import HourlySnowfall from "@/components/prediction/HourlySnowfall";
import CommunityVote from "@/components/prediction/CommunityVote";
import CitySeoContent from "@/components/prediction/CitySeoContent";
import FaqSection from "@/components/prediction/FaqSection";
import RelatedCities from "@/components/prediction/RelatedCities";

import cities from "@/data/cities.json";

import { getWeatherData } from "@/lib/weather";
import { generateAiSummary } from "@/lib/ai";
import { calculateSnowPrediction } from "@/lib/prediction";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  return {
    title: `${city.city}, ${city.state} Snow Day Prediction`,
    description: `Live snow day prediction, snowfall forecast, and school closure probability for ${city.city}, ${city.state}.`,
  };
}

export default async function PredictionPage({ params }: PageProps) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#eef3f8] px-4 py-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-xl">
            <h1 className="text-4xl font-black text-[#0d2342]">
              City Not Found
            </h1>
            <p className="mt-4 text-gray-600">
              This snow day prediction page does not exist.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const weather = await getWeatherData(city.lat, city.lon);

  const prediction = calculateSnowPrediction(weather);

  const aiSummary = await generateAiSummary({
    city: city.city,
    state: city.state,
    chance: prediction.chance,
    snowfall: weather.snowfall,
    temperature: weather.temperature,
    windSpeed: weather.windSpeed,
    schoolDistrict: city.schoolDistrict || "",
    avgSnowfall: city.avgSnowfall || 0,
  });

  const relatedCities = cities
    .filter((c) => c.stateCode === city.stateCode && c.slug !== city.slug)
    .slice(0, 4);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#eef3f8] px-4 py-8 md:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <CityHero
            city={city.city}
            state={city.state}
            country={city.country}
            chance={prediction.chance}
            temperature={weather.temperature}
            windSpeed={weather.windSpeed}
            snowfall={weather.snowfall}
          />

          <PredictionGauge chance={prediction.chance} />

          <WeatherStats
            temperature={weather.temperature}
            windSpeed={weather.windSpeed}
            snowfall={weather.snowfall}
          />

          <HourlySnowfall data={weather.hourlySnowfall || []} />

          <AiSummary summary={aiSummary} city={city.city} state={city.state} />

          <CommunityVote />

          <CitySeoContent
            city={city.city}
            state={city.state}
            seoContent={city.seoContent}
            schoolDistrict={city.schoolDistrict || ""}
            avgSnowfall={city.avgSnowfall || 0}
          />

          <FaqSection city={city.city} state={city.state} />

          <RelatedCities cities={relatedCities} currentSlug={city.slug} />
        </div>
      </main>

      <Footer />
    </>
  );
}