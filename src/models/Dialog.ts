import { Schema, model } from 'mongoose';

const dialogSchema = new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partner: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastMessage: {
        type:Schema.Types.ObjectId,
        ref: 'Message'
    }
})

const Dialog = model('Dialog', dialogSchema);
export default Dialog;