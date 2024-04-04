import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios, { AxiosError } from "axios";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { config } from "@/lib/config";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const Spinner = () => (
  <div className="border-background h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
);

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (!executeRecaptcha) {
        return toast.error("Execute recaptcha not yet available");
      }
      const token = await executeRecaptcha("login");
      const { data } = await axios.post(
        `${config.SERVER_API_URL}/v1/auth/login`,
        {
          ...values,
          "g-recaptcha-token": token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.setItem("session", data.token);
      if (data.isAdmin) {
        localStorage.setItem("isAdmin", data.isAdmin);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.errors[0].msg);
      } else {
        return toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
    window.location.reload();
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
            <Button variant="link" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
