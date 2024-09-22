import CircularImage from "@/components/ui/circular-image";
import { BlogSchema } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: BlogSchema }) => {
  return (
    <div className="flex gap-6 pb-4 border-b">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <CircularImage
            src={blog.author.image}
            size={26}
            alt={blog.author.name}
            className="rounded-full object-cover"
          />
          <Link
            className="hover:underline text-xs text-black"
            href={blog.author.username}
          >
            {blog.author.name}
          </Link>
        </div>
        <h3 className="text-2xl">{blog.title}</h3>
        <p>{blog.tagline}</p>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div>
        <Image
          src={blog.cover_image}
          width={200}
          height={200}
          alt={blog.title}
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default BlogCard;
