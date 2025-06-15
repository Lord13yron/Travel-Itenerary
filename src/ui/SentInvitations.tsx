import { HiXCircle } from "react-icons/hi2";
import Button from "./Button";
import type { TripInvitation } from "../types/types";
import toast from "react-hot-toast";
import {
  useDeleteTripInvitation,
  useUpdateTripInvitationStatus,
} from "../features/Trips/useTripInvitations";

type InviteProps = {
  invite: TripInvitation;
};

export default function SentInvitations({ invite }: InviteProps) {
  const { isDeleting, deleteTripInvitationById } = useDeleteTripInvitation();
  const { isUpdating, updateInvitationStatus } =
    useUpdateTripInvitationStatus();

  function handleRemove() {
    if (invite.status === "accepted") {
      updateInvitationStatus({
        id: Number(invite.id),
        status: "completed",
      });
    } else deleteTripInvitationById(Number(invite.id));
    toast.success("Trip Invitation has been removed");
  }

  return (
    <li className="bg-slate-200 p-2 flex flex-col gap-1  mb-2 shadow-md text-center">
      <p className="text-sm border-b border-slate-400 pb-2">
        You have invited{" "}
        <span className="font-bold">{invite.invitee_email} </span>
        on a trip to{" "}
        <span className="font-bold capitalize">{invite.trip_city}</span>
      </p>
      <div className="flex justify-between gap-2 items-center">
        <p className="font-bold">
          Status: <span className="font-normal italic">{invite.status}</span>
        </p>
        <Button
          disabled={isDeleting || isUpdating}
          onClick={handleRemove}
          type="secondary"
        >
          <div className="flex items-center gap-1">
            <h2>Remove</h2>
            <HiXCircle className="text-xl" />
          </div>
        </Button>
      </div>
    </li>
  );
}
