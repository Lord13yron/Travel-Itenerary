import { HiMagnifyingGlass } from "react-icons/hi2";
import Button from "../ui/Button";
import StartPlanning from "../features/Plan/StartPlanning";
import Trips from "../features/Trips/Trips";
import { usePlanningContext } from "../store/planning-context";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/Auth-context";

export default function Home() {
  const { isPlanning, setIsPlanning } = usePlanningContext();
  // const { isAuthenticated } = useUser();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`transition-[height] duration-500 ease-in-out bg-stone-100 ${
          isPlanning ? "h-0 overflow-hidden" : "h-full"
        }`}
      >
        <div className="bg-[url(/Tenby.JPG)] bg-cover bg-center h-120 sm:h-90 md:h-80 flex flex-col items-center text-center p-8">
          <h1 className="uppercase font-bold text-3xl">
            The Ultimate Vacation Planner
          </h1>
          <p>Start planning your dream vacation</p>
          <button
            onClick={() => setIsPlanning(!isPlanning)}
            className="flex items-center gap-1 bg-white rounded-full p-2 m-4 text-sm w-full sm:w-6/10 md:w-5/10 lg:w-3/10 hover:cursor-pointer"
          >
            <HiMagnifyingGlass className="text-2xl text-stone-400" />
            Where would you like to go?
          </button>
          <Button
            onClick={
              isAuthenticated
                ? () => setIsPlanning(!isPlanning)
                : () => navigate("/login")
            }
            type="secondary"
          >
            Start Planning
          </Button>
        </div>

        <Trips />
      </div>
      <StartPlanning />
    </>
  );
}
