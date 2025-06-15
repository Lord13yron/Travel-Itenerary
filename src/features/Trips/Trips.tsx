import { Link } from "react-router-dom";
import TripItem from "./TripItem";

import Button from "../../ui/Button";
import { usePlanningContext } from "../../store/planning-context";
import { useAuthContext } from "../../store/Auth-context";
import { useTripContext } from "../../store/userTrip-context";

export default function Trips() {
  const { setIsPlanning } = usePlanningContext();
  const { user } = useAuthContext();
  const { trips, isLoading } = useTripContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-stone-100">
      <h1 className="text-lg font-bold mt-4">Your Trips</h1>
      {!user && (
        <div className="flex items-center justify-center mt-8">
          <p>
            Please{" "}
            <Link
              className="text-sky-600 underline hover:text-sky-800"
              to={"/login"}
            >
              log in
            </Link>{" "}
            to see your trips.
          </p>
        </div>
      )}
      <div className="flex items-center justify-center flex-wrap  w-full">
        {trips?.length === 0 && user && (
          <div className="flex flex-col items-center justify-center mt-8 gap-2">
            <p>You haven't added any trips yet</p>
            <Button onClick={() => setIsPlanning(true)} type="primary">
              Add a Trip
            </Button>
          </div>
        )}
        {trips?.map((trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
}
