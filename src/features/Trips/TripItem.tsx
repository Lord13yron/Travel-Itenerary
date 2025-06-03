import { HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";
import type { Trip } from "../../types/types";
import Button from "../../ui/Button";
import { daysAway, formatDate } from "../../utils/helpers";
import { useDeleteTrip } from "./useTrips";
import { usePlanningContext } from "../../store/planning-context";
import { useNavigate } from "react-router-dom";

type TripProps = {
  trip: Trip;
};

export default function TripItem({ trip }: TripProps) {
  const { deleteTripById } = useDeleteTrip();
  const { setIsPlanning, setTripId } = usePlanningContext();
  const navigate = useNavigate();

  const tripStatus = daysAway(trip.start_date);
  const hasPassed = tripStatus === "Trip has passed";

  function handleEditTrip() {
    setIsPlanning(true);
    setTripId(trip.id);
  }

  function handlePlanTrip() {
    navigate(`/trip/${trip.id}`);
  }

  return (
    <div
      className={`${
        hasPassed === true
          ? "bg-red-100 border-red-200"
          : "bg-sky-100  border-sky-200"
      } rounded p-4 m-4 w-95/100 sm:w-120 border-1 shadow-md flex flex-col gap-2`}
    >
      <div className="flex items-center justify-between">
        <h2
          onClick={handlePlanTrip}
          className="capitalize font-bold text-lg hover:cursor-pointer underline"
        >
          {trip.start_city} to {trip.end_city}
        </h2>
        <p className="text-xs italic">{daysAway(trip.start_date)}</p>
        <div className="flex gap-2 hover:cursor-pointer">
          <div className="group relative">
            <HiOutlinePencilSquare onClick={handleEditTrip} />
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 right-0  bottom-full whitespace-nowrap z-10 mb-1">
              Edit trip
            </div>
          </div>
          <div className="group relative">
            <HiTrash
              onClick={() => deleteTripById(trip.id)}
              className="text-red-700"
            />
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 right-0  bottom-full whitespace-nowrap z-10 mb-1">
              Delete trip
            </div>
          </div>
        </div>
      </div>
      <p className="text-[0.7rem] sm:text-sm">
        {`${formatDate(trip.start_date!)} - ${formatDate(trip.end_date!)}`}
        {/* {`${formatDate(new Date(trip.start_date!))} - ${formatDate(
          new Date(trip.end_date!)
        )}`} */}
      </p>
      <Button onClick={handlePlanTrip} type="primary">
        Plan now
      </Button>
    </div>
  );
}
