import { IUser } from "../../src/models/User";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
        }
    }
}


