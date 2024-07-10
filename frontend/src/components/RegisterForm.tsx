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
import { Input } from "./ui/input"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(30, {
    message: "Username must be at most 30 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const RegisterForm = () => {

  const navigate = useNavigate()

  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          const res = await axios.post("http://localhost:3000/api/v1/user/register",values, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
          const {success} = await res.data
          if(success){
            navigate("/otp")
          }
         
        } catch (error) {
          console.log(error)
        }
      
      }
  
  return (
    <div className="h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-2 rounded-md">
      Bookiophile
    </h1>
    <h1 className="text-xl font-bold">Register</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="joedoe" {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joe@example.com"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default RegisterForm


