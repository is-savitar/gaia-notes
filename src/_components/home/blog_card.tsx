import { CircularImage, FillImage } from "@/components/ui/circular-image";
import { BlogSchema } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: BlogSchema }) => {
  return (
    <div className="grid grid-cols-2 md:flex justify-between gap-10 py-4 border-b">
      <Link href={`/${blog.uuid}`} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CircularImage
            src={blog.author.image}
            size={26}
            alt={blog.author.name}
            className="rounded-full object-cover"
          />
          <Link
            className="hover:underline text-xs text-[#191919]"
            href={blog.author.username}
          >
            {blog.author.name}
          </Link>
        </div>
        <h3 className="text-xl md:text-2xl font-bold">{blog.title}</h3>
        <p className="text-cod-gray">{blog.tagline}</p>
        <div>
          <div></div>
          <div></div>
        </div>
      </Link>
      <div>
        <FillImage
          src={blog.cover_image}
          size={150}
          alt={blog.title}
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default BlogCard;
