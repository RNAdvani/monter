import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
  
import { Input } from "./ui/input"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { cn } from "../lib/utils"
import { Calendar } from "./ui/calendar"
import { Textarea } from "./ui/textarea"

const profileSchema = z.object({
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
        }).max(30, {
        message: "Location must be at most 30 characters.",
        }),
    bio : z.string().min(10, {
        message: "Bio must be at least 10 characters.",
        }).max(300, {
        message: "Bio must be at most 300 characters.",
        }),
    dob: z.date({
        required_error: "A date of birth is required.",
        }),
    work: z.string().min(2, {
        message: "Work must be at least 2 characters.",
        }).max(30, {
        message: "Work must be at most 30 characters.",
        }),
})

const Profile = () => {

  const navigate = useNavigate()

  
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            location: "",
            bio: "",
        },
      })
     
      async function onSubmit(values: z.infer<typeof profileSchema>) {
        try {
          const res = await axios.put("http://localhost:3000/api/v1/user/complete",values, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
          const {success} = await res.data
          if(success){
            navigate("/books")
          }
         
        } catch (error) {
          console.log(error)
        }
      
      }
  
  return (
<div className="flex w-full h-full">
<div className="h-screen flex flex-col max-w-3xl p-6 justify-center pl-20">
    <h1 className="text-3xl font-bold">Profile</h1>
    <p className="text-[12px] text-gray-400">Finish setting up by providing additional information</p>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Location" {...field} />
              </FormControl>
              <FormMessage  />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea maxLength={300} draggable={false} className="resize-none" placeholder="Write about yourself"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col  md:flex-row gap-4 w-full">
        <FormField
          control={form.control}
          name="work"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Work" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-3 w-full">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "min-w-[240px] w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button className="bg-[#526dce] hover:bg-[#4361cf]" type="submit">Submit</Button>
      </form>
    </Form>
    </div>
    <div className="hidden md:flex h-screen w-full justify-center items-center">
    <img src="/profile.png" className="w-[30rem] pr-8" alt="" />
    </div>
</div>
  )
}

export default Profile


