import { roomModel, userInRoomModel, roomStatus, teams, userInTeamType, IUserInRoom, IRoom , userInRoomSchema} from '../Model/roomModel';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import {v4 as uuid} from 'uuid'
import { ICard } from '../Model/CardModel';

@Route('/rooms')
export class RoomsController extends Controller {
	@Get()
	public async getAll(): Promise<IRoom[]> {
		try {
			let items: any = await roomModel.find({});
			items = items.map((item) => { return {id: item.id, name: item.name, status: item.status, users: item.users, cards: item.cards}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error while fetching all rooms', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, @BodyProp() status: string, @BodyProp() cards: Array<ICard>, @BodyProp() usersInRoom: Array<IUserInRoom>) : Promise<Room> {
		let roomId = uuid();
		const item = new roomModel({id: roomId, name: name, status: status, cards: cards, users: usersInRoom});
		try{
			return await item.save();
		} catch(err) {
			this.setStatus(500);
			console.error('Could not create room');
		}
	}
}

@Route('/rooms/addUser')
export class UsersInRoomController extends Controller{
	@Post()
	public async addUsersToRoom(@BodyProp() id: string, @BodyProp() usersInRoom: IUserInRoom) : Promise<void>{
		let room: IRoom = await roomModel.findById(id);
		room.users.push(usersInRoom);
	}
}
