import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchemaType } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const visibilityHandler = () => setIsVisiblePassword(!isVisiblePassword);

  function onSubmit(values: LoginSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <AtSign className="absolute top-1.5 left-1 text-gray-300" />
                  <Input placeholder="masukkan email anda..." {...field} className="pl-8" />
                </div>
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
              <FormControl>
                <div className="relative">
                  <Lock className="absolute top-1.5 left-1 text-gray-300" />
                  <Input
                    type={isVisiblePassword ? "text" : "password"}
                    placeholder="masukkan password anda..."
                    className="px-8"
                    {...field}
                  />
                  {isVisiblePassword ? (
                    <EyeClosed
                      className="absolute right-1 top-1.5 text-gray-300 hover:text-gray-500 duration-100 cursor-pointer"
                      onClick={visibilityHandler}
                    />
                  ) : (
                    <Eye
                      className="absolute right-1 top-1.5 text-gray-300 hover:text-gray-500 duration-100 cursor-pointer"
                      onClick={visibilityHandler}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-red-500 hover:bg-red-600 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
