"use client";

import { CreateCategorySchema } from "@acme/db";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";

export function CategoryList() {
  const form = useForm({
    schema: CreateCategorySchema,
    defaultValues: {
      name: "",
    },
  });
  const [categories, categoriesRequest] = api.category.all.useSuspenseQuery();
  const utils = api.useUtils();
  const createCategories = api.category.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.category.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post",
      );
    },
  });

  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          {category.id} - {category.name}
        </div>
      ))}
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit((data) => {
            createCategories.mutate(data);
          })}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={
              createCategories.isPending || categoriesRequest.isFetching
            }
          >
            Add Category
          </Button>
        </form>
      </Form>
    </>
  );
}

export default CategoryList;
