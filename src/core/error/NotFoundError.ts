/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class NotFoundError extends Error {

    public name = "NotFoundError";

    public status = 404;

}