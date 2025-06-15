import { useState, type RefObject } from "react";

import { useTripContext } from "../store/userTrip-context";
import ReceivedInvite from "./ReceivedInvite";
import SentInvitations from "./SentInvitations";
import { useAuthContext } from "../store/Auth-context";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

type InvitationsProps = {
  setIsInviteOpen: (isOpen: boolean) => void;
  toggleRef?: RefObject<HTMLDivElement>;
};

export default function Invitations({
  setIsInviteOpen,
  toggleRef,
}: InvitationsProps) {
  const { isLoading, sentInvitations, receivedInvitations } = useTripContext();
  const [inviteToggle, setInviteToggle] = useState<"received" | "sent">(
    "received"
  );
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const shownReceivedInvites =
    receivedInvitations?.filter(
      (invitation) => invitation.status === "pending"
    ) || [];

  const shownSentInvites =
    sentInvitations?.filter(
      (invitation) =>
        invitation.status === "pending" ||
        invitation.status === "accepted" ||
        invitation.status === "declined"
    ) || [];

  function handleChangePW() {
    setIsInviteOpen(false);
    navigate("/reset-password");
  }

  if (isLoading) {
    return (
      <div className="absolute top-10 right-32 bg-slate-100 border border-slate-300 w-40 h-40 z-10 shadow-lg rounded-lg p-4">
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={toggleRef}
      className="absolute flex flex-col justify-center items-center top-15 right-[-12px] bg-slate-100 border border-slate-300 z-10 shadow-lg rounded-sm p-4 w-screen sm:w-85"
    >
      <h1 className="font-semibold">{user?.email}</h1>
      <p
        onClick={handleChangePW}
        className="text-xs underline text-sky-700 hover:cursor-pointer hover:text-sky-600"
      >
        Change Password
      </p>
      <div className="flex justify-between items-center mb-4 text-sm bg-sky-700 rounded-4xl hover:cursor-pointer font-extralight w-80 mt-4">
        <h1
          className={`${
            inviteToggle === "received" &&
            "bg-sky-200 text-sky-900  font-bold shadow-md shadow-sky-700"
          }  p-3 rounded-2xl  text-sky-50 `}
          onClick={() => setInviteToggle("received")}
        >
          Received Invites{" "}
          <span className="bg-sky-50 rounded-3xl px-1 text-sky-900 font-bold ms-1">
            {shownReceivedInvites?.length || 0}
          </span>
        </h1>
        <h1
          className={`${
            inviteToggle === "sent" &&
            "bg-sky-200 text-sky-900 font-bold shadow-md shadow-sky-700"
          } px-6 py-3 rounded-2xl  text-sky-50 `}
          onClick={() => setInviteToggle("sent")}
        >
          Sent Invites{" "}
          <span className="bg-sky-50 rounded-3xl px-1 text-sky-900 font-bold ms-1">
            {shownSentInvites?.length || 0}
          </span>
        </h1>
      </div>

      {inviteToggle === "sent" ? (
        <ul className=" list-inside border-b border-slate-400 w-full p-2">
          {shownSentInvites?.length === 0 && (
            <p className="text-center text-gray-500">No sent invites</p>
          )}
          {shownSentInvites?.map((invite) => (
            <SentInvitations key={invite.id} invite={invite} />
          ))}
        </ul>
      ) : (
        <ul className=" list-inside border-b border-slate-400 w-full p-2">
          {shownReceivedInvites?.length === 0 && (
            <p className="text-center text-gray-500">No received invites</p>
          )}
          {shownReceivedInvites?.map((invite) => (
            <ReceivedInvite key={invite.id} invite={invite} />
          ))}
        </ul>
      )}
      <div className="flex justify-end w-full mt-4">
        <Button
          type="primary"
          onClick={() => {
            logout();
            setIsInviteOpen(false);
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
