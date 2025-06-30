import React, { createContext, useContext, useState } from 'react';
import { Booking, MeetingType, AvailabilitySlot } from '../types';
import { addDays, startOfDay, addHours, format } from 'date-fns';

interface BookingContextType {
  bookings: Booking[];
  meetingTypes: MeetingType[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Booking>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  cancelBooking: (id: string, reason?: string) => Promise<void>;
  getAvailability: (date: Date, meetingTypeId: string) => AvailabilitySlot[];
  createMeetingType: (meetingType: Omit<MeetingType, 'id'>) => Promise<MeetingType>;
  updateMeetingType: (id: string, updates: Partial<MeetingType>) => Promise<void>;
  deleteMeetingType: (id: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Mock data
const mockMeetingTypes: MeetingType[] = [
  {
    id: '1',
    name: 'Quick Consultation',
    description: 'A brief 15-minute consultation to discuss your needs.',
    duration: 15,
    location: { type: 'virtual', details: 'Zoom meeting link will be provided', platform: 'zoom' },
    questions: [
      { id: '1', type: 'text', label: 'What would you like to discuss?', required: true },
      { id: '2', type: 'select', label: 'How did you hear about us?', required: false, options: ['Google', 'Referral', 'Social Media', 'Other'] },
    ],
    bufferTime: 5,
    color: '#3b82f6',
    isActive: true,
    requiresApproval: false,
  },
  {
    id: '2',
    name: 'Strategy Session',
    description: 'In-depth 60-minute strategy session to plan your project.',
    duration: 60,
    price: 150,
    currency: 'USD',
    location: { type: 'virtual', details: 'Google Meet link will be provided', platform: 'meet' },
    questions: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'textarea', label: 'Describe your current challenges', required: true },
      { id: '3', type: 'text', label: 'What is your budget range?', required: false },
    ],
    bufferTime: 15,
    color: '#10b981',
    isActive: true,
    requiresApproval: true,
  },
  {
    id: '3',
    name: 'Phone Call',
    description: 'Traditional phone consultation.',
    duration: 30,
    location: { type: 'phone', details: 'I will call you at the provided number' },
    questions: [
      { id: '1', type: 'phone', label: 'Phone Number', required: true },
      { id: '2', type: 'text', label: 'Best time to call', required: false },
    ],
    bufferTime: 10,
    color: '#f59e0b',
    isActive: true,
    requiresApproval: false,
  },
];

const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    meetingTypeId: '1',
    attendee: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      company: 'Tech Startup Inc.',
      timezone: 'America/New_York',
    },
    startTime: addHours(startOfDay(addDays(new Date(), 1)), 10),
    endTime: addHours(startOfDay(addDays(new Date(), 1)), 10.25),
    timezone: 'America/New_York',
    status: 'confirmed',
    location: { type: 'virtual', details: 'https://zoom.us/j/123456789', platform: 'zoom' },
    responses: { '1': 'Discuss new product launch strategy' },
    createdAt: new Date(),
    updatedAt: new Date(),
    remindersSent: [],
  },
];

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>(mockMeetingTypes);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates, updatedAt: new Date() } : booking
    ));
  };

  const cancelBooking = async (id: string, reason?: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id 
        ? { ...booking, status: 'cancelled' as const, cancellationReason: reason, updatedAt: new Date() }
        : booking
    ));
  };

  const getAvailability = (date: Date, meetingTypeId: string): AvailabilitySlot[] => {
    const meetingType = meetingTypes.find(mt => mt.id === meetingTypeId);
    if (!meetingType) return [];

    const slots: AvailabilitySlot[] = [];
    const dayStart = startOfDay(date);
    
    // Generate slots from 9 AM to 5 PM (mock working hours)
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStart = addHours(dayStart, hour);
        slotStart.setMinutes(minute);
        const slotEnd = new Date(slotStart.getTime() + meetingType.duration * 60000);
        
        // Check if slot conflicts with existing bookings
        const hasConflict = bookings.some(booking => 
          booking.status === 'confirmed' &&
          ((slotStart >= booking.startTime && slotStart < booking.endTime) ||
           (slotEnd > booking.startTime && slotEnd <= booking.endTime))
        );

        slots.push({
          start: slotStart,
          end: slotEnd,
          available: !hasConflict,
          meetingTypeId,
        });
      }
    }

    return slots;
  };

  const createMeetingType = async (meetingTypeData: Omit<MeetingType, 'id'>): Promise<MeetingType> => {
    const newMeetingType: MeetingType = {
      ...meetingTypeData,
      id: Date.now().toString(),
    };
    setMeetingTypes(prev => [...prev, newMeetingType]);
    return newMeetingType;
  };

  const updateMeetingType = async (id: string, updates: Partial<MeetingType>) => {
    setMeetingTypes(prev => prev.map(mt => 
      mt.id === id ? { ...mt, ...updates } : mt
    ));
  };

  const deleteMeetingType = async (id: string) => {
    setMeetingTypes(prev => prev.filter(mt => mt.id !== id));
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      meetingTypes,
      createBooking,
      updateBooking,
      cancelBooking,
      getAvailability,
      createMeetingType,
      updateMeetingType,
      deleteMeetingType,
    }}>
      {children}
    </BookingContext.Provider>
  );
};