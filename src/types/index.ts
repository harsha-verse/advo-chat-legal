export interface User {
  id: string;
  email: string;
  type: 'user' | 'lawyer';
  name?: string;
  licenseNumber?: string;
  specialization?: string;
  experience?: number;
  consultationFee?: number;
  photo?: string;
  rating?: number;
  reviews?: Review[];
  verified?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  language: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot' | 'lawyer';
  timestamp: string;
  attachments?: string[];
}

export interface Consultant {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  fee: number;
  rating: number;
  photo: string;
  verified: boolean;
  description: string;
}