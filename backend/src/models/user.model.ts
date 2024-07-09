import { model, Schema } from "mongoose";
import { IUser } from "../schemas/user.schema";
import jsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Date,
        default: null
    },
    location: {
        type: String
    },
    dob: {
        type: Date
    },
    work: {
        type: String
    },
    bio: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.getJWT = function(): string {
    return jsonWebToken.sign({ id: this._id,email:this.email }, config.JWT_SECRET!, { expiresIn: "1d" });
};

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(password: string){
    return await bcrypt.compare(password, this.password);
}



export const User = model<IUser>("User", userSchema);