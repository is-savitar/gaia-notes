import { blogs } from "@/data/blogs";
import BlogCard from "./blog_card";

const Blogs = ({ category }: { category: string }) => {
  return (
    <main className="mx-auto max-w-[1200px] flex flex-col gap-4 py-10 px-5">
      {blogs.map((blog, index) => (
        <BlogCard blog={blog} key={index} />
      ))}
    </main>
  );
};

export default Blogs;
