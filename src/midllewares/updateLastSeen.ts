import { Response, Request, NextFunction } from "express";
import { UserModel } from '../models/index';

export default async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.updateOne({ _id: "5f9863b78c82fb203cc72a87" },
        {
            $set: { last_seen: new Date().toString() }
        })
    next()
}
