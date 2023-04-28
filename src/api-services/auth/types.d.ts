import { HydratedDocument, Types } from "mongoose";
import { IUser, IUserInstanceMethods } from "../users/types";

export interface AuthUser extends HydratedDocument<IUser>, IUserInstanceMethods {}