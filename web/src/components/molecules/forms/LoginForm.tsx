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
import { loginSuccess } from "@/store/slices/auth";
import { api } from "@/variables/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { AtSign, Eye, EyeClosed, LoaderCircle, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function LoginForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const visibilityHandler = () => setIsVisiblePassword(!isVisiblePassword);

  async function onSubmit(values: LoginSchemaType) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${api}/login`, values);

      const token = data.data.token;
      dispatch(loginSuccess({ token }));
      toast.success(data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;
        if (error.status === 400) {
          toast.error(data.message ?? "Input data tidak sesuai");
        }
      }
    } finally {
      setIsLoading(false);
    }
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
                  <Input
                    disabled={isLoading}
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute top-1.5 left-1 text-gray-300" />
                  <Input
                    disabled={isLoading}
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
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 w-full"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin" /> Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </Form>
  );
}
