import { Response, Request, NextFunction } from "express";
import { UserModel } from '../models/index';

export default async (req: Request, res: Response, next: NextFunction) => {

    if (req.user) {
        UserModel.findOneAndUpdate(
            { _id: req.user._id },
            {
                last_seen: new Date(),
            },
            { new: true },
        );
    }
    next();
}
