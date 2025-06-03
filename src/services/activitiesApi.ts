import type { Activity, NewActivity, Update } from "../types/types";
import supabase from "./supaBase";

export async function getActivitiesByTripId(
  tripId: string
): Promise<Activity[]> {
  const { data: activities, error } = await supabase
    .from("activities")
    .select("*")
    .eq("trip_id", tripId)
    .order("position", { ascending: true });

  if (error) {
    throw new Error(`Error fetching trip: ${error.message}`);
  }
  return activities as Activity[];
}

export async function createActivity(
  activity: Omit<Activity, "id">
): Promise<Activity> {
  const { data, error } = await supabase
    .from("activities")
    .insert([activity])
    .select();

  if (error) {
    throw new Error(`Error creating activity: ${error.message}`);
  }
  return data[0] as Activity;
}

export async function deleteActivity(id: number): Promise<void> {
  const { error } = await supabase.from("activities").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting activity: ${error.message}`);
  }
}

export async function updateActivity(
  id: number,
  activity: NewActivity
): Promise<Activity> {
  const { data, error } = await supabase
    .from("activities")
    .update(activity)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Error updating activity: ${error.message}`);
  }
  return data[0] as Activity;
}

export async function updateActivities(update: Update) {
  const { error } = await supabase
    .from("activities")
    .update({
      day_number: update.day_number,
      position: update.position,
    })
    .eq("id", update.id);

  if (error) throw new Error(error.message);
}
