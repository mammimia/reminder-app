"use client";

import { CreateFolderSchema } from "@acme/db";
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

export function FolderList() {
  const form = useForm({
    schema: CreateFolderSchema,
    defaultValues: {
      name: "",
      color: "#000000",
      categoryId: "b280187f-83ae-4172-a109-b744c541eb5f",
    },
  });
  const [folders, foldersRequest] = api.folder.all.useSuspenseQuery();
  const utils = api.useUtils();
  const createFolder = api.folder.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.folder.invalidate();
    },
    onError: () => {
      toast.error("Failed to create folder");
    },
  });

  return (
    <div className="mt-5">
      {folders.map((folder) => (
        <div key={folder.id}>
          {folder.id} - {folder.name} - {folder.color}
        </div>
      ))}
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit((data) => {
            createFolder.mutate(data);
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
            disabled={createFolder.isPending || foldersRequest.isFetching}
          >
            Add Folder
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FolderList;
