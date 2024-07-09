import mongoose from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string; 
    isVerified: Date;
    createdAt: Date;
    updatedAt: Date;
    getJWT(): string;
    comparePassword(password: string): boolean;
    userlocation: string;
    dob: Date;
    work: string;
    bio: string;
}