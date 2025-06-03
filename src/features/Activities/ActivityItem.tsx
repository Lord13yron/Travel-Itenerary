import { HiPencilSquare, HiTrash } from "react-icons/hi2";
import type { Activity } from "../../types/types";
import { FaMapMarker } from "react-icons/fa";
import { useDeleteActivity } from "./useActivities";
import { useState } from "react";
import CreateEditActivity from "./CreateEditActivity";
import { convertTime } from "../../utils/helpers";
import { MdDragIndicator } from "react-icons/md";

type ActivityItemProps = {
  activity: Activity;
  index: number;
};

export default function ActivityItem({ activity, index }: ActivityItemProps) {
  const [isCreatingOrEditing, setIsCreatingOrEditing] = useState(false);
  const { deleteActivityById } = useDeleteActivity();
  return (
    <div
      key={activity.id}
      className="relative text-sm font-bold bg-slate-200 p-4 rounded-md flex flex-col gap-2 mb-3 mx-6 border border-slate-300 active:border-sky-500 active:p-5"
    >
      <FaMapMarker className="absolute left-[-12px] top-2 text-sky-600 text-2xl" />
      <h6 className="text-white absolute left-[-4px] top-2">{index}</h6>
      <MdDragIndicator className="text-xl absolute left-[-20px] top-10" />
      <div className="absolute flex  gap-2 right-3 top-3">
        <div className="relative group">
          <HiPencilSquare
            onClick={() => setIsCreatingOrEditing(true)}
            className="text-2xl hover:cursor-pointer hover:opacity-60"
          />
          <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 right-0  bottom-full whitespace-nowrap z-10">
            Edit Activity
          </div>
        </div>
        <div className="relative group">
          <HiTrash
            onClick={() => deleteActivityById(activity.id)}
            className=" text-2xl  hover:cursor-pointer hover:text-red-700"
          />
          <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2 right-0  bottom-full whitespace-nowrap z-10">
            Delete
          </div>
        </div>
      </div>

      <h1>{activity.name}</h1>
      <p className="text-[0.75rem] italic font-light text-slate-500">
        {activity.description}
      </p>
      <div className="flex justify-between items-center">
        <h2 className="bg-sky-200 w-fit px-2 py-1 text-sky-600 text-xs rounded-md">
          {!activity.start_time && !activity.end_time && "No time specified"}
          {activity.start_time ? convertTime(activity.start_time) : ""}{" "}
          {activity.end_time ? `- ${convertTime(activity.end_time)}` : ""}
        </h2>
        <h2 className="bg-slate-500 w-fit px-2 py-1 text-slate-50 text-xs rounded-md">
          ${" "}
          {activity.cost !== null
            ? activity.cost?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}{" "}
        </h2>
      </div>
      {isCreatingOrEditing && (
        <CreateEditActivity
          isCreatingOrEditing={isCreatingOrEditing}
          setIsCreatingOrEditing={setIsCreatingOrEditing}
          dayNumber={activity.day_number}
          isEditing={true}
          activity={activity}
        />
      )}
    </div>
  );
}
