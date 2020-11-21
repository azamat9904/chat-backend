
import { Response, Request } from "express";
import { DialogModel, MessageModel } from "../models/index";
import socket from 'socket.io';

export default class {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  getAll = async (req: Request, res: Response) => {
    const userId = req.user?._id;
    try {
      const dialogs = await DialogModel.find()
        .or([{ author: userId }, { partner: userId }])
        .populate(['author', 'partner'])
        .populate({
          path: 'lastMessage',
          populate: {
            path: 'user',
          },
        })
      res.json(dialogs);
    } catch (error) {
      res.status(404).json({ message: "Dialogs not found", error });
    }
  }

  deleteDialog = async (req: Request, res: Response) => {
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

  createDialog = async (req: Request, res: Response) => {
    const postData = {
      author: req.user?._id,
      partner: req.body.partner,
    };

    DialogModel.findOne({
      author: String(req.user?._id),
      partner: req.body.partner,
    }, (err, foundDialog) => {

      if (err) {
        return res.status(500).json({
          status: 'error',
          message: err,
        });
      }

      if (foundDialog) {
        return res.status(403).json({
          status: 'error',
          message: 'Такой диалог уже есть',
        });
      }

      const dialog = new DialogModel(postData);

      dialog.save().then((dialogObj) => {
        const message = new MessageModel({
          text: req.body.text,
          user: req.user?._id,
          dialog: dialogObj._id,
        });

        message.save().then(() => {
          dialogObj.lastMessage = message._id;
          dialogObj.save().then(() => {
            res.json(dialogObj);
            this.io.emit('SERVER:DIALOG_CREATED', {
              ...postData,
              dialog: dialogObj,
            });
          });
        }).catch((reason) => {
          res.json(reason);
        });

      }).catch((err) => {
        res.json({
          status: 'error',
          message: err,
        });
      });
    }
    );
  };
}
