import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VenueCard } from './components/VenueCard';
import { AIChat } from './components/AIChat';
import { POPULAR_VENUES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'concierge'>('explore');

  const scrollToConcierge = () => {
    setActiveTab('concierge');
    const element = document.getElementById('concierge-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-night-900 text-white font-sans selection:bg-neon-pink selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pb-20">
        {activeTab === 'explore' && (
          <>
            <Hero onCtaClick={scrollToConcierge} />
            
            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Trending Tonight</h2>
                  <p className="text-gray-400">The hottest spots in Virginia Beach right now.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {POPULAR_VENUES.map(venue => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </section>

            {/* Categories / Vibe Check Section Placeholder */}
            <section className="bg-night-800 py-16 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h2 className="text-2xl font-bold mb-4">Not sure where to go?</h2>
                 <p className="text-gray-400 mb-8">Let our AI analyze your mood and find the perfect match.</p>
                 <button 
                    onClick={scrollToConcierge}
                    className="px-6 py-3 border border-neon-blue text-neon-blue rounded-full hover:bg-neon-blue hover:text-night-900 transition-all font-semibold"
                  >
                    Ask the Concierge
                 </button>
              </div>
            </section>
          </>
        )}

        {/* Concierge Section - Rendered but hidden if not active to preserve chat state if desired, 
            but for this simple app, conditional rendering is fine. 
            However, keeping state might be nice. Let's use conditional display class. */}
        <div id="concierge-section" className={activeTab === 'concierge' ? 'block' : 'hidden'}>
           <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="text-center mb-8">
                 <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-orange-400">
                    Plan Your Night
                 </h1>
                 <p className="text-gray-300">
                    Ask specific questions like "Best rooftop bars open now" or "Where can I find jazz music?"
                 </p>
              </div>
              <AIChat />
           </div>
        </div>
      </main>

      <footer className="bg-night-900 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NeonWave VB. Not affiliated with Virginia Beach Tourism.</p>
          <p className="mt-2">Powered by Google Gemini</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
