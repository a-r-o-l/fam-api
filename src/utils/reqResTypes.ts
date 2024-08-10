import { ParsedUrlQuery } from "querystring";
import { Request, Response } from "express";

interface QueryParams extends ParsedUrlQuery {
  type: any;
  from: any;
  to: any;
}

interface CustomRequest extends Request {
  user?: { id: number };
  body: any;
  query: QueryParams;
  params: any;
}

export { CustomRequest, QueryParams };
