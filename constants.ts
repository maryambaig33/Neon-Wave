import { Venue } from './types';

export const POPULAR_VENUES: Venue[] = [
  {
    id: '1',
    name: "Peabody's Nightclub",
    description: "High-energy dance club featuring famous DJs, a massive dance floor, and regular electronic music events. The heartbeat of VB nightlife.",
    category: 'Club',
    rating: 4.5,
    imageUrl: "https://picsum.photos/seed/peabodys/600/400",
    location: "21st St, Oceanfront",
    tags: ["Dancing", "DJs", "High Energy"]
  },
  {
    id: '2',
    name: "The Shack",
    description: "An open-air oasis offering yard games, crushes, and a laid-back atmosphere. Perfect for day drinking that turns into night fun.",
    category: 'Bar',
    rating: 4.7,
    imageUrl: "https://picsum.photos/seed/shack/600/400",
    location: "8th St, Oceanfront",
    tags: ["Outdoor", "Games", "Crushes"]
  },
  {
    id: '3',
    name: "Waterman's Surfside Grille",
    description: "Home of the original Orange Crush. A classic oceanfront spot with live acoustic music and a vibrant bar scene.",
    category: 'Lounge',
    rating: 4.8,
    imageUrl: "https://picsum.photos/seed/watermans/600/400",
    location: "Atlantic Ave",
    tags: ["Oceanfront", "Cocktails", "Live Music"]
  },
  {
    id: '4',
    name: "Lunasea",
    description: "A multi-level venue with a Key West vibe, outdoor patio, and late-night DJ sets. A staple for locals and tourists alike.",
    category: 'Live Music',
    rating: 4.4,
    imageUrl: "https://picsum.photos/seed/lunasea/600/400",
    location: "22nd St",
    tags: ["Patio", "Tex-Mex", "Party"]
  },
  {
    id: '5',
    name: "Back Bay Brewing Co",
    description: "Rustic brewery in the ViBe district serving creative craft beers in a relaxed, historic farmhouse setting.",
    category: 'Brewery',
    rating: 4.6,
    imageUrl: "https://picsum.photos/seed/backbay/600/400",
    location: "Norfolk Ave",
    tags: ["Craft Beer", "Local", "Chill"]
  },
  {
    id: '6',
    name: "Calypso Bar & Grill",
    description: "Covered patio bar featuring some of the best live rock and reggae bands on the oceanfront.",
    category: 'Live Music',
    rating: 4.3,
    imageUrl: "https://picsum.photos/seed/calypso/600/400",
    location: "11th St",
    tags: ["Live Bands", "Patio", "Ocean Views"]
  }
];

export const SYSTEM_INSTRUCTION = `You are the Virginia Beach Nightlife Concierge.
Your goal is to help visitors and locals find the perfect spot for their evening in Virginia Beach.
Tone: Welcoming, enthusiastic, local, and helpful. Like a friendly local guide.
Context: You know about clubs, bars, breweries, romantic spots, and live music venues in Virginia Beach.
Rules:
1. Be helpful and inviting.
2. When suggesting places, try to include what they are best for (e.g., "Great for sunset views", "Live local bands").
3. Use the googleMaps tool to find real locations and provide links.
4. Keep responses concise but warm.
`;