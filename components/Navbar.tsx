import React from 'react';
import { MapPin, MessageSquare, Menu } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'concierge';
  setActiveTab: (tab: 'explore' | 'concierge') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="flex flex-col items-center justify-center w-10 h-10 bg-vb-blue text-white rounded-full font-serif font-bold text-lg">
              VB
            </div>
            <div className="flex flex-col">
              <span className="text-vb-blue font-serif font-bold text-xl leading-none">VIRGINIA BEACH</span>
              <span className="text-vb-teal text-xs font-medium tracking-widest uppercase">Nightlife Guide</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'explore'
                    ? 'bg-vb-sand text-vb-blue font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-vb-blue'
                }`}
              >
                <MapPin className="h-4 w-4" />
                Explore Venues
              </button>
              <button
                onClick={() => setActiveTab('concierge')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'concierge'
                    ? 'bg-vb-blue text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-vb-blue'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Ask Concierge
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden text-gray-500">
            <Menu className="h-6 w-6" />
          </div>
        </div>
      </div>
      
      {/* Mobile Tabs */}
      <div className="md:hidden border-t border-gray-100 flex">
         <button
            onClick={() => setActiveTab('explore')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              activeTab === 'explore' ? 'text-vb-blue border-b-2 border-vb-blue bg-vb-sand/30' : 'text-gray-500'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              activeTab === 'concierge' ? 'text-vb-blue border-b-2 border-vb-blue bg-vb-sand/30' : 'text-gray-500'
            }`}
          >
            Concierge
          </button>
      </div>
    </nav>
  );
};