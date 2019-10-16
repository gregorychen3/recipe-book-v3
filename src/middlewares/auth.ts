import basicAuth from "express-basic-auth";
import { ADMIN_PASSWORD } from "../config";

export const authMiddleware = basicAuth({ users: { admin: ADMIN_PASSWORD } });
