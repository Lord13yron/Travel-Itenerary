import DatePicker from "react-datepicker";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";

type WhenToGoProps = {
  dateRange: [Date | null, Date | null];
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
  isEditting?: boolean;
};

export default function WhenToGo({ dateRange, setDateRange }: WhenToGoProps) {
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex flex-col bg-stone-50 w-95/100 m-4 rounded-md shadow-md p-3 gap-4">
      <div className="flex gap-2 items-center text-sm">
        <HiOutlineCalendarDays />
        <h1>When you want to go?</h1>
      </div>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
        dateFormat="EEEE, MMM d, yyyy"
        placeholderText="Select a date range"
        className="text-sm bg-stone-200 border-b border-stone-400 p-2 rounded w-full focus:outline-none focus:border-b-2"
      />
    </div>
  );
}
