export default interface IUser {
    _id: string;
    email: string;
    roles: string[];
    hasOrdered: boolean;
}