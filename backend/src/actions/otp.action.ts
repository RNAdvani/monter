import { Otp } from "../models/otp.model";

export const generateOtp = async (email: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    if(await Otp.findOne({ email })) {
        await Otp.updateOne({ email }, { otp, expiresAt });
    }

    await Otp.create({
        email,
        otp,
        expiresAt
    });
}
