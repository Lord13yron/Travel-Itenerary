import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createActivity,
  deleteActivity,
  getActivitiesByTripId,
  updateActivities as updateActivitiesApi,
  updateActivity,
} from "../../services/activitiesApi";
import toast from "react-hot-toast";
import type { NewActivity, Update } from "../../types/types";

export function useActivitiesByTripId(id: string) {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activities", "Trips", id],
    queryFn: () => getActivitiesByTripId(id),
  });
  return { activities, isLoading, error };
}

export function useAddActivity() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createNewActivity } = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      toast.success("Activity created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { createNewActivity, isCreating };
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteActivityById } = useMutation({
    mutationFn: (id: number) => deleteActivity(id),
    onSuccess: () => {
      toast.success("Activity deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteActivityById };
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateActivityById } = useMutation({
    mutationFn: ({ id, activity }: { id: number; activity: NewActivity }) =>
      updateActivity(id, activity),
    onSuccess: () => {
      toast.success("Activity updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateActivityById };
}

export function useUpdateActivities() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateActivities } = useMutation({
    mutationFn: (update: Update) => updateActivitiesApi(update),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateActivities };
}
