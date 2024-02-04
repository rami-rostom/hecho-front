// Goal states
export type Goal = {
  id: string;
  activity: number;
  distance: number;
  duration: string;
  user_id: number;
};

export type GoalState = {
  goal: Goal;
  isLoading: boolean;
  error: null | string;
};

export type NewGoal = {
  activity: number;
  distance: number;
  duration: string;
  user_id: number;
};

export type NewGoalState = {
  goal: NewGoal;
  isLoading: boolean;
  error: null | string;
};
