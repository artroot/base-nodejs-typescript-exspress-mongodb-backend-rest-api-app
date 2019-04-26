import { IModel } from "./IModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export interface IUserModel extends IModel {
 
	_id?: string;

	first_name?: string;

	last_name?: string;

	email?: string;

	password?: string;

	phone?: string;

	group?: string;

	private_key?: string;

    sid?: string;

    token?: string;

    state?: boolean;
}