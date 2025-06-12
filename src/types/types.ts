// export type Trip = {
//   id: number;
//   start_date: string;
//   end_date: string;
//   start_city: string;
//   end_city: string;
//   // created_at: string;
// };

// in your types.ts file
export type TripBase = {
  start_city: string;
  end_city: string;
  start_date: string;
  end_date: string;
};

export type NewTrip = TripBase; // No ID needed for new trips

export type Trip = TripBase & {
  id: number; // ID only required for existing trips
};

export type ActivityBase = {
  name: string;
  day_number: number;
  trip_id: string;
  start_time?: string;
  end_time?: string;
  position?: number; // Optional for new activities, required for updates
  cost?: number; // Optional cost field
  description?: string; // Optional description field
};
export type NewActivity = ActivityBase; // No ID needed for new activities

export type Activity = ActivityBase & {
  id: number; // ID only required for existing activities
};

export type Update = {
  id: number;
  day_number: number;
  position: number;
};

export type TripInvitation = {
  id?: string;
  invited_by_email: string;
  invited_by_id: string;
  trip_id: number;
  invitee_email: string;
  status: "pending" | "accepted" | "declined";
  trip_city: string;
};
