
import { Response, Request } from "express";
import { DialogModel, MessageModel } from "../models/index";
import socket from 'socket.io';

export default class {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  async getAll(req: Request, res: Response) {
    const userId = req.user;
    try {
      const dialogs = await DialogModel.find({ author: userId }).populate(['author', 'partner']);
      res.json(dialogs);
    } catch (error) {
      res.status(404).json({ message: "Dialogs not found", error });
    }
  }

  async deleteDialog(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const dialog = await DialogModel.findByIdAndRemove(id);
      res.json({
        message: `Dialog are successfully deleted`,
        dialog,
      });
    } catch (error) {
      res.status(404).json({ message: "Dialog is not found", error });
    }
  }

  async createDialog(req: Request, res: Response) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    };

    const dialog = new DialogModel(postData);

    try {
      const createdDialog = await dialog.save();
      const messageData = {
        text: req.body.text,
        dialog: createdDialog._id,
        user: req.body.author
      }
      const message = new MessageModel(messageData);
      const createdMessage = await message.save();

      res.json({ dialog: createdDialog, message: createdMessage });
    } catch (error) {
      res.status(500).json({ message: "Can not create dialog", error });
    }
  };
}
