// Tag states
export type Tag = {
  id?: string;
  name?: string;
  user_id: number;
};

export type TagState = {
  tags: Tag;
  isLoading: boolean;
  error: null | string;
};
