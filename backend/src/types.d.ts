import { Request } from "express";
import { IUser } from "./schemas/user.schema";

interface ExtendedRequest extends Request {
    user: IUser;
}