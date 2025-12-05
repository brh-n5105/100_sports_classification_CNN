import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Trophy, Clock, Image, TrendingUp, X, MessageSquare } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPredictions, getLatestPrediction, PredictionResult } from "@/lib/predictionStore";
import { Link } from "react-router-dom";

const ResultsPage = () => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const latest = getLatestPrediction();
    const all = getPredictions();
    setPredictions(all);
    
    if (latest && (!latestPrediction || latest.id !== latestPrediction.id)) {
      setLatestPrediction(latest);
      setShowPopup(true);
    }
  }, []);

  const chartData = latestPrediction?.topPredictions.map((p) => ({
    sport: p.sport.length > 15 ? p.sport.slice(0, 12) + "..." : p.sport,
    confidence: Math.round(p.confidence * 100),
    fullName: p.sport,
  })) || [];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Prediction <span className="text-gradient-gold">Results</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              View detailed analysis and confidence scores for your sports image predictions.
            </p>
          </motion.div>

          {!latestPrediction ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
                <Image className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">No Predictions Yet</h2>
              <p className="text-muted-foreground mb-8">
                Upload a sports image to see the CNN model's prediction results.
              </p>
              <Button asChild size="lg" className="glow-gold">
                <Link to="/upload">Upload Image</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Result */}
              <div className="lg:col-span-2 space-y-6">
                {/* Latest Result Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold">Latest Prediction</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={latestPrediction.imageData}
                        alt="Analyzed"
                        className="w-full rounded-xl"
                      />
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                        Detected Sport
                      </div>
                      <div className="text-3xl font-black text-gradient-gold capitalize mb-4">
                        {latestPrediction.sport}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Confidence</div>
                          <div className="text-2xl font-bold text-primary">
                            {Math.round(latestPrediction.confidence * 100)}%
                          </div>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div>
                          <div className="text-sm text-muted-foreground">Time</div>
                          <div className="text-sm font-medium">
                            {formatDate(latestPrediction.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Accuracy Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold">Top 5 Predictions</h2>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical">
                        <XAxis type="number" domain={[0, 100]} tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                        <YAxis 
                          dataKey="sport" 
                          type="category" 
                          width={100} 
                          tick={{ fill: '#a0a0a0', fontSize: 11 }}
                        />
                        <Bar dataKey="confidence" radius={[0, 8, 8, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index === 0 ? 'hsl(43 72% 52%)' : 'hsl(220 15% 25%)'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Model Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <h3 className="font-bold mb-4">Model Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Architecture</span>
                      <span className="font-medium">MobileNetV2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Classes</span>
                      <span className="font-medium">100 Sports</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Input Size</span>
                      <span className="font-medium">224×224</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Training</span>
                      <span className="font-medium">Transfer Learning</span>
                    </div>
                  </div>
                </motion.div>

                {/* Feedback Form */}
                <FeedbackForm
                  predictionSport={latestPrediction.sport}
                  confidence={latestPrediction.confidence}
                  imageData={latestPrediction.imageData}
                />

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <h3 className="font-bold mb-4">Actions</h3>
                  <Button asChild className="w-full glow-gold">
                    <Link to="/upload">New Prediction</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          )}

          {/* History Section */}
          {predictions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Prediction History</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {predictions.map((prediction) => (
                  <motion.button
                    key={prediction.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedHistory(prediction)}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all text-left"
                  >
                    <img
                      src={prediction.imageData}
                      alt={prediction.sport}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <div className="font-semibold capitalize truncate">{prediction.sport}</div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{Math.round(prediction.confidence * 100)}%</span>
                      <span>{formatDate(prediction.timestamp)}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Result Popup */}
      <AnimatePresence>
        {showPopup && latestPrediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-8 rounded-3xl bg-card border border-primary/30 glow-gold text-center"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              >
                <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
              </motion.div>
              
              <h2 className="text-2xl font-black mb-2">Sport Detected!</h2>
              <div className="text-4xl font-black text-gradient-gold capitalize mb-4">
                {latestPrediction.sport}
              </div>
              <div className="text-5xl font-black text-primary mb-6">
                {Math.round(latestPrediction.confidence * 100)}%
              </div>
              <p className="text-muted-foreground text-sm">
                Our CNN model has classified your image with high confidence.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Detail Popup */}
      <AnimatePresence>
        {selectedHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedHistory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-6 rounded-2xl bg-card border border-border"
            >
              <button
                onClick={() => setSelectedHistory(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img
                src={selectedHistory.imageData}
                alt={selectedHistory.sport}
                className="w-full rounded-xl mb-4"
              />
              
              <div className="text-2xl font-black capitalize mb-2">{selectedHistory.sport}</div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="text-primary font-bold text-lg">
                  {Math.round(selectedHistory.confidence * 100)}% confidence
                </span>
                <span>{formatDate(selectedHistory.timestamp)}</span>
              </div>
              
              <div className="space-y-2">
                {selectedHistory.topPredictions.slice(0, 3).map((pred, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="capitalize">{pred.sport}</span>
                    <span className="text-muted-foreground">{Math.round(pred.confidence * 100)}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default ResultsPage;
