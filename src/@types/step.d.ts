// Step states
export type Step = {
  id: string;
  name?: string;
  distance?: string | number;
  duration?: string | number;
};

export type StepState = {
  steps: Step;
  isLoading: boolean;
  error: null | string;
};
