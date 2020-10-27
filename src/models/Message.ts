import { Schema, model } from 'mongoose';


const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dialog: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
        required: true
    },
    unread: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

const Message = model('Message', messageSchema);

export default Message;