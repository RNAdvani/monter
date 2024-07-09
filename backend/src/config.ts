import dotenv from "dotenv"


dotenv.config({
    path :".env"
})



export default {
    COOKIE_EXPIRE : process.env.COOKIE_EXPIRE!,
    OTP_EXPIRE : process.env.OTP_EXPIRE!,
    JWT_SECRET : process.env.JWT_SECRET!
}