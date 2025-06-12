import { HiXMark } from "react-icons/hi2";
import PlanningForm from "./PlanningForm";
import { usePlanningContext } from "../../store/planning-context";
import { useTrips } from "../Trips/useTrips";

export default function StartPlanning() {
  const { setIsPlanning, isPlanning, setTripId, tripId } = usePlanningContext();
  const { trips, isLoading } = useTrips();
  const trip = trips?.find((trip) => trip.id === tripId);

  const isEditing = tripId > 0;

  return (
    <div
      className={`
        w-full bg-sky-50 absolute bottom-0 left-0 z-50
        transition-[height] duration-500 ease-in-out overflow-auto
        ${isPlanning ? "h-full" : "h-0"}
      `}
    >
      {isPlanning && (
        <>
          {isLoading && <div>loading...</div>}
          <HiXMark
            onClick={() => {
              setIsPlanning(!isPlanning);
              setTripId(0);
            }}
            className="text-red-600 text-xl mt-2 mx-2 hover:cursor-pointer"
          />
          <div className="p-1 flex flex-col items-center">
            <h1 className="capitalize">
              {isEditing
                ? `Edit Trip ${trip?.start_city} - ${trip?.end_city}`
                : "Start Planning"}
            </h1>

            <PlanningForm isEditting={isEditing} trip={trip} />
          </div>
        </>
      )}
    </div>
  );
}
