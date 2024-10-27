"use client";
import React, { useRef, useState } from "react";
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
import { getUUIDClient } from "@/lib/utils/uuid_client";
import ButtonLoader from "@/components/ui/button-loader";
import { toast } from "sonner";
import { MultiSelect } from "@/components/ui/multi-select";
import { categories_list } from "@/data/categories";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";

const formSchema = z.object({
	title: z.string({ required_error: "Enter a title for your blog" }).min(2, {
		message: "Title must be atleast 2 characters.",
	}),
	tagline: z.string().min(2, {
		message: "Tagline must be atleast 2 characters.",
	}),
	image: z.instanceof(File).optional(),
	categories: z.array(z.string()).min(1, "Select atleast one category"),
	// blog_content: z.any(),
});

const PostBlog = () => {
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			tagline: "",
			categories: ["stacks"],
			// blog_content: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		setIsLoading(true);
		const res = await fetch("/api/blogs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: values.title,
				tagline: values.tagline,
				author: "Frontend author",
				author_user_id: getUUIDClient(),
				blog_image: "string hey yh",
				blog_content: {},
			}),
		});
		console.log(res);
		if (res.status === 200) {
			toast.success("Created blog successfully", {
				richColors: true,
				position: "top-right",
			});
			setIsLoading(false);
		}
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
								<FormLabel>Cover Image</FormLabel>
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
					<FormField
						control={form.control}
						name="categories"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categories</FormLabel>
								<FormControl>
									<MultiSelect
										options={categories_list}
										onValueChange={field.onChange}
										defaultValue={field.value}
										placeholder="Select categories"
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

					<div className="self-end flex gap-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button type="button">Reset Content</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px] z-[99999999999999]">
								<DialogHeader>
									<DialogTitle>Reset Blog Content</DialogTitle>
									<DialogDescription>
										Are you sure you want to reset your blog content, this
										action is irreversible
									</DialogDescription>
								</DialogHeader>
								<DialogFooter className="flex gap-3">
									<DialogClose>Cancel</DialogClose>
									<Button type="button">Confirm</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<ButtonLoader
							isLoading={isLoading}
							loadingText="Creating blog..."
							type="submit"
						>
							Post
						</ButtonLoader>
					</div>
				</form>
			</Form>
		</main>
	);
};

export default PostBlog;
