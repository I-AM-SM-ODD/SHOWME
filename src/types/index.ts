export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  profileImage?: string;
  video?: string;
  resume?: string;
  services: Service[];
  skills: string[];
  socialLinks: SocialLinks;
  contactInfo: ContactInfo;
  testimonials: Testimonial[];
}

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  behance?: string;
}

export interface ContactInfo {
  email: string;
  whatsapp?: string;
  calendly?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
}

export interface Invoice {
  clientName: string;
  clientEmail: string;
  service: string;
  price: string;
  description: string;
  date: string;
  invoiceNumber: string;
}