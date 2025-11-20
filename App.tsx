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
    setTimeout(() => {
      const element = document.getElementById('concierge-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-vb-gold selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pb-20">
        {activeTab === 'explore' && (
          <>
            <Hero onCtaClick={scrollToConcierge} />
            
            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex flex-col items-center text-center mb-12">
                <span className="text-vb-teal font-bold uppercase tracking-wider text-sm mb-2">Discover</span>
                <h2 className="text-4xl font-serif font-bold text-vb-blue mb-4">Trending Tonight</h2>
                <p className="text-gray-600 max-w-2xl">
                  Explore the hottest spots in Virginia Beach. Whether you're a local or just visiting, these venues are making waves.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {POPULAR_VENUES.map(venue => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </section>

            {/* Vibe Check / CTA Section */}
            <section className="bg-vb-blue py-20 relative overflow-hidden">
              {/* CSS Pattern Background */}
              <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px' 
              }}></div>
              
              <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Can't decide where to go?</h2>
                 <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                    Our AI Concierge is here to help you craft the perfect evening itinerary based on your mood and preferences.
                 </p>
                 <button 
                    onClick={scrollToConcierge}
                    className="px-8 py-4 bg-white text-vb-blue rounded-lg font-bold shadow-lg hover:bg-vb-sand transition-all transform hover:scale-105"
                  >
                    Chat with Concierge
                 </button>
              </div>
            </section>
          </>
        )}

        {/* Concierge Section */}
        <div id="concierge-section" className={activeTab === 'concierge' ? 'block' : 'hidden'}>
           <div className="bg-vb-sand/30 min-h-[calc(100vh-80px)]">
             <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-10">
                   <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-vb-blue">
                      Plan Your Night Out
                   </h1>
                   <p className="text-gray-600 max-w-xl mx-auto">
                      Ask specific questions like "Best rooftop bars with ocean views" or "Where can I find jazz music near 30th street?"
                   </p>
                </div>
                <AIChat />
             </div>
           </div>
        </div>
      </main>

      <footer className="bg-vb-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
               <div className="font-serif font-bold text-2xl mb-2">VIRGINIA BEACH</div>
               <div className="text-blue-200 text-sm">Nightlife Guide</div>
            </div>
            <div className="text-center md:text-right text-blue-300 text-sm">
              <p>© {new Date().getFullYear()} VB Nightlife Guide. Unofficial Tourist Resource.</p>
              <p className="mt-2 opacity-60">Powered by Google Gemini & Google Maps</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;