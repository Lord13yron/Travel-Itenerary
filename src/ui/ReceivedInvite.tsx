import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import type { TripInvitation } from "../types/types";
import Button from "./Button";
import { useUpdateTripInvitationStatus } from "../features/Trips/useTripInvitations";
import { useAddUserToTrip, useTripById } from "../features/Trips/useTrips";
import { useAuthContext } from "../store/Auth-context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type InviteProps = {
  invite: TripInvitation;
};

export default function ReceivedInvite({ invite }: InviteProps) {
  const { isUpdating, updateInvitationStatus } =
    useUpdateTripInvitationStatus();
  const { isAdding, addtoTrip } = useAddUserToTrip();
  const { isLoading, trip } = useTripById(invite.trip_id);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <li className="bg-slate-200 p-2 flex flex-col gap-1 justify-center items-center mb-2 shadow-md text-center">
        <p>Loading...</p>
      </li>
    );
  }

  function handleAccept() {
    if (!trip) return;

    addtoTrip({
      tripId: trip.id,
      userId: user?.id || "",
    });
    // After accepting the invitation, delete it
    updateInvitationStatus({
      id: Number(invite.id),
      status: "accepted",
    });
    navigate(`/trip/${trip.id}`);
  }

  function handleDecline() {
    updateInvitationStatus({
      id: Number(invite.id),
      status: "declined",
    });
    toast.success("Trip Invitation has been declined");
  }

  return (
    <li className="bg-slate-200 p-2 flex flex-col gap-1 justify-center items-center mb-2 shadow-md text-center">
      <p className="text-sm">
        <span className="font-bold">{invite.invited_by_email}</span> has invited
        you on a trip to{" "}
        <span className="font-bold capitalize">{invite.trip_city}</span>
      </p>
      <div className="flex justify-center gap-2 items-center">
        <Button
          disabled={isAdding || isUpdating}
          onClick={handleAccept}
          type="success"
        >
          <div className="flex items-center gap-1">
            Accept
            <HiCheckCircle className="text-xl" />
          </div>
        </Button>

        <Button disabled={isUpdating} onClick={handleDecline} type="secondary">
          <div className="flex items-center gap-1">
            Decline
            <HiXCircle className="text-xl" />
          </div>
        </Button>
      </div>
    </li>
  );
}
