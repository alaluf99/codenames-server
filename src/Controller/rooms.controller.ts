import { roomModel, userInRoomModel, roomStatus, teams, userInTeamType, IUserInRoom, IRoom , userInRoomSchema} from '../Model/roomModel';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import { ICard } from '../Model/CardModel';

@Route('/rooms')
export class RoomsController extends Controller {
	@Get()
	public async getAll(): Promise<IRoom[]> {
		try {
			let items: any = await roomModel.find({});
			items = items.map((item) => { return {id: item._id, name: item.name, status: item.status, users: item.users, cards: item.cards}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error while fetching all rooms', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, @BodyProp() status: string, @BodyProp() cards: Array<ICard>, @BodyProp() usersInRoom: Array<IUserInRoom>) : Promise<IRoom> {
		const item = new roomModel({name: name, status: status, cards: cards, users: usersInRoom});
		try{
			return await item.save();
		} catch(err) {
			this.setStatus(500);
			console.error('Could not create room', err);
		}
	}
}

@Route('/rooms/User')
export class UsersInRoomController extends Controller{
	@Post()
	public async addUsersToRoom(@BodyProp() id: string, @BodyProp() usersInRoom: IUserInRoom) : Promise<IRoom>{
		let room: IRoom = await roomModel.findById(id);
		room.users.push(usersInRoom);
		try{
			return await room.save();
		} catch(err) {
			this.setStatus(500);
			console.error('Could not create room');
		}
	}
	@Delete()
	public async removeUserFromRoom(@BodyProp() room_id: string, @BodyProp() userInRoom_id: string) : Promise<IRoom>{
		let room: IRoom = await roomModel.findById(room_id);
		room.users.forEach((item) => {
			if (item.user_id == userInRoom_id)
				item.remove();
		});
		try{
			return await room.save();
		} catch(err) {
			this.setStatus(500);
			console.error('Could not create room');
		}
	}
}
