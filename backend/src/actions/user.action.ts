import { User } from "../models/user.model"

export const getUserFromEmail = async (email: string) => {
    const user = await User.findOne({
        email
    });
    return user;
}

export const getUserFromId = async (id: string) => {
    const user = await User.findById(id);
    return user;
}