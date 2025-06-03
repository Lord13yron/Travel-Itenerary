import { HiXMark } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useAddActivity, useUpdateActivity } from "./useActivities";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Activity } from "../../types/types";

type CreateEditActivityProps = {
  isCreatingOrEditing: boolean;
  setIsCreatingOrEditing: (isCreatingOrEditing: boolean) => void;
  dayNumber: number;
  isEditing?: boolean;
  activity?: Activity;
};

export default function CreateEditActivity({
  //   isCreatingOrEditing,
  setIsCreatingOrEditing,
  dayNumber,
  isEditing,
  activity,
}: CreateEditActivityProps) {
  const [activityName, setActivityName] = useState(
    isEditing ? activity?.name : ""
  );
  const [activityStartTime, setActivityStartTime] = useState(
    isEditing ? activity?.start_time : ""
  );
  const [activityEndTime, setActivityEndTime] = useState(
    isEditing ? activity?.end_time : ""
  );
  const [description, setDescription] = useState(
    isEditing ? activity?.description : ""
  );
  const [cost, setCost] = useState(isEditing ? activity?.cost : 0);
  const tripId = useParams().tripId;
  const { createNewActivity, isCreating } = useAddActivity();
  const { updateActivityById, isUpdating } = useUpdateActivity();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activityName || !tripId) {
      return;
    }

    const newActivity = {
      name: activityName,
      day_number: dayNumber,
      trip_id: tripId,
      start_time: activityStartTime ? activityStartTime : "",
      end_time: activityEndTime ? activityEndTime : "",
      description: description ? description : "",
      cost: cost ? cost : 0,
    };
    if (isEditing && activity) {
      updateActivityById({
        id: activity.id,
        activity: newActivity,
      });
    } else {
      createNewActivity(newActivity);
    }
    setIsCreatingOrEditing(false);
  }

  return (
    <div className="fixed flex h-full w-full top-0 left-0 backdrop-blur-sm items-center justify-center z-10">
      <div className="flex flex-col  w-100 bg-white rounded-lg shadow-lg p-4">
        <HiXMark
          className="hover:cursor-pointer text-red-600 text-xl"
          onClick={() => setIsCreatingOrEditing(false)}
        />
        <h1 className="text-center">
          {isEditing ? "Edit activity" : "Add Activity"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            onChange={(e) => setActivityName(e.target.value)}
            className="bg-sky-50 p-2"
            type="text"
            placeholder="Activity Name"
            value={activityName}
            required
          />
          <label htmlFor="description">Description of activity</label>
          <input
            id="description"
            className="bg-sky-50 p-2"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="activity-start-time">Activity start time</label>
          <input
            id="activity-start-time"
            className="bg-sky-50 p-2"
            type="time"
            placeholder="Activity Time"
            value={activityStartTime}
            onChange={(e) => setActivityStartTime(e.target.value)}
          />
          <label htmlFor="activity-end-time">Activity end time</label>
          <input
            id="activity-end-time"
            className="bg-sky-50 p-2"
            type="time"
            placeholder="Activity Time"
            value={activityEndTime}
            onChange={(e) => setActivityEndTime(e.target.value)}
          />
          <label htmlFor="Cost">Cost $</label>
          <input
            id="Cost"
            className="bg-sky-50 p-2"
            type="number"
            placeholder="Cost"
            min={0}
            step="0.01"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
          {isEditing ? (
            <Button disabled={isUpdating} type="primary">
              Edit Activity
            </Button>
          ) : (
            <Button disabled={isCreating} type="primary">
              Add Activity
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
