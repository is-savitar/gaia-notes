import Blogs from "@/_components/home/blogs";
import Categories from "@/_components/home/categories";

export default function Home() {
  return (
    <div className="bg-white w-full mx-auto flex min-h-screen pt-12">
      <div className="max-w-[1200px] mx-auto">
        <Categories />
        <Blogs category="hello" className="px-4" />
      </div>
      <aside></aside>
    </div>
  );
}
