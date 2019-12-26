import { roomModel, userInRoomModel, roomStatus, teams, userInTeamType, IUserInRoom, IRoom , userInRoomSchema} from '../Model/roomModel';
import { IUser, userModel } from '../Model/UsersModel';
import { Imessage, MessageSchema, messagesModel } from '../Model/MessagesModel';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import { ICard } from '../Model/CardModel';

@Route('/message')
export class MessageController extends Controller {
	@Get()
	public async getAll(): Promise<Imessage[]> {
		try {
			let items: any = await messagesModel.find({});
			items = items.map((item) => { return {name: item.name, message: item.message}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error while fetching all messages', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, @BodyProp() message: string) : Promise<void> {
			
		const item = new messagesModel({ name: name, message: message});
			try{
				await item.save();
			} catch(err) {
				this.setStatus(500);
				console.error('Could not send message', err);
			}
	}
}
