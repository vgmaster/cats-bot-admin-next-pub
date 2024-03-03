import { type TUser } from "@/entities/user";
import { type User } from 'next-auth';

export const mapUserToAuthUser = (dto: TUser): User => ({
  id: dto.id.toString(),
  name: dto.login,
});
