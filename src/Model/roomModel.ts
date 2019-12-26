import * as mongoose from 'mongoose';
import {ICard, CardSchema} from './CardModel'

enum roomStatus{
    WAITING, INITIALIZE, ACTIVE
}

enum teams{
    RED, BLUE
}

enum userInTeamType{
    REGULAR, TEAM_LEADER, SUPER_SPY
}

interface IUserInRoom extends mongoose.Document{
    user_id: string;
    team: teams;
    userType: userInTeamType,
    isAdmin: boolean
}

interface IRoom extends mongoose.Document{
    name: string;
    status: roomStatus;
    cards: Array<ICard>;
    users: Array<IUserInRoom>;
}

const userInRoomSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.String, ref: 'users', required: true, unique: true},
    team: {type: String, enum: ['RED', 'BLUE'], required: false},
    userType: {type: String, enumm: ['REGULAR', 'TEAM_LEADER', 'SUPER_SPY'], required: false},
    isAdmin: {type: Boolean, required: true}
});

const roomSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: String, enum: ['WAITING', 'INITIALIZE', 'ACTIVE'], required: true},
    cards: [CardSchema],
    users: [userInRoomSchema]
});

const userInRoomModel= mongoose.model<IUserInRoom>('UserInRoom', userInRoomSchema);
const roomModel = mongoose.model<IRoom>('Room', roomSchema);

export {roomModel, userInRoomModel, roomStatus, teams, userInTeamType, IUserInRoom, IRoom, userInRoomSchema}