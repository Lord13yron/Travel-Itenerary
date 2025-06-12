import { HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";
import type { Trip } from "../../types/types";
import Button from "../../ui/Button";
import { daysAway, formatDate } from "../../utils/helpers";
import { useDeleteTrip } from "./useTrips";
import { usePlanningContext } from "../../store/planning-context";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/Auth-context";

import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tooltip from "../../ui/Tooltip";

type TripProps = {
  trip: Trip;
};

export default function TripItem({ trip }: TripProps) {
  const { deleteTripById } = useDeleteTrip();
  const { setIsPlanning, setTripId } = usePlanningContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

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
      <p className="text-xs italic text-center">{daysAway(trip.start_date)}</p>
      <div className="flex items-center justify-between">
        <h2
          onClick={handlePlanTrip}
          className="capitalize font-bold text-lg hover:cursor-pointer underline"
        >
          {trip.start_city} to {trip.end_city}
        </h2>

        <div className="flex gap-2 hover:cursor-pointer">
          <Tooltip tooltipName="Edit trip" position="top">
            <HiOutlinePencilSquare onClick={handleEditTrip} />
          </Tooltip>

          <Tooltip tooltipName="Delete trip" position="top">
            <HiTrash
              onClick={() => setIsDeleting(true)}
              className="text-red-700"
            />
          </Tooltip>
          <Modal isOpen={isDeleting} setIsOpen={setIsDeleting}>
            <ConfirmDelete
              deleteItem={() =>
                deleteTripById({ id: trip.id, userId: user?.id || "" })
              }
              item={trip.start_city + " to " + trip.end_city}
              closeModal={() => setIsDeleting(false)}
            ></ConfirmDelete>
          </Modal>
        </div>
      </div>

      <p className="text-[0.7rem] sm:text-sm">
        {`${formatDate(trip.start_date!)} - ${formatDate(trip.end_date!)}`}
      </p>

      <Button onClick={handlePlanTrip} type="primary">
        Plan now
      </Button>
    </div>
  );
}
