import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTrips,
  createTrip,
  deleteTrip,
  updateTrip,
  getTripById,
  getTripsByUserId,
  addUserToTrip,
} from "../../services/tripsApi";
import toast from "react-hot-toast";
import type { NewTrip, Trip } from "../../types/types";

export function useTrips() {
  const {
    data: trips,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Trips"],
    queryFn: () => getTrips(),
  });
  return { trips, isLoading, error };
}

export function useAddTrip() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createNewTrip } = useMutation({
    mutationFn: (payload: { newTrip: Omit<Trip, "id">; userId: string }) =>
      createTrip(payload.newTrip, payload.userId),
    onSuccess: () => {
      toast.success("Trip created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Trips"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createNewTrip };
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteTripById } = useMutation({
    mutationFn: ({ id, userId }: { id: number; userId: string }) =>
      deleteTrip(id, userId),
    onSuccess: () => {
      toast.success("Trip deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Trips"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteTripById };
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateTripById } = useMutation({
    mutationFn: ({ id, trip }: { id: number; trip: NewTrip }) =>
      updateTrip(id, trip),
    onSuccess: () => {
      toast.success("Trip updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Trips"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateTripById };
}

export function useTripById(id: number) {
  const {
    data: trip,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Trips", id],
    queryFn: () => getTripById(id),
  });
  return { trip, isLoading, error };
}

export function useTripByUserId(userId: string) {
  const {
    data: trips,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Trips", "user", userId],
    queryFn: () => getTripsByUserId(userId),
  });
  return { trips, isLoading, error };
}

export function useAddUserToTrip() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: addtoTrip } = useMutation({
    mutationFn: (payload: { tripId: number; userId: string }) =>
      addUserToTrip(payload.tripId, payload.userId),
    onSuccess: () => {
      toast.success("You have been added to the trip!");
      queryClient.invalidateQueries({
        queryKey: ["Trips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["trip_users"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isAdding, addtoTrip };
}
