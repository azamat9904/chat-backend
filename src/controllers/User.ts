import { Response, Request } from "express";
import { UserModel } from "../models/index";
import createJwtToken from "../utils/createJwtToken";
import bcrypt from 'bcrypt';

const show = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found", error });
  }
};

const createUser = async (req: Request, res: Response) => {
  const postData = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: req.body.password,
  };

  const user = new UserModel(postData);

  try {
    const createdUser = await user.save();
    res.json({ message: "User is successfully created", createdUser });
  } catch (error) {
    res.status(500).json({ message: "Can not create user", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
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

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "No users", error });
  }
};

const login = async (req: Request, res: Response) => {
  const postData = {
    email: req.body.email,
    password: req.body.password
  }
  try {
    const user = await UserModel.findOne({ email: postData.email });
    const isPasswordCorrect = await bcrypt.compare(postData?.password, user!.password);

    if (isPasswordCorrect) {
      const token = createJwtToken(postData);
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
export default { show, createUser, deleteUser, getAll, login };
