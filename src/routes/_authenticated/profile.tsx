import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { config } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import { Home, KeyRound, UserCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import useSWR from "swr";
import ChangePasswordForm from "@/components/change-password-form";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
  pendingComponent: Loading,
});

export const formSchema = z.object({
  address: z.string(),
});

const Spinner = () => (
  <div className="border-background h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
);

function Profile() {
  const { session } = Route.useRouteContext();

  async function getProfile([url]: string[]) {
    try {
      const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response.status == 401) {
        localStorage.clear();
        window.location.reload();
      }
    }
  }

  async function updateAddress([url]: string[], { arg }: { arg: any }) {
    try {
      const { status, data } = await axios.patch(
        `${config.SERVER_API_URL}/v1/${url}`,
        arg,
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );
      if (status === 200) {
        return toast.success(data.msg);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          localStorage.clear();
          window.location.reload();
        }
        return toast.error(error.response?.data.errors[0].msg);
      } else {
        return toast.error("An unexpected error occurred");
      }
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    ["user/address"],
    updateAddress
  );

  const { data, isLoading } = useSWR(["user/me"], getProfile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    trigger(values);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-12 container mx-auto">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <UserCircle />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{data.role}</p>
              <p className="text-sm text-muted-foreground">{data.email} </p>
              <p className="text-sm text-muted-foreground">
                {data?.address || "No address"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" /> Set Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Address</DialogTitle>
                <DialogDescription>Set your address here</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isMutating}
                    type="submit"
                    className="w-full md:w-auto disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isMutating ? <Spinner /> : "Update"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <KeyRound className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>Input your new password</DialogDescription>
              </DialogHeader>
              <ChangePasswordForm session={session} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
