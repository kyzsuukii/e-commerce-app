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

export const formSchema = z
  .object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

const Spinner = () => (
  <div className="border-background h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
);

export default function ChangePasswordForm({ session }: { session: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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
      const token = await executeRecaptcha("changePassword");
      await axios.put(
        `${config.SERVER_API_URL}/v1/user/change-password`,
        {
          ...values,
          "g-recaptcha-token": token,
        },
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        },
      );
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.errors[0].msg);
      } else if (error.response.status == 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        return toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
    return toast.success("Password changed successfully");
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
        <CardDescription>Change your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
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
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
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
            <div className="space-x-4">
              <Button
                disabled={loading}
                type="submit"
                className="disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? <Spinner /> : "Update"}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/profile">Cancel</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
