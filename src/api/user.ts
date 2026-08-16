import request from "./request";
import type { User } from "../types/user";

export interface GetUsersParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

export interface GetUsersResponse {
  list: User[];
  total: number;
}

export function getUsers(params: GetUsersParams) {
  return request.get<GetUsersResponse>("/users", { params });
}

export function deleteUser(id: number) {
  return request.delete(`/users/${id}`);
}
