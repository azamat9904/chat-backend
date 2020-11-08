
import { Response, Request } from "express";
import { MessageModel } from "../models/index";
import socket from 'socket.io';

export default class {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }


  async getAll(req: Request, res: Response) {
    const dialogId = req.query.dialog;

    try {
      const messages = await MessageModel.find({ dialog: dialogId }).populate(['dialog']);
      res.json(messages);
    } catch (error) {
      res.status(404).json({ message: "Messages not found", error });
    }
  };


  async createMessage(req: Request, res: Response) {
    const userId = "5f9862e58c82fb203cc72a84";

    const postData = {
      text: req.body.text,
      dialog: req.body.dialogId,
      user: userId
    };

    const message = new MessageModel(postData);

    try {
      const createdMessage = await message.save();
      res.json({ message: "Message is successfully created", createdMessage });
    } catch (error) {
      res.status(500).json({ message: "Can not create message", error });
    }
  };


  async deleteMessage(req: Request, res: Response) {
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