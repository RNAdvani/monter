import dotenv from "dotenv"


dotenv.config({
    path :".env"
})



export default {
    COOKIE_EXPIRE : process.env.COOKIE_EXPIRE!,
    OTP_EXPIRE : process.env.OTP_EXPIRE!,
    JWT_SECRET : process.env.JWT_SECRET!,
    DB_NAME : process.env.DB_NAME!,
    MONGO_URI : process.env.MONGO_URI!,
    RESEND_API_KEY : process.env.RESEND_API_KEY!
}