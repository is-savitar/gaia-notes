"use client";

import React, { useState } from "react";
import UserImageName from "../user-img-name";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { pronouns } from "@/data/users";
import { Textarea } from "@/components/ui/textarea";
import ButtonLoader from "@/components/ui/button-loader";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface RowData {
  title: string;
  desc?: string;
  value?: React.FC;
  modal?: React.FC<{ onClose: () => void }>;
  href?: string;
}

const usernameFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must not exceed 50 characters.",
    }),
});

const profileFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters."),
  pronouns: z.array(z.string()).min(2, "Select atleast one pronoun"),
  bio: z.string().min(3, "Bio must be at least 3 characters").optional(),
});

const UsernameModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof usernameFormSchema>) {
    setIsLoading(true);
    console.log(values);
    // onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoader
          isLoading={isLoading}
          loadingText="Updating username ..."
          type="submit"
        >
          Update Username
        </ButtonLoader>
      </form>
    </Form>
  );
};

const BlockedUsersModal: React.FC<{ onClose: () => void; blocked: any }> = ({
  blocked,
}) => {
  return (
    <div>
      <p className="text-accent-foreground text-sm">
        Blocked users will be removed from your feed and email digests, and you
        won't see them in the future.{" "}
        <Link className="text-blue-500 hover:underline" href={"/about"}>
          Learn more.
        </Link>
        <div className="flex flex-col gap-3">
          {blocked &&
            blocked.length > 0 &&
            blocked.map((user, index: number) => (
              <UserImageName
                name={user.name}
                username={user.username}
                profile_pic={user.profile_pic}
                key={index}
              />
            ))}
        </div>
      </p>
    </div>
  );
};

const ProfileInformationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsLoading(true);
    console.log(values);
    // onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <FormControl>
                <MultiSelect
                  options={pronouns}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select pronouns"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormDescription>
                Add the categories your blog falls into
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a biography of yourself here"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public bio.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoader
          isLoading={isLoading}
          loadingText="Updating profile ..."
          type="submit"
        >
          Update Profile details
        </ButtonLoader>
      </form>
    </Form>
  );
};
const rows: RowData[] = [
  {
    title: "Username and subdomain",
    desc: "Change your username and custom subdomain",
    value: () => "@savitar",
    modal: UsernameModal,
  },
  {
    title: "Profile information",
    desc: "Edit your photo, name, pronouns, bio, etc.",
    value: () => (
      <UserImageName
        username="savitar"
        name="Savitar Flash"
        profile_pic="/s4vitar.png"
      />
    ),
    modal: ProfileInformationModal,
  },
  {
    title: "Profile design",
    desc: "Customize the apperance of your profile.",
    value: () => <ArrowUpRight className="h-6 w-6" />,
    href: "/me/design",
  },
  {
    title: "Custom domain",
    desc: "Upgrade to a Medium Membersip to redirect yur profile URL to a domain like yourdomain.com",
    value: () => <ArrowUpRight className="h-6 w-6" />,
    href: "/me/design",
  },
  {
    title: "Blocked users",
    modal: BlockedUsersModal,
  },
];

const Row: React.FC<{ row: RowData }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {row.href ? (
          <Link
            href={row.href}
            className="flex justify-between items-center py-4 w-full cursor-pointer hover:bg-gray-50 rounded-lg px-4"
          >
            <div className="flex flex-col">
              <div className="font-medium">{row.title}</div>
              {row.desc && (
                <div className="text-[13px] text-gray-500">{row.desc}</div>
              )}
            </div>
            {row.value && (
              <div className="flex items-center space-x-4 text-sm text-[#6b6b6b] hover:text-black transition-colors duration-150">
                <row.value />
              </div>
            )}
          </Link>
        ) : (
          <div className="flex justify-between items-center py-4 w-full cursor-pointer hover:bg-gray-50 rounded-lg px-4">
            <div className="flex flex-col">
              <div className="font-medium">{row.title}</div>
              {row.desc && (
                <div className="text-[13px] text-gray-500">{row.desc}</div>
              )}
            </div>
            {row.value && (
              <div className="flex items-center space-x-4 text-sm text-[#6b6b6b] hover:text-black transition-colors duration-150">
                <row.value />
              </div>
            )}
          </div>
        )}
      </DialogTrigger>
      {row.modal && (
        <DialogContent>
          <DialogHeader className="text-lg font-medium text-center">
            {row.title}
          </DialogHeader>
          <row.modal onClose={() => setOpen(false)} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default function Account() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div className="flex flex-col gap-5">
        {rows.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </div>
    </div>
  );
}
