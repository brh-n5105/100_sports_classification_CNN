import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sportsLabels } from "@/lib/predictionStore";

interface FeedbackFormProps {
  predictionSport: string;
  confidence: number;
  imageData: string;
}

const FeedbackForm = ({ predictionSport, confidence, imageData }: FeedbackFormProps) => {
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null);
  const [correctSport, setCorrectSport] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedbackType) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("prediction_feedback").insert({
        prediction_sport: predictionSport,
        correct_sport: feedbackType === 'incorrect' ? correctSport : null,
        confidence: confidence,
        image_data: imageData.slice(0, 1000), // Store truncated for demo
        feedback_type: feedbackType,
        user_comment: comment || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback helps improve our model.",
      });
    } catch (error) {
      console.error("Feedback error:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-2xl bg-card border border-primary/30 text-center"
      >
        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h3 className="font-bold text-lg">Feedback Submitted!</h3>
        <p className="text-sm text-muted-foreground">Thanks for helping us improve.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-2xl bg-card border border-border"
    >
      <h3 className="font-bold mb-4">Was this prediction correct?</h3>
      
      <div className="flex gap-3 mb-4">
        <Button
          variant={feedbackType === 'correct' ? 'default' : 'outline'}
          onClick={() => setFeedbackType('correct')}
          className={feedbackType === 'correct' ? 'glow-gold' : ''}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Correct
        </Button>
        <Button
          variant={feedbackType === 'incorrect' ? 'destructive' : 'outline'}
          onClick={() => setFeedbackType('incorrect')}
        >
          <ThumbsDown className="w-4 h-4 mr-2" />
          Incorrect
        </Button>
      </div>

      <AnimatePresence>
        {feedbackType === 'incorrect' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <label className="text-sm text-muted-foreground mb-2 block">
              What's the correct sport?
            </label>
            <select
              value={correctSport}
              onChange={(e) => setCorrectSport(e.target.value)}
              className="w-full p-3 rounded-lg bg-muted border border-border text-foreground"
            >
              <option value="">Select sport...</option>
              {sportsLabels.map((sport) => (
                <option key={sport} value={sport} className="capitalize">
                  {sport}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </AnimatePresence>

      {feedbackType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Additional comments (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Any additional feedback..."
              className="bg-muted border-border"
              rows={3}
            />
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (feedbackType === 'incorrect' && !correctSport)}
            className="w-full glow-gold"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeedbackForm;
