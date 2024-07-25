"use client";

import { CreateReminderSchema } from "@acme/db";
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

export function ReminderList() {
  const form = useForm({
    schema: CreateReminderSchema,
    defaultValues: {
      title: "",
      content: "",
      folderId: "1f039829-5909-4b56-be7a-3b9c86626ef9",
    },
  });
  const [reminders, remindersRequest] = api.reminder.all.useSuspenseQuery();

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

  return (
    <div className="mt-5">
      {reminders.map((reminder) => (
        <div key={reminder.id}>
          {reminder.id} - {reminder.title} - {reminder.content}
        </div>
      ))}
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
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
                  <Input {...field} placeholder="title" />
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
                  <Input {...field} placeholder="content" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={createReminder.isPending || remindersRequest.isFetching}
          >
            Add Reminder
          </Button>
        </form>
      </Form>
    </div>
  );
}
