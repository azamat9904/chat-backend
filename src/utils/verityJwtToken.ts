import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export interface DecodedData {
    data: {
        _doc: IUser;
    };
}

export default (token: string): Promise<DecodedData | null> =>
    new Promise(
        (
            resolve: (decodedData: DecodedData) => void,
            reject: (err: any) => void
        ) => {
            jwt.verify(
                token,
                process.env.JWT_SECRET || "",
                (err, decodedData: any) => {
                    if (err || !decodedData) {
                        return reject(err);
                    }
                    resolve(decodedData as DecodedData);
                }
            );
        }
    );
