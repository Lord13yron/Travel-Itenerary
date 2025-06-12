import { useState } from "react";
import Button from "../../ui/Button";
import type { NewTrip, Trip } from "../../types/types";
import { useAddTrip, useUpdateTrip } from "../Trips/useTrips";
import { usePlanningContext } from "../../store/planning-context";
import { HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../../store/Auth-context";

type PlanningFormProps = {
  isEditting?: boolean;
  trip?: Trip;
};

export default function PlanningForm({ isEditting, trip }: PlanningFormProps) {
  const [dateRange, setDateRange] = useState<[string | "", string | ""]>([
    isEditting && trip ? trip.start_date : "",
    isEditting && trip ? trip.end_date : "",
  ]);

  const [cities, setCities] = useState({
    startCity: isEditting ? trip?.start_city : "",
    endCity: isEditting ? trip?.end_city : "",
  });
  const { setIsPlanning } = usePlanningContext();
  const { createNewTrip } = useAddTrip();
  const [startDate, endDate] = dateRange;
  // const { user } = useUser();
  const { user } = useAuthContext();

  const { isUpdating, updateTripById } = useUpdateTrip();

  function handleAddTrip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cities.startCity || !cities.endCity || !startDate || !endDate) {
      return;
    }

    const newTrip: NewTrip = {
      start_city: cities.startCity,
      end_city: cities.endCity,
      start_date: startDate,
      end_date: endDate,
    };

    if (isEditting && trip) {
      updateTripById({ id: trip.id, trip: newTrip });
    } else {
      createNewTrip({ newTrip: newTrip, userId: user?.id || "" });
    }

    // Reset the form
    setCities({ startCity: "", endCity: "" });
    setDateRange(["", ""]);
    // Close the planning form
    setIsPlanning(false);
  }

  return (
    <form
      onSubmit={handleAddTrip}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="flex flex-col bg-stone-50 w-95/100 m-4 rounded-md shadow-md p-3 gap-4">
        <div className="flex gap-1 items-center">
          <HiOutlineMapPin />
          <h2 className="text-sm">Where does your trip start and end?</h2>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="start_at">
            Start at
          </label>
          <div className="group bg-stone-200 border-b-1 border-stone-400 py-2 px-4 font-bold text-sm flex items-center gap-2 rounded hover:bg-stone-100 focus-within:border-b-2">
            <HiOutlineMapPin className="text-stone-500" />
            <input
              className="focus:outline-none"
              type="text"
              placeholder="City"
              id="start_at"
              value={cities.startCity}
              onChange={(e) =>
                setCities({ ...cities, startCity: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="start_at">
            End at
          </label>
          <div className="group bg-stone-200 border-b-1 border-stone-400 py-2 px-4 font-bold text-sm flex items-center gap-2 rounded hover:bg-stone-100 focus-within:border-b-2">
            <HiOutlineMapPin className="text-stone-500" />
            <input
              className="focus:outline-none "
              type="text"
              placeholder="City"
              id="end_at"
              value={cities.endCity}
              onChange={(e) =>
                setCities({ ...cities, endCity: e.target.value })
              }
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-stone-50 w-95/100 m-4 rounded-md shadow-md p-3 gap-4">
        <div className="flex gap-2 items-center text-sm">
          <HiOutlineCalendarDays />
          <h1>When you want to go?</h1>
        </div>
        <DatePicker
          selectsRange={true}
          // startDate={startDate}
          // endDate={endDate}
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          // onChange={(update) => {
          //   setDateRange(update);
          // }}
          onChange={(update) => {
            // Convert any returned Date objects back to strings for your state
            setDateRange([
              update[0] ? update[0].toISOString() : "",
              update[1] ? update[1].toISOString() : "",
            ]);
          }}
          required
          isClearable={true}
          dateFormat="EEEE, MMM d, yyyy"
          placeholderText="Select a date range"
          className="text-sm bg-stone-200 border-b border-stone-400 p-2 rounded w-full focus:outline-none focus:border-b-2"
        />
      </div>

      <Button disabled={isUpdating} type="primary">
        {isEditting ? "Edit Trip" : "Add Trip"}
      </Button>
    </form>
  );
}
