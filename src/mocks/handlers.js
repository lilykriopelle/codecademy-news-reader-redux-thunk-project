import { rest } from "msw";
import articlesData from "./articles.json";

export const handlers = [
  rest.get("/api/articles", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(articlesData));
  }),
];
