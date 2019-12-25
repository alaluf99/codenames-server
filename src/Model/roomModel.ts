import * as mongoose from 'mongoose';
import {cardModel, ICard, cardType} from './CardModel'
import {userModel} from './UsersModel'

enum roomStatus{
    WAITING, INITIALIZE, ACTIVE
}

enum teams{
    RED, BLUE
}

enum userInTeamType{
    REGULAR, TEAM_LEADER, SUPER_SPY
}

interface IUserInRoom{
    user_id: string;
    team: teams;
    userType: userInTeamType,
    isAdmin: boolean
}

interface IRoom {
    id: string;
    name: string;
    status: roomStatus;
    cards: [ICard];
    users: [IUserInRoom];    
}

const userInRoomSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    team: {type: String, enum: ['RED', 'BLUE'], required: true},
    userType: {type: String, enumm: ['REGULAR', 'TEAM_LEADER', 'SUPER_SPY'], required: true},
    isAdmin: {type: Boolean, required: true}
});

const roomSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    status: {type: String, enum: ['WAITING', 'INITIALIZE', 'ACTIVE'], required: true},
    cards: [cardModel],
    users: [userModel]
});

const userInRoomModel= mongoose.model('UserInRoom', userInRoomSchema);
const roomModel = mongoose.model('Room', roomSchema);

export {roomModel, userInRoomModel, roomStatus, teams, userInTeamType}