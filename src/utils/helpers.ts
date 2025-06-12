import { format } from "date-fns";
import { useEffect, type RefObject } from "react";

export function formatDate(date: string) {
  return format(date, "EEEE, MMMM d yyyy");
}

export function getDaysBetweenDates(
  startDate: string,
  endDate: string
): number {
  // Convert both dates to milliseconds since epoch
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  // Calculate difference in milliseconds
  const diffInMs = Math.abs(end - start);

  // Convert milliseconds to days
  // 1000ms * 60s * 60min * 24hr = 86400000ms in one day
  const daysDiff = Math.floor(diffInMs / 86400000);

  return daysDiff;
}

export function convertTime(time: string) {
  const [hours, mins] = time.split(":").map(Number);

  const minutes = mins < 10 ? `0${mins}` : mins;

  if (hours > 12) {
    return `${hours - 12}:${minutes} PM`;
  }
  if (hours === 12) {
    return `${hours}:${minutes} PM`;
  }
  if (hours === 0) {
    return `12:${minutes} AM`;
  }
  return `${hours}:${minutes} AM`;
}

export function daysAway(startDate: string) {
  const daysUntilTrip = Math.ceil(
    (new Date(startDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (daysUntilTrip < 0) {
    return "Trip has passed";
  }
  if (daysUntilTrip === 0) {
    return "Trip is today!";
  }
  if (daysUntilTrip === 1) {
    return "Trip is tomorrow!";
  }

  return daysUntilTrip + " Days away";
}

// export function useClickOutside(
//   ref: RefObject<HTMLElement>,
//   callback: () => void
// ) {
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         callback();
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref, callback]);
// }
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  toggleRef: RefObject<HTMLElement> | null,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(
          toggleRef?.current && toggleRef.current.contains(event.target as Node)
        )
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggleRef, callback]);
}
