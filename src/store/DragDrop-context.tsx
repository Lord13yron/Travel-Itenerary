import { useState, useEffect } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { Activity } from "../types/types";
import DayList from "../features/Trips/DayList";
import { useUpdateActivities } from "../features/Activities/useActivities";
import toast from "react-hot-toast";

type TripItineraryProps = {
  days: {
    dayNumber: number;
    date: Date;
  }[];
  activitiesByDay: Record<number, Activity[]>;
};

export default function TripItinerary({
  days,
  activitiesByDay,
}: TripItineraryProps) {
  const [activities, setActivities] = useState(activitiesByDay);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { updateActivities } = useUpdateActivities();

  // This effect will update the local state whenever the props change
  // This ensures that new/deleted/updated activities from API calls are reflected
  useEffect(() => {
    setActivities(activitiesByDay);
    // Only reset unsaved changes if we're not in the middle of a drag operation
    if (!isSaving) {
      setHasUnsavedChanges(false);
    }
  }, [activitiesByDay, isSaving]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceDay = parseInt(source.droppableId);
    const destinationDay = parseInt(destination.droppableId);

    // If dropped in the same day, reorder
    if (sourceDay === destinationDay) {
      const dayActivities = [...(activities[sourceDay] || [])];
      const [removed] = dayActivities.splice(source.index, 1);
      dayActivities.splice(destination.index, 0, removed);

      setActivities({
        ...activities,
        [sourceDay]: dayActivities,
      });
      setHasUnsavedChanges(true);
    }
    // If dropped in different day, move between days
    else {
      const sourceActivities = [...(activities[sourceDay] || [])];
      const destinationActivities = [...(activities[destinationDay] || [])];

      const [removed] = sourceActivities.splice(source.index, 1);
      destinationActivities.splice(destination.index, 0, removed);

      setActivities({
        ...activities,
        [sourceDay]: sourceActivities,
        [destinationDay]: destinationActivities,
      });
      setHasUnsavedChanges(true);
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      // Gather all activities that need updating
      const updates = Object.entries(activities).flatMap(
        ([dayNumber, dayActivities]) => {
          return dayActivities.map((activity, index) => ({
            id: activity.id,
            day_number: parseInt(dayNumber),
            position: index,
          }));
        }
      );

      // Update activities in the database

      for (const update of updates) {
        updateActivities(update);
      }
      toast.success("Activities updated successfully!");

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      setSaveError(
        error instanceof Error ? error.message : "Failed to save changes"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {hasUnsavedChanges && (
        <div className="sticky top-0 z-10 p-3 bg-blue-50 border-b border-blue-100 flex justify-center shadow-sm">
          <div className="flex items-center gap-4">
            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
            <button
              onClick={saveChanges}
              disabled={isSaving}
              className={`
                px-4 py-2 rounded-md font-medium text-white
                ${
                  isSaving
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }
                transition-colors
              `}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col flex-wrap w-full items-center">
          {days.map((day) => (
            <DayList
              key={day.dayNumber}
              day={day}
              daysActivities={activities[day.dayNumber]}
              droppableId={day.dayNumber.toString()}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
