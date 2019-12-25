import { IUser, userModel } from '../Model/UsersModel';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import {v4 as uuid} from 'uuid'

@Route('/users')
export class UsersController extends Controller {
	@Get()
	public async getAll(): Promise<IUser[]> {
		try {
			let items: any = await userModel.find({});
			items = items.map((item) => { return {id: item._id, description: item.description}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error', err);
		}
	}

	@Post()
	public async create(@BodyProp() name: string, @BodyProp() password: string) : Promise<void> {
		const item = new userModel({id: uuid(), name: name, password: password});
		await item.save();
	}

}
