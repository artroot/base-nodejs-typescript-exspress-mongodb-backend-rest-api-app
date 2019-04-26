import { IModel } from "./IModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export interface IGroupModel extends IModel {
 
	name?: string;

	access?: object;

}