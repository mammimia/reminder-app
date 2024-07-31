"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Suspense } from "react";

import type { Reminder } from "@acme/db";
import { CreateReminderSchema } from "@acme/db";
import { Button } from "@acme/ui/button";
import { DataTable } from "@acme/ui/datatable";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@acme/ui/dialog";
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
import { Loading } from "../_components/loading";

export default function ReminderPage() {
  const [reminders, { isFetching }] = api.reminder.all.useSuspenseQuery();

  const form = useForm({
    schema: CreateReminderSchema,
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const utils = api.useUtils();
  const createReminder = api.reminder.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.reminder.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post",
      );
    },
  });

  const columns: ColumnDef<Reminder>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "content",
      header: "Description",
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  if (isFetching) {
    // TODO: Handle this in Suspense
    return <Loading />;
  }

  return (
    <div className="flex flex-col font-semibold">
      <Suspense fallback={<Loading />}>
        <Dialog>
          <DialogTrigger className="self-end">
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add Reminder</DialogHeader>
            <Form {...form}>
              <form
                className="flex w-full max-w-2xl flex-col gap-4"
                onSubmit={form.handleSubmit((data) => {
                  createReminder.mutate(data);
                })}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Content" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    disabled={createReminder.isPending || isFetching}
                    variant="secondary"
                    type="submit"
                  >
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <DataTable columns={columns} data={reminders} />
      </Suspense>
    </div>
  );
}
