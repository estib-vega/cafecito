import { hc } from "hono/client";
import { type APIRoutes } from "@server/app";

const client = hc<APIRoutes>("/");

const api = client.api;

export default api;
