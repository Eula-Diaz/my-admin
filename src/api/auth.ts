import request from "./request";
import type { CurrentUser } from "../types/auth";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: CurrentUser;
}

export function login(data: LoginParams) {
  return request.post<LoginResponse>("/login", data);
}
