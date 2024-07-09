import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../types";

export const TryCatch = (fn: Function) => (req: Request | ExtendedRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}