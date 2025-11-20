import React from 'react';
import { Moon, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'concierge';
  setActiveTab: (tab: 'explore' | 'concierge') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-night-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="relative">
              <Moon className="h-8 w-8 text-neon-blue group-hover:text-neon-pink transition-colors duration-300" />
              <div className="absolute inset-0 bg-neon-blue blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              NEON<span className="text-neon-blue">WAVE</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'explore'
                    ? 'bg-white/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <MapPin className="h-4 w-4" />
                Explore
              </button>
              <button
                onClick={() => setActiveTab('concierge')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'concierge'
                    ? 'bg-white/10 text-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.3)]'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                AI Concierge
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Tabs (Bottom on mobile usually better, but sticking to top for simplicity here) */}
      <div className="md:hidden border-t border-white/5 flex">
         <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeTab === 'explore' ? 'text-neon-blue bg-white/5' : 'text-gray-400'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeTab === 'concierge' ? 'text-neon-pink bg-white/5' : 'text-gray-400'
            }`}
          >
            AI Concierge
          </button>
      </div>
    </nav>
  );
};
