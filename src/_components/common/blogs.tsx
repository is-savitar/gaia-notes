import { blogs } from "@/data/blogs";
import BlogCard from "./blog_card";
import { cn } from "@/lib/utils";

const Blogs = ({
	category,
	className,
}: {
	category: string;
	className?: string;
}) => {
	return (
		<main className={cn("", className)}>
			{blogs.map((blog, index) => (
				<BlogCard blog={blog} key={index} />
			))}
		</main>
	);
};

export default Blogs;
