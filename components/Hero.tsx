import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative overflow-hidden h-[550px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1575517111478-7f60e01c33f6?q=80&w=2070&auto=format&fit=crop"
          alt="Virginia Beach Nightlife"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-vb-blue/90 via-vb-blue/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left w-full">
        <div className="md:w-3/4 lg:w-1/2 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-3 h-3 text-vb-gold" />
            <span className="text-xs font-medium uppercase tracking-wider">Official Nightlife Guide</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6 shadow-sm">
            Experience VB <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-vb-sand">
              After Dark
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light">
            From the bustling Oceanfront to the artistic vibes of the ViBe District. Discover live music, rooftop bars, and hidden gems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onCtaClick}
              className="px-8 py-4 bg-vb-gold text-vb-blue font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Plan My Night <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}
              className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View Popular Spots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};