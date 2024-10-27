import Blogs from "@/_components/common/blogs";
import Categories from "./_components/categories";

export default function Home() {
	return (
		<div className="bg-white w-full mx-auto flex min-h-screen pt-12">
			<div className="container">
				<Categories />
				<Blogs category="hello" className="px-4" />
			</div>
			<aside></aside>
		</div>
	);
}
