export type TUser = {
  id: number;
  login: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date | null;
};
