import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTripInvitation,
  getReceivedTripInvitations,
  getSentTripInvitations,
  getTripInvitationsByTripId,
  insertTripInvitation,
  updateTripInvitationStatus,
} from "../../services/tripInvitationsApi";
import toast from "react-hot-toast";

export function useAddTripInvitation() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createNewTripInvitation } =
    useMutation({
      mutationFn: insertTripInvitation,
      onSuccess: () => {
        toast.success("Trip invitation sent successfully!");
        queryClient.invalidateQueries({
          queryKey: ["trip_invitations"],
        });
      },
      onError: (error) => toast.error(error.message),
    });

  return { createNewTripInvitation, isCreating };
}

export function useSentTripInvitations(id: string) {
  const {
    data: sentTripInvitations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip_invitations", id],
    queryFn: () => getSentTripInvitations(id),
  });
  return { sentTripInvitations, isLoading, error };
}

export function useReceivedTripInvitations(email: string) {
  const {
    data: receivedTripInvitations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip_invitations", email],
    queryFn: () => getReceivedTripInvitations(email),
  });
  return { receivedTripInvitations, isLoading, error };
}

export function useDeleteTripInvitation() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteTripInvitationById } =
    useMutation({
      mutationFn: (id: number) => deleteTripInvitation(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["trip_invitations"],
        });
      },
      onError: (error) => toast.error(error.message),
    });
  return { isDeleting, deleteTripInvitationById };
}

export function useUpdateTripInvitationStatus() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateInvitationStatus } = useMutation(
    {
      mutationFn: ({
        id,
        status,
      }: {
        id: number;
        status: "accepted" | "declined" | "pending" | "completed";
      }) => updateTripInvitationStatus(id, status),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["trip_invitations"],
        });
      },
      onError: (error) => toast.error(error.message),
    }
  );

  return { isUpdating, updateInvitationStatus };
}

export function useTripInvitationByTripId(tripId: number) {
  const {
    data: tripInvitations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip_invitations", tripId],
    queryFn: () => getTripInvitationsByTripId(tripId),
  });
  return { tripInvitations, isLoading, error };
}
