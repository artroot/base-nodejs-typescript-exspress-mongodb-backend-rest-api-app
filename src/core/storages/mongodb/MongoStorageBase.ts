
import * as mongoose from 'mongoose';

import { IStorage } from "../../../ifaces/IStorage";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
 export default class MongoStorageBase<T extends mongoose.Document> implements IStorage {

	  private _model: mongoose.Model<mongoose.Document>;

	  public constructor(schemaModel: mongoose.Model<mongoose.Document>) {
	    
	    this._model = schemaModel;
	  
	  }

	  public create(item: T, callback?: (error: any, result: T) => void) {
	  
	    return this._model.create(item, callback);
	  
	  }

	  public retrieve(callback: (error: any, result: T) => void) {
	  
	    return this._model.find({}, callback);
	  
	  }

	  public update(_id: mongoose.Types.ObjectId, item: T, options?: Object, callback?: (error: any, result: any) => void) {
	  
	    return this._model.update({ _id: _id }, item, options, callback);
	  
	  }

	  public findOneAndUpdate(query: Object, item: T, options?: Object, callback?: (error: any, result: any) => void) {

		return this._model.findOneAndUpdate(query, item, options, callback);

	  }

	  public delete(_id: string, callback?: (error: any, result: any) => void) {
	  
	    return this._model.remove({ _id: this.toObjectId(_id) }, callback);
	  
	  }

	  public findById(_id: string, options?: Object, callback?: (error: any, result: T) => void) {
	  
	    return this._model.findById(_id, options, callback);
	  
	  }

	  public findOne(query: Object, options?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T> {
	  
	    return this._model.findOne(query, options, callback);
	  
	  }

	  public find(query?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]> {
	  
	    return this._model.find(query, options, callback);
	  
	  }

	  /*public query(): mongoose.Model<mongoose.Document> {

	  	return this._model;

	  }*/

    public query(): MongoStorageBase<any> {

        return this;

    }

	  private toObjectId(_id: string): mongoose.Types.ObjectId {
	  
	    return mongoose.Types.ObjectId.createFromHexString(_id);
	  
	  }


 }