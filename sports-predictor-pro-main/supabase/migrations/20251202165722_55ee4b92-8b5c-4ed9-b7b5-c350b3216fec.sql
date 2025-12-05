-- Create feedback table for prediction corrections
CREATE TABLE public.prediction_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_sport TEXT NOT NULL,
  correct_sport TEXT,
  confidence DECIMAL(5,4) NOT NULL,
  image_data TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('correct', 'incorrect')),
  user_comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prediction_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (public feature)
CREATE POLICY "Anyone can submit feedback"
ON public.prediction_feedback
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read feedback (for history display)
CREATE POLICY "Anyone can read feedback"
ON public.prediction_feedback
FOR SELECT
USING (true);