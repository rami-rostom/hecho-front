// Sport states
export type Sport = {
  id: number;
  name?: string;
};

// Activity states
export type Activity = {
  name: string;
  sport_id: string | null;
  date_scheduled?: string;
  date_accomplished?: string;
  distance: number;
  duration: number;
  pace: number;
  user_id: number;
  hecho: boolean;
  sport: Sport;
};

export type ActivityState = {
  activity: Activity;
  isLoading: boolean;
  error: null | string;
};

// New activity states
export type NewActivity = {
  name: string;
  sport_id: string | null;
  date_scheduled?: string;
  user_id: number;
  hecho: boolean;
};

export type NewActivityState = {
  newActivity: NewActivity;
  isLoading: boolean;
  error: null | string;
};

// HECHO states
export type Hecho = {
  id: string;
  hecho: boolean;
  date_accomplished?: string;
};

export type HechoState = {
  hecho: Hecho;
  isLoading: boolean;
  error: null | string;
};
