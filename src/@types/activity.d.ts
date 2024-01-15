// New activity states
export type NewActivity = {
  name: string;
  sport_id: string | null;
  date_scheduled: string | undefined;
  user_id: number;
  hecho: boolean;
};

export type NewActivityState = {
  newActivity: NewActivity;
  isLoading: boolean;
  error: null | string;
};
