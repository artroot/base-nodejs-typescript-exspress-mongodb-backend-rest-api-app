/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class AccessError extends Error {

    public name = "AccessError";

    public status = 403;

}