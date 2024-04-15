import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { config } from "@/lib/config";
import { Textarea } from "./ui/textarea";
import useSWRMutation from "swr/mutation";

export const formSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.string(),
});

async function updateProduct([url, session]: any, { arg }: { arg: any }) {
  try {
    const { status, data } = await axios.put(
      `${config.SERVER_API_URL}/v1/${url}`,
      arg,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    if (status === 200) {
      return toast.success(data.msg, {
        action: {
          label: "refresh",
          onClick: () => window.location.reload(),
        },
      });
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

const Spinner = () => (
  <div className="border-background h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
);

export default function ProductUpdateForm({
  data,
  session,
}: {
  data: any;
  session: string;
}) {
  const { trigger, isMutating } = useSWRMutation(
    ["product/update", session],
    updateProduct
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id,
      name: data?.name,
      category: data?.category,
      price: `${data?.price}`,
      stock: `${data?.stock}`,
      description: data?.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    trigger(values);
  }

  return (
    <Form {...form}>
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6"
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="smartphones">smartphones</SelectItem>
                      <SelectItem value="laptops">laptops</SelectItem>
                      <SelectItem value="furniture">furniture</SelectItem>
                      <SelectItem value="groceries">groceries</SelectItem>
                      <SelectItem value="shirts">shirts</SelectItem>
                      <SelectItem value="others">others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Product stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isMutating}
          type="submit"
          className="w-full md:w-auto disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isMutating ? <Spinner /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
