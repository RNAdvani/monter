import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "./ui/input-otp"
import axios from "axios"
import { useNavigate } from "react-router-dom"


 const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })
const OtpComponent = () => {

  const navigate = useNavigate()

  const handleVerifyOtp = async (formData: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/otp/verify", {otp:formData.pin}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.data    
      if(data.success){
        navigate("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })



  return (
    <div className="h-screen flex flex-col justify-center items-center">
    <img src="/otp.png" className="w-[20rem] pr-8" alt="" />
    <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-[18px] font-semibold">Enter OTP</h2>
        <p className="text-gray-400" >We have sent you an OTP on your registered email!</p>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(handleVerifyOtp)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button className="bg-blue-500 mt-4 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md" type="submit">Verify</Button>
      </form>
    </Form>

      </div>
    </div>
  )
}



export default OtpComponent