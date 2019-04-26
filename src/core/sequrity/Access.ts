
import AccessError from "../error/AccessError";

import { IUserModel } from "../../ifaces/IUserModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class Access {

    public readonly ACCESS_READ_ONLY = 'r';

    public readonly ACCESS_READ_WRITE = 'rw';

    /**
     * Access chapter from group.access
     */
    private _access_chapter: string;

    /**
     * Access field in chapter from group.access
     */
    private _access_field: string;

    
    public constructor(access_chapter: string, access_field: string) {

        this._access_chapter = access_chapter;

        this._access_field = access_field;
    }

    /**
     * Checking access from admin group
     *
     * @throws AccessError
     * @param loginnedUser Authorized user_id
     * @param needleAccess Needle access 'r' || 'rw'
     * @param field Custom field in group access
     * @return true | Error
     */
    public check(loginnedUser: IUserModel, needleAccess: string, field?): void {

        try {

            const access = loginnedUser.group['access'][this._access_chapter].fields[field ? field : this._access_field].value;

            if (!access.includes(needleAccess)) throw false;

        }catch (err) {

            throw new AccessError("Access denied");

        }

    }
}
