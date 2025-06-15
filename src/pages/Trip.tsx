import { useParams, useNavigationType } from "react-router-dom";
import { useTripById } from "../features/Trips/useTrips";
import { formatDate, getDaysBetweenDates } from "../utils/helpers";
import { useActivitiesByTripId } from "../features/Activities/useActivities";
import { useEffect, useRef, useState } from "react";
import TripItinerary from "../store/DragDrop-context";
import type { Activity } from "../types/types";
import Button from "../ui/Button";
import InviteFriends from "../features/Trips/InviteFriends";
import { HiUserPlus } from "react-icons/hi2";

export default function Trip() {
  const tripId = useParams().tripId;
  const navigationType = useNavigationType();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const { trip, isLoading: isLoadingTrips } = useTripById(Number(tripId));
  const { activities, isLoading: isLoadingActivities } = useActivitiesByTripId(
    tripId ? tripId : ""
  );

  const totalCost = activities?.reduce(
    (acc, activity) => acc + (activity.cost || 0),
    0
  );

  // Scroll to top on navigation
  useEffect(() => {
    const scrollToTop = () => {
      // Try multiple approaches to ensure scrolling works
      window.scrollTo(0, 0);

      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }

      // Try to scroll the main content area in AppLayout
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }

      // Try to find any scrollable parent
      const scrollableParents = document.querySelectorAll(
        '[style*="overflow"]'
      );
      scrollableParents.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.scrollTop = 0;
        }
      });
    };

    // Try immediately
    scrollToTop();

    // Also try after a small delay to ensure DOM is fully ready
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [tripId, navigationType]);

  const numberOfDays =
    trip?.start_date && trip.end_date
      ? getDaysBetweenDates(trip?.start_date, trip?.end_date)
      : 0;

  const daysArray =
    trip?.start_date && trip?.end_date
      ? Array.from({ length: numberOfDays + 1 }, (_, index) => {
          const date = new Date(trip.start_date!);
          date.setDate(date.getDate() + index);
          return {
            dayNumber: index,
            date: date,
          };
        })
      : [];

  if (isLoadingTrips || isLoadingActivities) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center h-full w-full bg-stone-100 overflow-auto"
    >
      <div className="flex items-center gap-2 justify-between w-full px-4 fixed bottom-0 bg-sky-100 z-10 p-4 border-t border-stone-300">
        <Button onClick={() => setIsInviteOpen(true)} type="secondary">
          <div className="flex items-center gap-2">
            <HiUserPlus className="text-xl" />
            Invite
          </div>
        </Button>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm md:text-lg">Total Cost:</h2>
          <p className="bg-slate-500 w-fit px-2 py-1 text-slate-50 rounded-md font-bold">
            ${" "}
            {totalCost?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full  bg-stone-100">
        <h1 className="text-2xl font-extrabold mt-8">
          <span className="capitalize">{trip?.start_city}</span> to{" "}
          <span className="capitalize">{trip?.end_city}</span>
        </h1>
        <h2 className="text-sm italic mb-4">
          {formatDate(trip?.start_date ? trip.start_date : "")} -{" "}
          {formatDate(trip?.end_date ? trip.end_date : "")}
        </h2>
        {/* <Button onClick={() => setIsInviteOpen(true)} type="secondary">
          <div className="flex items-center gap-2">
            <HiUserPlus className="text-xl" />
            Invite Friends
          </div>
        </Button> */}
        {isInviteOpen && (
          <InviteFriends setIsInviteOpen={setIsInviteOpen} trip={trip} />
        )}
      </div>

      <TripItinerary
        days={daysArray}
        activitiesByDay={daysArray.reduce<Record<number, Activity[]>>(
          (acc, day) => {
            return {
              ...acc,
              [day.dayNumber]:
                activities?.filter(
                  (activity) => activity.day_number === day.dayNumber
                ) || [],
            };
          },
          {}
        )}
      />
    </div>
  );
}
