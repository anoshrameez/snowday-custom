import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type SummaryInput = {
  city: string;
  state: string;
  schoolDistrict?: string;
  avgSnowfall?: number;
  temperature: number;
  windSpeed: number;
  snowfall: number;
  chance: number;
};

export async function generateAiSummary({
  city,
  state,
  temperature,
  windSpeed,
  snowfall,
  chance,
  schoolDistrict = "Local school district",
  avgSnowfall = 0,
}: SummaryInput) {
  if (!process.env.OPENAI_API_KEY) {
    return getFallbackSummary(city, state, chance);
  }

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
Write a short snow day school closure summary.

City: ${city}
State/Region: ${state}
School District: ${schoolDistrict}
Average Annual Snowfall: ${avgSnowfall} inches
Temperature: ${temperature}°C
Wind Speed: ${windSpeed} km/h
Snowfall: ${snowfall} mm
Closure Chance: ${chance}%

Rules:
- 2 to 3 short sentences only.
- Clear parent/student friendly language.
- Mention whether school is likely open, delayed, or closed.
- Do not exaggerate.
- Do not mention that you are an AI.
`,
    });

    return response.output_text || getFallbackSummary(city, state, chance);
  } catch {
    return getFallbackSummary(city, state, chance);
  }
}

function getFallbackSummary(city: string, state: string, chance: number) {
  if (chance >= 75) {
    return `Snow day conditions in ${city}, ${state} look strong based on the current forecast. A school closure or delay is possible if these conditions continue.`;
  }

  if (chance >= 50) {
    return `There is a moderate snow day chance in ${city}, ${state}. Families should watch for official school updates as conditions may change.`;
  }

  return `A snow day in ${city}, ${state} looks unlikely based on the current forecast. Schools are more likely to remain open unless conditions worsen.`;
}