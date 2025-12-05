import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Zap, Target, Layers, Database, Cpu, ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-sports.jpg";

const features = [
  {
    icon: Brain,
    title: "MobileNet Architecture",
    description: "Built on MobileNetV2 backbone, optimized for fast inference while maintaining high accuracy across 100 sports categories.",
  },
  {
    icon: Target,
    title: "100 Sports Classes",
    description: "Recognizes everything from football to wingsuit flying, covering mainstream and niche sports from around the world.",
  },
  {
    icon: Zap,
    title: "Real-time Prediction",
    description: "Lightning-fast image classification with confidence scores, delivering results in milliseconds.",
  },
  {
    icon: Layers,
    title: "Transfer Learning",
    description: "Leverages pre-trained weights from ImageNet, fine-tuned on sports-specific datasets for superior accuracy.",
  },
  {
    icon: Database,
    title: "Rich Sports Database",
    description: "Each prediction includes detailed sport descriptions, rules, and interesting facts about the recognized activity.",
  },
  {
    icon: Cpu,
    title: "Optimized Model",
    description: "Phase-1 trained model with frozen base layers and custom classification head for efficient sports recognition.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sports background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>

        <div className="absolute top-24 left-4 md:left-8 z-20">
          <img
            src="/bit_logo.png"
            alt="BIT Logo"
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              SPORTS IMAGE
              <br />
              <span className="text-gradient-gold">CLASSIFIER</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Powered by Convolutional Neural Networks, our AI recognizes
              <span className="text-primary font-semibold"> 100 different sports </span>
              with exceptional accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 glow-gold">
                <Link to="/upload">
                  Start Predicting
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/results">View Results</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Model Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              About the <span className="text-gradient-gold">CNN Model</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our sports classifier uses a state-of-the-art deep learning architecture
              trained on thousands of sports images.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100", label: "Sports Categories" },
              { value: "95%+", label: "Accuracy Rate" },
              { value: "<100ms", label: "Inference Time" },
              { value: "MobileNet", label: "Architecture" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to <span className="text-gradient-gold">Classify</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Upload a sports image and let our CNN model identify the sport with confidence scores.
            </p>
            <Button asChild size="lg" className="text-lg px-8 glow-gold">
              <Link to="/upload">
                Upload Image
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
