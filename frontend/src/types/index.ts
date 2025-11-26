export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface Caravan {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  location: string;
  rating: number;
  images: string[];
  owner: User;
  amenities?: string[];
  bookedDates?: { start: string; end: string }[];
}

export interface Booking {
  id: string;
  caravan: Caravan;
  user: User;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Review {
  id: string;
  caravan: Caravan;
  user: User;
  rating: number;
  comment: string;
  date: Date;
}
