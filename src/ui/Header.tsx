import { useNavigate } from "react-router-dom";
import { usePlanningContext } from "../store/planning-context";
import Button from "./Button";
import { useAuthContext } from "../store/Auth-context";
import { HiUserCircle } from "react-icons/hi2";
import { useEffect, useMemo, useRef, useState } from "react";
import Invitations from "./Invitations";
import { useTripContext } from "../store/userTrip-context";
import toast from "react-hot-toast";
import { useClickOutside } from "../utils/helpers";
import Tooltip from "./Tooltip";

export default function Header() {
  const { setIsPlanning } = usePlanningContext();
  const { user, isAuthenticated } = useAuthContext();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const navigate = useNavigate();
  const { sentInvitations, receivedInvitations } = useTripContext();

  const toggleRef = useRef<HTMLDivElement>(null!);
  const iconRef = useRef<HTMLDivElement>(null!);
  useClickOutside(toggleRef, iconRef, () => setIsInviteOpen(false));

  const shownReceivedInvites = useMemo(
    () =>
      receivedInvitations?.filter(
        (invitation) => invitation.status === "pending"
      ) || [],
    [receivedInvitations]
  );
  const invitesCount =
    (sentInvitations ? sentInvitations.length : 0) +
    (shownReceivedInvites ? shownReceivedInvites.length : 0);

  useEffect(() => {
    // Check if there are new invitations when the component mounts
    if (shownReceivedInvites && shownReceivedInvites.length > 0) {
      toast.success(
        `You have ${shownReceivedInvites.length} trip invitation${
          shownReceivedInvites.length > 1 ? "s" : ""
        }! Click on the profile icon to view them.`,
        {
          duration: 3000,
          position: "top-center",
        }
      );
    }
  }, [shownReceivedInvites]);

  return (
    <header className="flex items-center justify-between p-3 ">
      <img
        onClick={() => navigate("/")}
        className="w-26 h-16 hover:cursor-pointer "
        src="/Logo2.jpeg"
        alt="L13 travel logo"
      />
      <div className="flex gap-4 items-center relative">
        {isInviteOpen && (
          <Invitations
            setIsInviteOpen={setIsInviteOpen}
            toggleRef={toggleRef}
          />
        )}
        <Button
          onClick={
            isAuthenticated
              ? () => setIsPlanning(true)
              : () => navigate("/login")
          }
          type="transparent"
        >
          Plan a Trip
        </Button>
        {!user ? (
          <Button onClick={() => navigate("/login")} type="primary">
            Log in
          </Button>
        ) : (
          <div ref={iconRef}>
            {invitesCount > 0 && (
              // <div className="relative group">
              //   <div
              //     onClick={() => setIsInviteOpen(!isInviteOpen)}
              //     className="flex items-center justify-center rounded-[50%] bg-red-700 p-3 w-4 h-4 absolute top-[-13px] right-[-11px] text-white text-[10px] font-bold hover:cursor-pointer hover:bg-red-400 transition-colors duration-300 "
              //   >
              //     {invitesCount > 99 ? "99+" : invitesCount}
              //   </div>
              //   <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 right-5  bottom-full whitespace-nowrap z-10">
              //     Invites
              //   </div>
              // </div>
              <Tooltip tooltipName="Invites" position="left">
                <div
                  onClick={() => setIsInviteOpen(!isInviteOpen)}
                  className="flex items-center justify-center rounded-[50%] bg-red-700 p-3 w-4 h-4 absolute top-[-13px] right-[-11px] text-white text-[10px] font-bold hover:cursor-pointer hover:bg-red-400 transition-colors duration-300 "
                >
                  {invitesCount > 99 ? "99+" : invitesCount}
                </div>
              </Tooltip>
            )}
            {/* <div className="relative group">
              <HiUserCircle
                onClick={() => setIsInviteOpen(!isInviteOpen)}
                className="text-4xl text-sky-800 hover:cursor-pointer hover:text-sky-600 transition-colors duration-300"
              />
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 right-5  whitespace-nowrap z-10">
                Profile
              </div>
            </div> */}
            <Tooltip tooltipName="Profile" position="bottom">
              <HiUserCircle
                onClick={() => setIsInviteOpen(!isInviteOpen)}
                className="text-4xl text-sky-800 hover:cursor-pointer hover:text-sky-600 transition-colors duration-300"
              />
            </Tooltip>
          </div>
        )}
      </div>
    </header>
  );
}
