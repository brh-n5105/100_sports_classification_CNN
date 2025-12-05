import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Upload, BarChart3 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const links = [
    { path: "/", label: "Home", icon: Brain },
    { path: "/upload", label: "Predict", icon: Upload },
    { path: "/results", label: "Results", icon: BarChart3 },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            SPORTS<span className="text-gradient-gold">AI</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-1">
          {links.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                location.pathname === path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {location.pathname === path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
