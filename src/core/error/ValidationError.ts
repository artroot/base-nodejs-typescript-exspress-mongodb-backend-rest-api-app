/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class ValidationError extends Error {

    public name = "ValidationError";

    public status = 400;

}