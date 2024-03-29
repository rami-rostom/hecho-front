// Step states
export type Step = {
  id: string;
  name?: string;
  distance: number;
  duration: string;
  user_id: number;
};

export type StepState = {
  step: Step;
  isLoading: boolean;
  error: null | string;
};

// New step states
export type NewStep = {
  name?: string;
  distance?: number | null;
  duration?: string | number;
  user_id: number;
};

export type NewStepState = {
  step: NewStep;
  isLoading: boolean;
  error: null | string;
};
