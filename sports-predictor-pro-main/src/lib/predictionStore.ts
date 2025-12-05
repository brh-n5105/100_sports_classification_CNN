export interface PredictionResult {
  id: string;
  sport: string;
  confidence: number;
  topPredictions: { sport: string; confidence: number }[];
  imageData: string;
  timestamp: Date;
}

// Simulated predictions store (in a real app, this would be from backend)
let predictions: PredictionResult[] = [];

export const addPrediction = (prediction: Omit<PredictionResult, 'id' | 'timestamp'>) => {
  const newPrediction: PredictionResult = {
    ...prediction,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
  };
  predictions = [newPrediction, ...predictions];
  return newPrediction;
};

export const getPredictions = () => predictions;

export const getLatestPrediction = () => predictions[0] || null;

// Sample sports for demo
export const sportsLabels = [
  'air hockey', 'ampute football', 'archery', 'arm wrestling', 'axe throwing',
  'balance beam', 'barell racing', 'baseball', 'basketball', 'baton twirling',
  'bike polo', 'billiards', 'bmx', 'bobsled', 'bowling', 'boxing', 'bull riding',
  'bungee jumping', 'canoe slamon', 'cheerleading', 'chuckwagon racing', 'cricket',
  'croquet', 'curling', 'disc golf', 'fencing', 'field hockey', 'figure skating men',
  'figure skating pairs', 'figure skating women', 'fly fishing', 'football',
  'formula 1 racing', 'frisbee', 'gaga', 'giant slalom', 'golf', 'hammer throw',
  'hang gliding', 'harness racing', 'high jump', 'hockey', 'horse jumping',
  'horse racing', 'horseshoe pitching', 'hurdles', 'hydroplane racing', 'ice climbing',
  'ice yachting', 'jai alai', 'javelin', 'jousting', 'judo', 'lacrosse', 'log rolling',
  'luge', 'motorcycle racing', 'mushing', 'nascar racing', 'olympic wrestling',
  'parallel bar', 'pole climbing', 'pole dancing', 'pole vault', 'polo', 'pommel horse',
  'rings', 'rock climbing', 'roller derby', 'rollerblade racing', 'rowing', 'rugby',
  'sailboat racing', 'shot put', 'shuffleboard', 'sidecar racing', 'ski jumping',
  'sky surfing', 'skydiving', 'snow boarding', 'snowmobile racing', 'speed skating',
  'steer wrestling', 'sumo wrestling', 'surfing', 'swimming', 'table tennis', 'tennis',
  'track bicycle', 'trapeze', 'tug of war', 'ultimate', 'uneven bars', 'volleyball',
  'water cycling', 'water polo', 'weightlifting', 'wheelchair basketball',
  'wheelchair racing', 'wingsuit flying'
];

// Save a real prediction from the API
export const savePrediction = (
  data: {
    predicted: string;
    confidence: number;
    top_preds: { label: string; prob: number }[];
    image: string;
  }
): PredictionResult => {
  const topPredictions = data.top_preds.map(p => ({
    sport: p.label,
    confidence: p.prob
  }));

  return addPrediction({
    sport: data.predicted,
    confidence: data.confidence,
    topPredictions,
    imageData: `data:image/jpeg;base64,${data.image}`,
  });
};

// Simulate a prediction (kept for testing without backend)
export const simulatePrediction = (imageData: string): PredictionResult => {
  const randomIndex = Math.floor(Math.random() * sportsLabels.length);
  const mainSport = sportsLabels[randomIndex];
  const mainConfidence = 0.7 + Math.random() * 0.25;

  // Generate top 5 predictions
  const usedIndices = new Set([randomIndex]);
  const topPredictions = [{ sport: mainSport, confidence: mainConfidence }];

  let remainingConf = 1 - mainConfidence;
  for (let i = 0; i < 4; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * sportsLabels.length);
    } while (usedIndices.has(idx));
    usedIndices.add(idx);

    const conf = i < 3 ? remainingConf * (0.3 + Math.random() * 0.4) : remainingConf;
    topPredictions.push({ sport: sportsLabels[idx], confidence: conf });
    remainingConf -= conf;
  }

  return addPrediction({
    sport: mainSport,
    confidence: mainConfidence,
    topPredictions,
    imageData,
  });
};
