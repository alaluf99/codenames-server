import * as mongoose from 'mongoose';

interface Imessage {
    name: string;
    message: string;
}

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    message: {type: String, required: true}
});

const messagesModel = mongoose.model('Message', MessageSchema);

export { messagesModel, Imessage, MessageSchema }