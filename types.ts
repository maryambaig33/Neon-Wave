export interface Venue {
  id: string;
  name: string;
  description: string;
  category: 'Club' | 'Bar' | 'Live Music' | 'Lounge' | 'Brewery';
  rating: number;
  imageUrl: string;
  location: string;
  tags: string[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        content: string;
      }[];
    }[];
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  groundingChips?: GroundingChunk[];
}
