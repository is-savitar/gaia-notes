import Blogs from "@/_components/home/blogs";
import Categories from "@/_components/home/categories";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  return (
    <div className="bg-white w-full mx-auto flex flex-col min-h-screen pt-12">
      {/* {cookieStore.get("accessToken")?.value} Kochi */}
      <Categories />
      <Blogs category="hello" />
    </div>
  );
}
