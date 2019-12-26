import * as mongoose from 'mongoose';

interface IUser {
	id: string;
    name: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true}
});

const userModel = mongoose.model('User', UserSchema);

export { userModel, IUser, UserSchema }