type PredictionInput = {
  temperature: number;
  windSpeed: number;
  snowfall: number;
};

type PredictionResult = {
  chance: number;
  riskLevel: "Low" | "Moderate" | "High" | "Severe";
};

export function calculateSnowPrediction({
  temperature,
  windSpeed,
  snowfall,
}: PredictionInput): PredictionResult {
  let score = 0;

  if (snowfall >= 10) score += 55;
  else if (snowfall >= 6) score += 45;
  else if (snowfall >= 3) score += 30;
  else if (snowfall >= 1) score += 18;
  else if (snowfall > 0) score += 8;

  if (temperature <= -12) score += 25;
  else if (temperature <= -7) score += 20;
  else if (temperature <= -2) score += 14;
  else if (temperature <= 1) score += 8;

  if (windSpeed >= 45) score += 20;
  else if (windSpeed >= 30) score += 14;
  else if (windSpeed >= 18) score += 8;

  score = Math.min(Math.max(Math.round(score), 0), 100);

  let riskLevel: PredictionResult["riskLevel"] = "Low";

  if (score >= 75) riskLevel = "Severe";
  else if (score >= 55) riskLevel = "High";
  else if (score >= 30) riskLevel = "Moderate";

  return {
    chance: score,
    riskLevel,
  };
}
