import { model, Schema } from "mongoose";
import { IOtp } from "../schemas/otp.schema";

const otpSchema = new Schema<IOtp>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 600
    }
});

// Deletes the otp after it expires 
otpSchema.index({expiresAt: 1}, {expireAfterSeconds: 0}); 

export const Otp = model<IOtp>("Otp", otpSchema);