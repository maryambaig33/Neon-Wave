import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop"
          alt="Nightlife Crowd"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-night-900/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left w-full">
        <div className="md:w-2/3">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            Virginia Beach <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple animate-pulse-slow">
              After Dark
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Discover the pulse of the city. From hidden speakeasies to oceanfront dance floors, find your perfect night out with our AI guide.
          </p>
          <button
            onClick={onCtaClick}
            className="group relative px-8 py-4 bg-neon-blue text-night-900 font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-night-900"
          >
            <span className="relative z-10 flex items-center gap-2">
              Find My Vibe <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
