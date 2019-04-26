
import MongoStorageBase from "./mongodb/MongoStorageBase";

import * as mongoose from 'mongoose';

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
 export default class MongoStorage extends MongoStorageBase<mongoose.Document> {

 	public constructor(schema) {
 		super(schema);
 	}

 }