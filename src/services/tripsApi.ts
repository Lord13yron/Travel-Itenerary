import type { NewTrip, Trip } from "../types/types";
import supabase from "./supaBase";

export async function getTrips(): Promise<Trip[]> {
  const { data: trips, error } = await supabase.from("Trips").select("*");

  if (error) {
    throw new Error(`Error fetching Trips: ${error.message}`);
  }
  return trips as Trip[];
}

// export async function createTrip(trip: Omit<Trip, "id">): Promise<Trip> {
//   const { data, error } = await supabase.from("Trips").insert([trip]).select();
//   if (error) {
//     throw new Error(`Error adding trip: ${error.message}`);
//   }
//   return data[0] as Trip;
// }

export async function createTrip(
  trip: Omit<Trip, "id">,
  userId: string
): Promise<void> {
  const { data, error } = await supabase.from("Trips").insert([trip]).select();
  if (error) {
    throw new Error(`Error adding trip: ${error.message}`);
  }
  // return data[0] as Trip;
  if (!data || data.length === 0) {
    throw new Error("No trip data returned from the insert operation.");
  }
  const { error: error2 } = await supabase
    .from("trip_users")
    .insert([{ trip_id: data[0].id, user_id: userId }])
    .select();
  if (error2) {
    throw new Error(`Error adding trip: ${error2.message}`);
  }
}

// export async function deleteTrip(id: number): Promise<void> {
//   const { error } = await supabase.from("Trips").delete().eq("id", id);

//   if (error) {
//     throw new Error(`Error adding trip: ${error.message}`);
//   }
// }
export async function deleteTrip(id: number, userId: string): Promise<void> {
  // First, delete the user's connection to this trip
  const { error: deleteConnectionError } = await supabase
    .from("trip_users")
    .delete()
    .eq("trip_id", id)
    .eq("user_id", userId);

  if (deleteConnectionError) {
    throw new Error(
      `Error removing user from trip: ${deleteConnectionError.message}`
    );
  }

  // Check if any other users are still connected to this trip
  const { data: remainingConnections, error: checkError } = await supabase
    .from("trip_users")
    .select("*")
    .eq("trip_id", id);

  if (checkError) {
    throw new Error(
      `Error checking remaining trip users: ${checkError.message}`
    );
  }

  // Only delete the trip if no users remain connected to it
  if (remainingConnections.length === 0) {
    const { error: deleteTripError } = await supabase
      .from("Trips")
      .delete()
      .eq("id", id);

    if (deleteTripError) {
      throw new Error(`Error deleting trip: ${deleteTripError.message}`);
    }
  }
}

export async function updateTrip(id: number, trip: NewTrip): Promise<Trip> {
  const { data, error } = await supabase
    .from("Trips")
    .update(trip)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Error updating trip: ${error.message}`);
  }
  return data[0] as Trip;
}

export async function getTripById(id: number): Promise<Trip | null> {
  const { data, error } = await supabase
    .from("Trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching trip: ${error.message}`);
  }
  return data as Trip;
}

export async function getTripsByUserId(userId: string): Promise<Trip[]> {
  if (userId === "") return [];
  const { data: trips, error } = await supabase
    .from("trip_users")
    .select(`*, Trips(*)`)
    .eq("user_id", userId);

  if (error) {
    throw new Error(
      `Error fetching Trips for user ${userId}: ${error.message}`
    );
  }
  // Extract the trip objects from the nested response
  const formattedTrips = trips?.map((item) => item.Trips) || [];
  return formattedTrips as Trip[];
}

export async function addUserToTrip(tripId: number, userId: string) {
  const { error } = await supabase
    .from("trip_users")
    .insert([{ trip_id: tripId, user_id: userId }])
    .select();
  if (error) {
    throw new Error(`Error adding trip: ${error.message}`);
  }
}
