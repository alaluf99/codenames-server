import { IUser, userModel } from '../Model/UsersModel';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import { v4 as uuid } from 'uuid'

@Route('/users')
export class UsersController extends Controller {
	@Get()
	//TODO: SECURE THE PASSWORD
	public async getAll(): Promise<IUser[]> {
		try {
			let items: any = await userModel.find({});
			items = items.map((item) => { return {id: item.id, name: item.name, password: item.password}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, @BodyProp() password: string) : Promise<String> {
		let userId = uuid();
		const item = new userModel({ id: userId, name: name, password: password});
		await item.save();

		return userId;
	}

	@Post()
	public async userExist(@BodyProp() name: string, @BodyProp() password: string): Promise<String> {
		let user: any = await userModel.find({ name: name, password: password });
		
		if (user.length == 1) {
			return user[0].id;
		}

		return null;
	}

	// public async userExist(userId: string): Promise<boolean> {
	// 	let user = await userModel.find({ id: userId });

	// 	return 
	// }
}
