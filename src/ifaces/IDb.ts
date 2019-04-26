/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default interface IDb {

    connect(): Promise<any>;

    checkConnection(err);

}