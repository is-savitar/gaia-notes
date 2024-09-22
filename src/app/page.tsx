import Blogs from "@/_components/home/blogs";
import Categories from "@/_components/home/categories";

export default function Home() {
  return (
    <div className="bg-white w-full mx-auto flex flex-col min-h-screen pt-12">
      <Categories />
      <Blogs category="hello" />
    </div>
  );
}
