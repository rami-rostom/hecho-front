import { Sport } from './sport';
import { Step } from './step';
import { Tag } from './tag';

// Activity states
export type Activity = {
  id: string;
  name: string;
  sport_id: string | null;
  date_scheduled?: string;
  date_accomplished?: string;
  distance: number;
  duration: string;
  pace: number;
  user_id: number;
  hecho: boolean;
  sport: Sport;
  steps: Step[];
  tags: Tag[];
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
