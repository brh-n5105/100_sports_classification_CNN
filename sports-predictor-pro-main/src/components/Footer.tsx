import { Mail, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-black mb-4">
              SPORTS<span className="text-gradient-gold">AI</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Advanced CNN-based sports image classification powered by MobileNet architecture. 
              Recognizing 100 different sports with high accuracy.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/upload" className="hover:text-primary transition-colors">Make Prediction</a></li>
              <li><a href="/results" className="hover:text-primary transition-colors">View Results</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:burhanuddin.mg@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">burhanuddin.mg@gmail.com</span>
              </a>
              <a 
                href="https://linkedin.com/in/burhanuddin-ghadiyali"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Burhanuddin Ghadiyali</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Burhanuddin Ghadiyali
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
