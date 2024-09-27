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
    <main
      className={cn(
        "mx-auto max-w-[1200px] flex flex-col gap-4 py-10",
        className,
      )}
    >
      {blogs.map((blog, index) => (
        <BlogCard blog={blog} key={index} />
      ))}
    </main>
  );
};

export default Blogs;
