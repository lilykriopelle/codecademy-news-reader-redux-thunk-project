import { rest } from "msw";
import articlesData from "./articles.json";

export const handlers = [
  rest.get("/api/articles", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(articlesData));
  }),
  rest.get("/api/articles/:articleId", (req, res, ctx) => {
    const { articleId } = req.params
    return res(ctx.status(200), ctx.json(articlesData.find(article => article.id == articleId)));
  }),
];
