import { HiXMark } from "react-icons/hi2";
import type { Trip, TripInvitation } from "../../types/types";
import Button from "../../ui/Button";
import { useState } from "react";
import { useAuthContext } from "../../store/Auth-context";
import { useAddTripInvitation } from "./useTripInvitations";

type InviteFriendsProps = {
  setIsInviteOpen: (isOpen: boolean) => void;
  trip: Trip | null | undefined;
};

export default function InviteFriends({
  setIsInviteOpen,
  trip,
}: InviteFriendsProps) {
  const [email, setEmail] = useState("");
  const { user } = useAuthContext();
  const { isCreating, createNewTripInvitation } = useAddTripInvitation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !trip) {
      return;
    }
    const newTripInvitation: TripInvitation = {
      invited_by_email: user?.email || "",
      invited_by_id: user?.id || "",
      trip_id: trip.id,
      invitee_email: email,
      status: "pending",
      trip_city: trip.start_city, // Assuming trip_city is the start city
    };
    createNewTripInvitation(newTripInvitation);

    setIsInviteOpen(false);
  }

  return (
    <div className="fixed flex h-full w-full top-0 left-0 backdrop-blur-sm items-center justify-center z-10">
      <div className="flex flex-col justify-center items-center w-100 bg-white rounded-lg shadow-lg p-4 relative">
        <HiXMark
          className="hover:cursor-pointer text-red-600 text-xl absolute left-2 top-2"
          onClick={() => setIsInviteOpen(false)}
        />
        <h1 className="font-bold text-2xl">Invite friends on this trip</h1>
        <h2 className="text-lg font-semibold text-center mb-2">
          🧳 <span className="capitalize">{trip?.start_city}</span> to{" "}
          <span className="capitalize">{trip?.end_city}</span> ✈️
        </h2>

        <p className="text-xs text-center mt-2 mb-4">
          Send this trip to your friends by entering their Email below
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-3 items-center justify-center"
        >
          <input
            className="bg-sky-100 p-2 rounded w-9/10"
            type="email"
            placeholder="Friend's Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button disabled={isCreating} type="primary">
            Send Invite
          </Button>
        </form>
      </div>
    </div>
  );
}
