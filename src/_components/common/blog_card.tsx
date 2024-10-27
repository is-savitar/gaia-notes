import { CircularImage, FillImage } from "@/components/ui/circular-image";
import { BlogSchema } from "@/types/blog";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: BlogSchema }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 py-4 border-b">
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<CircularImage
						src={blog.author.image}
						size={26}
						alt={blog.author.name}
						className="rounded-full object-cover"
					/>
					<Link
						className="hover:underline text-xs text-[#191919]"
						href={`/${blog.author.username}`}
					>
						{blog.author.name}
					</Link>
				</div>
				<Link href={`/${blog.uuid}`} className="group">
					<h3 className="text-xl md:text-2xl font-bold group-hover:underline">
						{blog.title}
					</h3>
					<p className="text-cod-gray mt-2">{blog.tagline}</p>
				</Link>
				<div className="flex gap-2">
					{/* Add any additional content here, such as tags or date */}
				</div>
			</div>
			<div className="flex justify-end">
				<FillImage
					src={blog.cover_image}
					size={150}
					alt={blog.title}
					className="object-cover"
				/>
			</div>
		</div>
	);
}
