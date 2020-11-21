import { Response, Request } from "express";
import { UserModel } from "../models/index";
import createJwtToken from "../utils/createJwtToken";
import bcrypt from 'bcrypt';
import socket from 'socket.io';
import { validationResult, Result, ValidationError } from "express-validator";
import User from "../routes/User";
import { has } from "lodash";

export default class {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }


  show = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const user = await UserModel.findById(id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: "User not found", error });
    }
  };


  createUser = async (req: Request, res: Response) => {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty())
      res.status(422).json({ errors: errors.array() });

    const user = new UserModel(postData);

    try {
      const createdUser = await user.save();
      res.json({ message: "User is successfully created", createdUser });
    } catch (error) {
      res.status(500).json({ message: "Can not create user", error });
    }
  };


  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await UserModel.findByIdAndRemove(id);
      res.json({
        message: `User ${user?.fullname}are successfully deleted`,
        user,
      });
    } catch (error) {
      res.status(404).json({ message: "User not found", error });
    }
  };


  getAll = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (error) {
      res.status(404).json({ message: "No users", error });
    }
  };


  login = async (req: Request, res: Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password
    }

    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty())
      res.status(422).json({ errors: errors.array() });

    try {
      const user = await UserModel.findOne({ email: postData.email });
      const isPasswordCorrect = await bcrypt.compare(postData?.password, user!.password);

      if (user && isPasswordCorrect) {
        const token = createJwtToken(user);
        return res.json({
          status: 'success',
          token
        });
      }

      res.json({
        status: "Error",
        message: "Incorrect password or email"
      });

    } catch {
      res.status(404).json({
        message: "User is not found"
      })
    }
  }

  verify = (req: Request, res: Response): void => {
    const hash = (req.query.hash);

    if (!hash) {
      res.status(422).json({ errors: "Invalid hash" });
      return;
    }

    UserModel.findOne({ confirm_hash: String(hash) }, (err: any, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          status: "error",
          message: "Hash not found",
        });
      }

      user.confirmed = true;

      user.save((err: any) => {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: err,
          });
        }

        res.json({
          status: "success",
          message: "Аккаунт успешно подтвержден!",
        });
      });
    });
  };

  findUser = async (req: Request, res: Response) => {
    const fullnameOrEmail = req.query.query;
    const regex = new RegExp(String(fullnameOrEmail), 'i');

    try {
      const users = await UserModel.find().or([{ fullname: regex }, { email: regex }]);
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: "Server error", details: e });
    }
  }

  getMe = async (req: Request, res: Response) => {
    const id = req.user?._id;
    try {
      const user = await UserModel.findOne({ _id: id });
      res.json(user);
    } catch {
      res.status(404).json({ message: "User not found" });
    }
  }
}

