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

  // Snowfall impact
  if (snowfall >= 12) {
    score += 55;
  } else if (snowfall >= 8) {
    score += 45;
  } else if (snowfall >= 5) {
    score += 35;
  } else if (snowfall >= 2) {
    score += 20;
  }

  // Temperature impact
  if (temperature <= -15) {
    score += 25;
  } else if (temperature <= -10) {
    score += 20;
  } else if (temperature <= -5) {
    score += 15;
  } else if (temperature <= 0) {
    score += 8;
  }

  // Wind impact
  if (windSpeed >= 50) {
    score += 20;
  } else if (windSpeed >= 35) {
    score += 15;
  } else if (windSpeed >= 25) {
    score += 8;
  }

  // Clamp
  score = Math.min(Math.max(score, 0), 100);

  let riskLevel: PredictionResult["riskLevel"] = "Low";

  if (score >= 75) {
    riskLevel = "Severe";
  } else if (score >= 55) {
    riskLevel = "High";
  } else if (score >= 35) {
    riskLevel = "Moderate";
  }

  return {
    chance: score,
    riskLevel,
  };
}