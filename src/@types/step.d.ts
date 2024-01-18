// Step states
export type Step = {
  id?: string;
  name?: string;
  distance?: string | number;
  duration?: string | number;
  user_id: number;
};

export type StepState = {
  steps: Step;
  isLoading: boolean;
  error: null | string;
};
