import React from 'react';
import { Venue } from '../types';
import { Star, MapPin, Music, Beer, Wine, Users } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Club': return <Users className="w-4 h-4" />;
    case 'Bar': return <Beer className="w-4 h-4" />;
    case 'Brewery': return <Beer className="w-4 h-4" />;
    case 'Lounge': return <Wine className="w-4 h-4" />;
    case 'Live Music': return <Music className="w-4 h-4" />;
    default: return <Star className="w-4 h-4" />;
  }
};

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <div className="group relative bg-night-800 rounded-2xl overflow-hidden border border-white/5 hover:border-neon-blue/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-neon-blue/20">
      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold text-yellow-400">
          <Star className="w-3 h-3 fill-yellow-400" />
          {venue.rating}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-night-800 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        <div className="flex items-center gap-2 text-neon-blue text-xs font-bold uppercase tracking-wider mb-2">
          <CategoryIcon category={venue.category} />
          {venue.category}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
          {venue.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {venue.description}
        </p>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
          <MapPin className="w-3 h-3" />
          {venue.location}
        </div>

        <div className="flex flex-wrap gap-2">
          {venue.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs border border-white/5 hover:border-neon-purple/50 hover:text-neon-purple transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
