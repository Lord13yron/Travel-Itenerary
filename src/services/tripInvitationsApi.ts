import type { TripInvitation } from "../types/types";
import supabase from "./supaBase";

export async function insertTripInvitation(newTripInvitation: TripInvitation) {
  const { data, error } = await supabase
    .from("trip_invitations")
    .insert([newTripInvitation])
    .select();

  // if (error) throw new Error(error.message);

  if (error) {
    // Check if this is a unique violation error
    if (error.code === "23505") {
      // This is a duplicate - user is already part of this trip
      throw new Error(`That User is already part of this trip.`);
    }
    // Handle other errors
    throw new Error(`Error adding user to trip: ${error.message}`);
  }

  return data[0] as TripInvitation;
}

export async function getSentTripInvitations(SentUserId: string) {
  const { data, error } = await supabase
    .from("trip_invitations")
    .select("*")
    .eq("invited_by_id", SentUserId);

  if (error) throw new Error(error.message);

  return data as TripInvitation[];
}

export async function getReceivedTripInvitations(ReceivedUserEmail: string) {
  const { data, error } = await supabase
    .from("trip_invitations")
    .select("*")
    .eq("invitee_email", ReceivedUserEmail);

  if (error) throw new Error(error.message);

  return data as TripInvitation[];
}

export async function deleteTripInvitation(invitationId: number) {
  const { error } = await supabase
    .from("trip_invitations")
    .delete()
    .eq("id", invitationId)
    .select();

  if (error) throw new Error(error.message);
}

export async function updateTripInvitationStatus(
  invitationId: number,
  status: "accepted" | "declined" | "pending" | "completed"
) {
  const { error } = await supabase
    .from("trip_invitations")
    .update({ status })
    .eq("id", invitationId)
    .select();

  if (error) throw new Error(error.message);
}

export async function getTripInvitationsByTripId(tripId: number) {
  const { data, error } = await supabase
    .from("trip_invitations")
    .select("*")
    .eq("trip_id", tripId);

  if (error) throw new Error(error.message);

  return data as TripInvitation[];
}
