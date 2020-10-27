
import { Response, Request } from "express";
import { DialogModel, MessageModel } from "../models/index";


const getAll = async (req: Request, res: Response) => {
  const userId = "5f9862e58c82fb203cc72a84";

  try {
    const dialogs = await DialogModel.find({ author: userId }).populate(['author', 'partner']);
    res.json(dialogs);
  } catch (error) {
    res.status(404).json({ message: "Dialogs not found", error });
  }
};


const createDialog = async (req: Request, res: Response) => {
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


const deleteDialog = async (req: Request, res: Response) => {
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
};


export default { getAll, createDialog, deleteDialog }