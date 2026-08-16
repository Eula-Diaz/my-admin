import { http, HttpResponse } from "msw";
import { users } from "./data/user";

export const handlers = [
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const keyword = url.searchParams.get("keyword") || "";

    let filteredUsers = users.filter((user) => user.name.includes(keyword));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    return HttpResponse.json({
      list: paginatedUsers,
      total: filteredUsers.length,
    });
  }),
  http.delete("/api/users/:id", (req) => {
    const { id } = req.params;
    const userId = parseInt(id as string, 10);
    const index = users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      users.splice(index, 1);
      return HttpResponse.json({
        message: `User ${userId} deleted successfully`,
      });
    } else {
      return HttpResponse.json(
        { message: `User ${userId} not found` },
        { status: 404 },
      );
    }
  }),
];
