import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  registrationSchema,
  RegistrationSchemaType,
} from "@/schemas/registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Eye, EyeClosed, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false);

  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const visibilityHandler = () => setIsVisiblePassword(!isVisiblePassword);
  const visibilityConfirmHandler = () => setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  function onSubmit(values: RegistrationSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <AtSign className="absolute top-1.5 left-1 text-gray-300" />
                  <Input
                    placeholder="masukkan email anda..."
                    {...field}
                    className="pl-8"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="absolute top-1.5 left-1 text-gray-300" />
                  <Input
                    placeholder="nama depan..."
                    {...field}
                    className="pl-8"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="absolute top-1.5 left-1 text-gray-300" />
                  <Input
                    placeholder="nama belakang..."
                    {...field}
                    className="pl-8"
                  />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute top-1.5 left-1 text-gray-300" />
                  <Input
                    type={isVisibleConfirmPassword ? "text" : "password"}
                    placeholder="masukkan password anda..."
                    className="px-8"
                    {...field}
                  />
                  {isVisibleConfirmPassword ? (
                    <EyeClosed
                      className="absolute right-1 top-1.5 text-gray-300 hover:text-gray-500 duration-100 cursor-pointer"
                      onClick={visibilityConfirmHandler}
                    />
                  ) : (
                    <Eye
                      className="absolute right-1 top-1.5 text-gray-300 hover:text-gray-500 duration-100 cursor-pointer"
                      onClick={visibilityConfirmHandler}
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
