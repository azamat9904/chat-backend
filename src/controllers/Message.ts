
import { Response, Request } from "express";
import { MessageModel } from "../models/index";
import socket from 'socket.io';

export default class {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }


  getAll = async (req: Request, res: Response) => {
    const dialogId = req.query.dialog;
    const userId: string = req.user?._id;

    try {
      const messages = await MessageModel.find({ dialog: dialogId }).populate(['dialog']);
      res.json(messages);
    } catch (error) {
      res.status(404).json({ message: "Messages not found", error });
    }
  };


  createMessage = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const postData = {
      text: req.body.text,
      dialog: req.body.dialogId,
      user: userId
    };

    const message = new MessageModel(postData);

    try {
      const createdMessage = await message.save();
      createdMessage.populate('dialog', (err: any, populatedMessage: any) => {
        if (err) throw new Error();
        res.json({ message: "Message is successfully created", populatedMessage });
        this.io.emit('SERVER:NEW_MESSAGE', populatedMessage);
      });
    } catch (error) {
      res.status(500).json({ message: "Can not create message", error });
    }
  };


  deleteMessage = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const message = await MessageModel.findByIdAndRemove(id);
      res.json({
        info: `Message are successfully deleted`,
        message,
      });
    } catch (error) {
      res.status(404).json({ message: "Message is not found", error });
    }
  };
}