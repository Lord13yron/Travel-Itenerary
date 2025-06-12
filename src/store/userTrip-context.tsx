import { createContext, useContext, type ReactNode } from "react";
import {
  useSentTripInvitations,
  useReceivedTripInvitations,
} from "../features/Trips/useTripInvitations";
import { useAuthContext } from "./Auth-context";
import { useTripByUserId } from "../features/Trips/useTrips";
import type { Trip, TripInvitation } from "../types/types";

// Define the context type
type TripContextType = {
  trips: Trip[] | undefined;
  sentInvitations: TripInvitation[] | undefined;
  receivedInvitations: TripInvitation[] | undefined;
  isLoading: boolean;
  error: Error | null;
};

// Create the context
const TripContext = createContext<TripContextType | undefined>(undefined);

// Provider component
export function TripProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const userId = user?.id || "";
  const userEmail = user?.email || "";

  // Load all trips for the current user
  const {
    trips,
    isLoading: isLoadingTrips,
    error: tripsError,
  } = useTripByUserId(userId);

  // Load sent invitations
  const {
    sentTripInvitations: sentInvitations,
    isLoading: isLoadingSent,
    error: sentError,
  } = useSentTripInvitations(userId);

  // Load received invitations
  const {
    receivedTripInvitations: receivedInvitations,
    isLoading: isLoadingReceived,
    error: receivedError,
  } = useReceivedTripInvitations(userEmail);

  // Combine loading states and errors
  const isLoading = isLoadingTrips || isLoadingSent || isLoadingReceived;
  const error = tripsError || sentError || receivedError;

  const contextValue = {
    trips,
    sentInvitations,
    receivedInvitations,
    isLoading,
    error,
  };

  return (
    <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>
  );
}

// Custom hook to use the trip context
// eslint-disable-next-line react-refresh/only-export-components
export function useTripContext() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
}
