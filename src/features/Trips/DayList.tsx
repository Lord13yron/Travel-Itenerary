import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import type { Activity } from "../../types/types";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import CreateEditActivity from "../Activities/CreateEditActivity";
import ActivityItem from "../Activities/ActivityItem";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Tooltip from "../../ui/Tooltip";

type DayListProps = {
  day: {
    dayNumber: number;
    date: Date;
  };
  daysActivities: Activity[] | undefined;
  droppableId: string; // Add this for drag and drop
};

export default function DayList({
  day,
  daysActivities,
  droppableId,
}: DayListProps) {
  const [isCreatingOrEditing, setIsCreatingOrEditing] = useState(false);

  return (
    <div className="flex w-full sm:w-140 flex-col my-2 border-1 border-stone-200 pb-4 shadow-md  rounded bg-sky-50 hover:cursor-pointer">
      <div className="flex items-center justify-between">
        <h1 className="font-bold hover:cursor-pointer m-2">
          {formatDate(day.date.toISOString())}
        </h1>
        <div className="flex gap-2">
          <Tooltip tooltipName="Add Activity" position="left">
            <MdOutlinePlaylistAdd
              onClick={() => setIsCreatingOrEditing(!isCreatingOrEditing)}
              className="text-3xl hover:cursor-pointer hover:opacity-50 m-2"
            />
          </Tooltip>
        </div>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[50px] "
          >
            {daysActivities?.length === 0 ? (
              <p className="text-sm italic text-gray-500 mx-8">
                No activities planned for this day.
              </p>
            ) : (
              <div className="flex flex-col">
                {daysActivities?.map((activity, index) => (
                  <Draggable
                    key={activity.id}
                    draggableId={activity.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ActivityItem activity={activity} index={index + 1} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isCreatingOrEditing && (
        <CreateEditActivity
          isCreatingOrEditing={isCreatingOrEditing}
          setIsCreatingOrEditing={setIsCreatingOrEditing}
          dayNumber={day.dayNumber}
        />
      )}
    </div>
  );
}
