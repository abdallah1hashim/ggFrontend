import { JwtPayload } from "jwt-decode";

export type Role = "admin" | "staff" | "customer";
export type UserPublicData = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export interface TokenPayload extends UserPublicData, JwtPayload {}
