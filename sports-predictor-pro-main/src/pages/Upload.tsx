import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { savePrediction } from "@/lib/predictionStore";

const UploadPage = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      savePrediction(data);

      toast.success("Prediction complete!");
      navigate("/results");
    } catch (error) {
      console.error("Prediction failed:", error);
      toast.error("Failed to get prediction. Ensure backend is running.");
    } finally {
      setIsLoading(false);
    }
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
              Upload <span className="text-gradient-gold">Sports Image</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload any sports image and our CNN model will classify it into one of 100 sports categories.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${dragActive
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
                }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <AnimatePresence mode="wait">
                {selectedImage ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center"
                  >
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-h-80 mx-auto rounded-xl mb-6 shadow-lg"
                    />
                    <p className="text-muted-foreground text-sm">
                      Click or drop to change image
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-lg font-semibold mb-2">
                      Drop your sports image here
                    </p>
                    <p className="text-muted-foreground text-sm">
                      or click to browse from your device
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedImage ? 1 : 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                size="lg"
                onClick={handlePredict}
                disabled={!selectedImage || isLoading}
                className="text-lg px-12 glow-gold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Predict Sport
                  </>
                )}
              </Button>
            </motion.div>

            {/* Model Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Image className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Supported Image Types</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, WEBP • Max 10MB • Best results with clear, well-lit sports action shots
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
