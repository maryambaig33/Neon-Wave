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
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="h-56 overflow-hidden relative">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm flex items-center gap-1 text-xs font-bold text-vb-blue">
          <Star className="w-3 h-3 text-vb-gold fill-vb-gold" />
          {venue.rating}
        </div>
        <div className="absolute top-3 left-3 bg-vb-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <CategoryIcon category={venue.category} />
          {venue.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-vb-blue mb-2 group-hover:text-vb-teal transition-colors">
          {venue.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 text-vb-gold" />
          {venue.location}
        </div>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {venue.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium group-hover:bg-vb-sand group-hover:text-vb-blue transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};