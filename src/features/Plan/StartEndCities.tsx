import { HiOutlineMapPin } from "react-icons/hi2";

type StartEndCitiesProps = {
  cities: { startCity: string; endCity: string };
  setCities: (cities: { startCity: string; endCity: string }) => void;
  isEditting?: boolean;
};

export default function StartEndCities({
  cities,
  setCities,
}: StartEndCitiesProps) {
  return (
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
            onChange={(e) => setCities({ ...cities, endCity: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
