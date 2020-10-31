import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/index";
import { DecodedData } from "../utils/verityJwtToken";

export default async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.path === "/users/login" ||
        (req.path === "/users" && req.method === "POST")
    ) {
        return next();
    }

    const token: string | null =
        "token" in req.headers ? (req.headers.token as string) : null;

    if (token) {
        try {
            const user: DecodedData | null = await verifyJwtToken(token);
            if (user) req.user = user.data._doc;
            next();
        } catch {
            res.status(403).json({ message: "Invalid auth token provided." });
        }
        return;
    }

    res.status(401).json({ message: "Unauthorized user" })
};
