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
