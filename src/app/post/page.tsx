"use client";
import React, { useRef, useState } from "react";
import PlateEditor from "@/_components/post/plate-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { ParagraphPlugin } from "@udecode/plate-common/react";

const formSchema = z.object({
  title: z.string({ required_error: "Enter a title for your blog" }).min(2, {
    message: "Title must be atleast 2 characters.",
  }),
  tagline: z.string().min(2, {
    message: "Tagline must be atleast 2 characters.",
  }),
  image: z.instanceof(File).optional(),
  // blog_content: z.any(),
});

const PostBlog = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tagline: "",
      // blog_content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    } else {
      setImagePreview(null);
      form.setValue("image", undefined);
    }
  };
  return (
    <main className="max-w-[1320px] mx-auto px-5 sm:px-4 py-14">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[700px] w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Title of your blog</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title here"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the public title of your blog
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Tagline of your blog</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tagline here"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the public tagline of your blog
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Blog Image</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e);
                        field.onChange(e.target.files?.[0]);
                      }}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Image
                    </Button>
                    {field.value && (
                      <span className="text-sm">
                        {(field.value as File).name}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload an image for your blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Blog post image preview"
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
            </div>
          )}
          <PlateEditor
            initialValue={[
              {
                id: "1",
                type: ParagraphPlugin.key,
                children: [{ text: "Start writing your blog post here..." }],
              },
            ]}
          />
          <Button className="self-end" type="submit">
            Post
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default PostBlog;
