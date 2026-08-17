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

export interface CreateUserParams {
  name: string;
  age: number;
}

export interface UpdateUserParams {
  name: string;
  age: number;
}

export function getUsers(params: GetUsersParams) {
  return request.get<GetUsersResponse>("/users", { params });
}

export function deleteUser(id: number) {
  return request.delete(`/users/${id}`);
}

export function createUser(data: CreateUserParams) {
  return request.post("/users", data);
}

export function updateUser(id: number, data: UpdateUserParams) {
  return request.put<User>(`/users/${id}`, data);
}
